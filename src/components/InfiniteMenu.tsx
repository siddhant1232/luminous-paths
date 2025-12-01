"use client";

import React, { FC, useRef, useState, useEffect } from "react";
import { mat4, quat, vec2, vec3 } from "gl-matrix";

/* ===================== SHADERS ===================== */

const discVertShaderSource = `#version 300 es

uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;

in vec3 aModelPosition;
in vec3 aModelNormal;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;

out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;

#define PI 3.141593

void main() {
    vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);

    vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;
    float radius = length(centerPos.xyz);

    if (gl_VertexID > 0) {
        vec3 rotationAxis = uRotationAxisVelocity.xyz;
        float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);
        vec3 stretchDir = normalize(cross(centerPos, rotationAxis));
        vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
        float strength = dot(stretchDir, relativeVertexPos);
        float invAbsStrength = min(0., abs(strength) - 1.);
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);
        worldPosition.xyz += stretchDir * strength;
    }

    worldPosition.xyz = radius * normalize(worldPosition.xyz);

    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;

    vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;
    vUvs = aModelUvs;
    vInstanceId = gl_InstanceID;
}
`;

const discFragShaderSource = `#version 300 es
precision highp float;

uniform sampler2D uTex;
uniform int uItemCount;
uniform int uAtlasSize;

out vec4 outColor;

in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;

void main() {
    int itemIndex = vInstanceId % uItemCount;
    int cellsPerRow = uAtlasSize;
    int cellX = itemIndex % cellsPerRow;
    int cellY = itemIndex / cellsPerRow;
    vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));
    vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;

    ivec2 texSize = textureSize(uTex, 0);
    float imageAspect = float(texSize.x) / float(texSize.y);
    float containerAspect = 1.0;
    
    float scale = max(imageAspect / containerAspect, 
                     containerAspect / imageAspect);
    
    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);
    st = (st - 0.5) * scale + 0.5;
    
    st = clamp(st, 0.0, 1.0);
    st = st * cellSize + cellOffset;
    
    outColor = texture(uTex, st);
    outColor.a *= vAlpha;
}
`;

/* ===================== GEOMETRY HELPERS ===================== */

class Face {
  constructor(public a: number, public b: number, public c: number) {}
}

class Vertex {
  public position: vec3;
  public normal: vec3;
  public uv: vec2;

  constructor(x: number, y: number, z: number) {
    this.position = vec3.fromValues(x, y, z);
    this.normal = vec3.create();
    this.uv = vec2.create();
  }
}

class Geometry {
  public vertices: Vertex[] = [];
  public faces: Face[] = [];

  public addVertex(...args: number[]): this {
    for (let i = 0; i < args.length; i += 3) {
      this.vertices.push(new Vertex(args[i], args[i + 1], args[i + 2]));
    }
    return this;
  }

  public addFace(...args: number[]): this {
    for (let i = 0; i < args.length; i += 3) {
      this.faces.push(new Face(args[i], args[i + 1], args[i + 2]));
    }
    return this;
  }

  public get lastVertex(): Vertex {
    return this.vertices[this.vertices.length - 1];
  }

  public subdivide(divisions = 1): this {
    const midPointCache: Record<string, number> = {};
    let f = this.faces;

    for (let div = 0; div < divisions; ++div) {
      const newFaces = new Array<Face>(f.length * 4);

      f.forEach((face, ndx) => {
        const mAB = this.getMidPoint(face.a, face.b, midPointCache);
        const mBC = this.getMidPoint(face.b, face.c, midPointCache);
        const mCA = this.getMidPoint(face.c, face.a, midPointCache);

        const i = ndx * 4;
        newFaces[i + 0] = new Face(face.a, mAB, mCA);
        newFaces[i + 1] = new Face(face.b, mBC, mAB);
        newFaces[i + 2] = new Face(face.c, mCA, mBC);
        newFaces[i + 3] = new Face(mAB, mBC, mCA);
      });

      f = newFaces;
    }

    this.faces = f;
    return this;
  }

  public spherize(radius = 1): this {
    this.vertices.forEach((vertex) => {
      vec3.normalize(vertex.normal, vertex.position);
      vec3.scale(vertex.position, vertex.normal, radius);
    });
    return this;
  }

  public get data() {
    return {
      vertices: this.vertexData,
      indices: this.indexData,
      normals: this.normalData,
      uvs: this.uvData,
    };
  }

  public get vertexData(): Float32Array {
    return new Float32Array(this.vertices.flatMap((v) => Array.from(v.position)));
  }

  public get normalData(): Float32Array {
    return new Float32Array(this.vertices.flatMap((v) => Array.from(v.normal)));
  }

  public get uvData(): Float32Array {
    return new Float32Array(this.vertices.flatMap((v) => Array.from(v.uv)));
  }

  public get indexData(): Uint16Array {
    return new Uint16Array(this.faces.flatMap((f) => [f.a, f.b, f.c]));
  }

  public getMidPoint(ndxA: number, ndxB: number, cache: Record<string, number>): number {
    const cacheKey = ndxA < ndxB ? `k_${ndxB}_${ndxA}` : `k_${ndxA}_${ndxB}`;
    if (Object.prototype.hasOwnProperty.call(cache, cacheKey)) {
      return cache[cacheKey];
    }
    const a = this.vertices[ndxA].position;
    const b = this.vertices[ndxB].position;
    const ndx = this.vertices.length;
    cache[cacheKey] = ndx;
    this.addVertex((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
    return ndx;
  }
}

class IcosahedronGeometry extends Geometry {
  constructor() {
    super();
    const t = Math.sqrt(5) * 0.5 + 0.5;
    this.addVertex(
      -1,
      t,
      0,
      1,
      t,
      0,
      -1,
      -t,
      0,
      1,
      -t,
      0,
      0,
      -1,
      t,
      0,
      1,
      t,
      0,
      -1,
      -t,
      0,
      1,
      -t,
      t,
      0,
      -1,
      t,
      0,
      1,
      -t,
      0,
      -1,
      -t,
      0,
      1
    ).addFace(
      0,
      11,
      5,
      0,
      5,
      1,
      0,
      1,
      7,
      0,
      7,
      10,
      0,
      10,
      11,
      1,
      5,
      9,
      5,
      11,
      4,
      11,
      10,
      2,
      10,
      7,
      6,
      7,
      1,
      8,
      3,
      9,
      4,
      3,
      4,
      2,
      3,
      2,
      6,
      3,
      6,
      8,
      3,
      8,
      9,
      4,
      9,
      5,
      2,
      4,
      11,
      6,
      2,
      10,
      8,
      6,
      7,
      9,
      8,
      1
    );
  }
}

class DiscGeometry extends Geometry {
  constructor(steps = 4, radius = 1) {
    super();
    const safeSteps = Math.max(4, steps);
    const alpha = (2 * Math.PI) / safeSteps;

    this.addVertex(0, 0, 0);
    this.lastVertex.uv[0] = 0.5;
    this.lastVertex.uv[1] = 0.5;

    for (let i = 0; i < safeSteps; ++i) {
      const x = Math.cos(alpha * i);
      const y = Math.sin(alpha * i);
      this.addVertex(radius * x, radius * y, 0);
      this.lastVertex.uv[0] = x * 0.5 + 0.5;
      this.lastVertex.uv[1] = y * 0.5 + 0.5;

      if (i > 0) {
        this.addFace(0, i, i + 1);
      }
    }
    this.addFace(0, safeSteps, 1);
  }
}

/* ===================== WEBGL UTILITIES ===================== */

function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (success) {
    return shader;
  }

  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

function createProgram(
  gl: WebGL2RenderingContext,
  shaderSources: [string, string],
  transformFeedbackVaryings?: string[] | null,
  attribLocations?: Record<string, number>
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, ndx) => {
    const shader = createShader(gl, type, shaderSources[ndx]);
    if (shader) {
      gl.attachShader(program, shader);
    }
  });

  if (transformFeedbackVaryings) {
    gl.transformFeedbackVaryings(program, transformFeedbackVaryings, gl.SEPARATE_ATTRIBS);
  }

  if (attribLocations) {
    for (const attrib in attribLocations) {
      if (Object.prototype.hasOwnProperty.call(attribLocations, attrib)) {
        gl.bindAttribLocation(program, attribLocations[attrib], attrib);
      }
    }
  }

  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (success) {
    return program;
  }

  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}

function makeVertexArray(
  gl: WebGL2RenderingContext,
  bufLocNumElmPairs: Array<[WebGLBuffer, number, number]>,
  indices?: Uint16Array
): WebGLVertexArrayObject | null {
  const va = gl.createVertexArray();
  if (!va) return null;

  gl.bindVertexArray(va);

  for (const [buffer, loc, numElem] of bufLocNumElmPairs) {
    if (loc === -1) continue;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, numElem, gl.FLOAT, false, 0, 0);
  }

  if (indices) {
    const indexBuffer = gl.createBuffer();
    if (indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    }
  }

  gl.bindVertexArray(null);
  return va;
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): boolean {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const displayWidth = Math.round(canvas.clientWidth * dpr);
  const displayHeight = Math.round(canvas.clientHeight * dpr);
  const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
  if (needResize) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
  return needResize;
}

function makeBuffer(gl: WebGL2RenderingContext, sizeOrData: number | ArrayBufferView, usage: number): WebGLBuffer {
  const buf = gl.createBuffer();
  if (!buf) {
    throw new Error("Failed to create WebGL buffer.");
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);

  if (typeof sizeOrData === "number") {
    gl.bufferData(gl.ARRAY_BUFFER, sizeOrData, usage);
  } else {
    gl.bufferData(gl.ARRAY_BUFFER, sizeOrData, usage);
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return buf;
}

function createAndSetupTexture(
  gl: WebGL2RenderingContext,
  minFilter: number,
  magFilter: number,
  wrapS: number,
  wrapT: number
): WebGLTexture {
  const texture = gl.createTexture();
  if (!texture) {
    throw new Error("Failed to create WebGL texture.");
  }
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
  return texture;
}

/* ===================== ARC BALL CONTROL ===================== */

type UpdateCallback = (deltaTime: number) => void;

class ArcballControl {
  private updateCallback: UpdateCallback;

  public isPointerDown = false;
  public orientation = quat.create();
  public pointerRotation = quat.create();
  public rotationVelocity = 0;
  public rotationAxis = vec3.fromValues(1, 0, 0);

  public snapDirection = vec3.fromValues(0, 0, -1);
  public snapTargetDirection: vec3 | null = null;

  private pointerPos = vec2.create();
  private previousPointerPos = vec2.create();
  private _rotationVelocity = 0;
  private _combinedQuat = quat.create();

  private readonly EPSILON = 0.1;
  private readonly IDENTITY_QUAT = quat.create();

  constructor(private canvas: HTMLCanvasElement, updateCallback?: UpdateCallback) {
    this.updateCallback = updateCallback || (() => undefined);

    canvas.addEventListener("pointerdown", (e: PointerEvent) => {
      vec2.set(this.pointerPos, e.clientX, e.clientY);
      vec2.copy(this.previousPointerPos, this.pointerPos);
      this.isPointerDown = true;
    });
    canvas.addEventListener("pointerup", () => {
      this.isPointerDown = false;
    });
    canvas.addEventListener("pointerleave", () => {
      this.isPointerDown = false;
    });
    canvas.addEventListener("pointermove", (e: PointerEvent) => {
      if (this.isPointerDown) {
        vec2.set(this.pointerPos, e.clientX, e.clientY);
      }
    });
    canvas.style.touchAction = "none";
  }

  public update(deltaTime: number, targetFrameDuration = 16): void {
    const timeScale = deltaTime / targetFrameDuration + 0.00001;
    let angleFactor = timeScale;
    const snapRotation = quat.create();

    if (this.isPointerDown) {
      const INTENSITY = 0.3 * timeScale;
      const ANGLE_AMPLIFICATION = 5 / timeScale;
      const midPointerPos = vec2.sub(vec2.create(), this.pointerPos, this.previousPointerPos);
      vec2.scale(midPointerPos, midPointerPos, INTENSITY);

      if (vec2.sqrLen(midPointerPos) > this.EPSILON) {
        vec2.add(midPointerPos, this.previousPointerPos, midPointerPos);

        const p = this.project(midPointerPos);
        const q = this.project(this.previousPointerPos);
        const a = vec3.normalize(vec3.create(), p);
        const b = vec3.normalize(vec3.create(), q);

        vec2.copy(this.previousPointerPos, midPointerPos);

        angleFactor *= ANGLE_AMPLIFICATION;

        this.quatFromVectors(a, b, this.pointerRotation, angleFactor);
      } else {
        quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);
      }
    } else {
      const INTENSITY = 0.1 * timeScale;
      quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);

      if (this.snapTargetDirection) {
        const SNAPPING_INTENSITY = 0.2;
        const a = this.snapTargetDirection;
        const b = this.snapDirection;
        const sqrDist = vec3.squaredDistance(a, b);
        const distanceFactor = Math.max(0.1, 1 - sqrDist * 10);
        angleFactor *= SNAPPING_INTENSITY * distanceFactor;
        this.quatFromVectors(a, b, snapRotation, angleFactor);
      }
    }

    const combinedQuat = quat.multiply(quat.create(), snapRotation, this.pointerRotation);
    this.orientation = quat.multiply(quat.create(), combinedQuat, this.orientation);
    quat.normalize(this.orientation, this.orientation);

    const RA_INTENSITY = 0.8 * timeScale;
    quat.slerp(this._combinedQuat, this._combinedQuat, combinedQuat, RA_INTENSITY);
    quat.normalize(this._combinedQuat, this._combinedQuat);

    const rad = Math.acos(this._combinedQuat[3]) * 2.0;
    const s = Math.sin(rad / 2.0);
    let rv = 0;
    if (s > 0.000001) {
      rv = rad / (2 * Math.PI);
      this.rotationAxis[0] = this._combinedQuat[0] / s;
      this.rotationAxis[1] = this._combinedQuat[1] / s;
      this.rotationAxis[2] = this._combinedQuat[2] / s;
    }

    const RV_INTENSITY = 0.5 * timeScale;
    this._rotationVelocity += (rv - this._rotationVelocity) * RV_INTENSITY;
    this.rotationVelocity = this._rotationVelocity / timeScale;

    this.updateCallback(deltaTime);
  }

  private quatFromVectors(a: vec3, b: vec3, out: quat, angleFactor = 1) {
    const axis = vec3.cross(vec3.create(), a, b);
    vec3.normalize(axis, axis);
    const d = Math.max(-1, Math.min(1, vec3.dot(a, b)));
    const angle = Math.acos(d) * angleFactor;
    quat.setAxisAngle(out, axis, angle);
    return { q: out, axis, angle };
  }

  private project(pos: vec2): vec3 {
    const r = 2;
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    const s = Math.max(w, h) - 1;

    const x = (2 * pos[0] - w - 1) / s;
       const y = (2 * pos[1] - h - 1) / s;
    let z = 0;
    const xySq = x * x + y * y;
    const rSq = r * r;

    if (xySq <= rSq / 2.0) {
      z = Math.sqrt(rSq - xySq);
    } else {
      z = rSq / Math.sqrt(xySq);
    }
    return vec3.fromValues(-x, y, z);
  }
}

/* ===================== MENU TYPES ===================== */

export interface MenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
}

type ActiveItemCallback = (index: number) => void;
type MovementChangeCallback = (isMoving: boolean) => void;
type InitCallback = (instance: InfiniteGridMenu) => void;

interface Camera {
  matrix: mat4;
  near: number;
  far: number;
  fov: number;
  aspect: number;
  position: vec3;
  up: vec3;
  matrices: {
    view: mat4;
    projection: mat4;
    inversProjection: mat4;
  };
}

/* ===================== MAIN WEBGL CLASS ===================== */

class InfiniteGridMenu {
  private gl: WebGL2RenderingContext | null = null;
  private discProgram: WebGLProgram | null = null;
  private discVAO: WebGLVertexArrayObject | null = null;
  private discBuffers!: {
    vertices: Float32Array;
    indices: Uint16Array;
    normals: Float32Array;
    uvs: Float32Array;
  };
  private icoGeo!: IcosahedronGeometry;
  private discGeo!: DiscGeometry;
  private worldMatrix = mat4.create();
  private tex: WebGLTexture | null = null;
  private control!: ArcballControl;

  private discLocations!: {
    aModelPosition: number;
    aModelUvs: number;
    aInstanceMatrix: number;
    uWorldMatrix: WebGLUniformLocation | null;
    uViewMatrix: WebGLUniformLocation | null;
    uProjectionMatrix: WebGLUniformLocation | null;
    uCameraPosition: WebGLUniformLocation | null;
    uScaleFactor: WebGLUniformLocation | null;
    uRotationAxisVelocity: WebGLUniformLocation | null;
    uTex: WebGLUniformLocation | null;
    uFrames: WebGLUniformLocation | null;
    uItemCount: WebGLUniformLocation | null;
    uAtlasSize: WebGLUniformLocation | null;
  };

  private viewportSize = vec2.create();
  private drawBufferSize = vec2.create();

  private discInstances!: {
    matricesArray: Float32Array;
    matrices: Float32Array[];
    buffer: WebGLBuffer | null;
  };

  private instancePositions: vec3[] = [];
  private DISC_INSTANCE_COUNT = 0;
  private atlasSize = 1;

  private _time = 0;
  private _deltaTime = 0;
  private _deltaFrames = 0;
  private _frames = 0;

  private movementActive = false;

  private TARGET_FRAME_DURATION = 1000 / 60;
  private SPHERE_RADIUS = 2;
  private discScale: number;

  public camera: Camera = {
    matrix: mat4.create(),
    near: 0.1,
    far: 40,
    fov: Math.PI / 4,
    aspect: 1,
    position: vec3.fromValues(0, 0, 3),
    up: vec3.fromValues(0, 1, 0),
    matrices: {
      view: mat4.create(),
      projection: mat4.create(),
      inversProjection: mat4.create(),
    },
  };

  public smoothRotationVelocity = 0;
  public scaleFactor = 1.0;

  constructor(
    private canvas: HTMLCanvasElement,
    private items: MenuItem[],
    private onActiveItemChange: ActiveItemCallback,
    private onMovementChange: MovementChangeCallback,
    onInit?: InitCallback,
    discScale: number = 0.18
  ) {
    this.discScale = discScale;
    this.init(onInit);
  }

  public resize(): void {
    const needsResize = resizeCanvasToDisplaySize(this.canvas);
    if (!this.gl) return;
    if (needsResize) {
      this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
    }
    this.updateProjectionMatrix();
  }

  public run(time = 0): void {
    this._deltaTime = Math.min(32, time - this._time);
    this._time = time;
    this._deltaFrames = this._deltaTime / this.TARGET_FRAME_DURATION;
    this._frames += this._deltaFrames;

    this.animate(this._deltaTime);
    this.render();

    requestAnimationFrame((t) => this.run(t));
  }

  private init(onInit?: InitCallback): void {
    const gl = this.canvas.getContext("webgl2", {
      antialias: true,
      alpha: false,
    });
    if (!gl) {
      throw new Error("No WebGL 2 context!");
    }
    this.gl = gl;

    vec2.set(this.viewportSize, this.canvas.clientWidth, this.canvas.clientHeight);
    vec2.clone(this.drawBufferSize);

    this.discProgram = createProgram(gl, [discVertShaderSource, discFragShaderSource], null, {
      aModelPosition: 0,
      aModelNormal: 1,
      aModelUvs: 2,
      aInstanceMatrix: 3,
    });

    this.discLocations = {
      aModelPosition: gl.getAttribLocation(this.discProgram!, "aModelPosition"),
      aModelUvs: gl.getAttribLocation(this.discProgram!, "aModelUvs"),
      aInstanceMatrix: gl.getAttribLocation(this.discProgram!, "aInstanceMatrix"),
      uWorldMatrix: gl.getUniformLocation(this.discProgram!, "uWorldMatrix"),
      uViewMatrix: gl.getUniformLocation(this.discProgram!, "uViewMatrix"),
      uProjectionMatrix: gl.getUniformLocation(this.discProgram!, "uProjectionMatrix"),
      uCameraPosition: gl.getUniformLocation(this.discProgram!, "uCameraPosition"),
      uScaleFactor: gl.getUniformLocation(this.discProgram!, "uScaleFactor"),
      uRotationAxisVelocity: gl.getUniformLocation(this.discProgram!, "uRotationAxisVelocity"),
      uTex: gl.getUniformLocation(this.discProgram!, "uTex"),
      uFrames: gl.getUniformLocation(this.discProgram!, "uFrames"),
      uItemCount: gl.getUniformLocation(this.discProgram!, "uItemCount"),
      uAtlasSize: gl.getUniformLocation(this.discProgram!, "uAtlasSize"),
    };

    this.discGeo = new DiscGeometry(56, 1);
    this.discBuffers = this.discGeo.data;
    this.discVAO = makeVertexArray(
      gl,
      [
        [makeBuffer(gl, this.discBuffers.vertices, gl.STATIC_DRAW), this.discLocations.aModelPosition, 3],
        [makeBuffer(gl, this.discBuffers.uvs, gl.STATIC_DRAW), this.discLocations.aModelUvs, 2],
      ],
      this.discBuffers.indices
    );

    this.icoGeo = new IcosahedronGeometry();
    this.icoGeo.subdivide(1).spherize(this.SPHERE_RADIUS);
    this.instancePositions = this.icoGeo.vertices.map((v) => v.position);
    this.DISC_INSTANCE_COUNT = this.icoGeo.vertices.length;
    this.initDiscInstances(this.DISC_INSTANCE_COUNT);
    this.initTexture();
    this.control = new ArcballControl(this.canvas, (deltaTime) => this.onControlUpdate(deltaTime));

    this.updateCameraMatrix();
    this.updateProjectionMatrix();

    this.resize();

    if (onInit) {
      onInit(this);
    }
  }

  private initTexture(): void {
    if (!this.gl) return;
    const gl = this.gl;
    this.tex = createAndSetupTexture(gl, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);

    const itemCount = Math.max(1, this.items.length);
    this.atlasSize = Math.ceil(Math.sqrt(itemCount));
    const cellSize = 512;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = this.atlasSize * cellSize;
    canvas.height = this.atlasSize * cellSize;

    Promise.all(
      this.items.map(
        (item) =>
          new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.src = item.image;
          })
      )
    ).then((images) => {
      images.forEach((img, i) => {
        const x = (i % this.atlasSize) * cellSize;
        const y = Math.floor(i / this.atlasSize) * cellSize;
        ctx.drawImage(img, x, y, cellSize, cellSize);
      });

      gl.bindTexture(gl.TEXTURE_2D, this.tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
      gl.generateMipmap(gl.TEXTURE_2D);
    });
  }

  private initDiscInstances(count: number): void {
    if (!this.gl || !this.discVAO) return;
    const gl = this.gl;

    const matricesArray = new Float32Array(count * 16);
    const matrices: Float32Array[] = [];
    for (let i = 0; i < count; ++i) {
      const instanceMatrixArray = new Float32Array(matricesArray.buffer, i * 16 * 4, 16);
      mat4.identity(instanceMatrixArray as unknown as mat4);
      matrices.push(instanceMatrixArray);
    }

    this.discInstances = {
      matricesArray,
      matrices,
      buffer: gl.createBuffer(),
    };

    gl.bindVertexArray(this.discVAO);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.discInstances.matricesArray.byteLength, gl.DYNAMIC_DRAW);

    const mat4AttribSlotCount = 4;
    const bytesPerMatrix = 16 * 4;
    for (let j = 0; j < mat4AttribSlotCount; ++j) {
      const loc = this.discLocations.aInstanceMatrix + j;
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, bytesPerMatrix, j * 4 * 4);
      gl.vertexAttribDivisor(loc, 1);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);
  }

  private animate(deltaTime: number): void {
    if (!this.gl) return;
    this.control.update(deltaTime, this.TARGET_FRAME_DURATION);

    const positions = this.instancePositions.map((p) =>
      vec3.transformQuat(vec3.create(), p, this.control.orientation)
    );
    const scale = this.discScale;
    const SCALE_INTENSITY = 0.6;

    positions.forEach((p, ndx) => {
      const s = (Math.abs(p[2]) / this.SPHERE_RADIUS) * SCALE_INTENSITY + (1 - SCALE_INTENSITY);
      const finalScale = s * scale;
      const matrix = mat4.create();

      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p)));
      mat4.multiply(matrix, matrix, mat4.targetTo(mat4.create(), [0, 0, 0], p, [0, 1, 0]));
      mat4.multiply(matrix, matrix, mat4.fromScaling(mat4.create(), [finalScale, finalScale, finalScale]));
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), [0, 0, -this.SPHERE_RADIUS]));

      mat4.copy(this.discInstances.matrices[ndx], matrix);
    });

    this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, this.discInstances.buffer);
    this.gl!.bufferSubData(this.gl!.ARRAY_BUFFER, 0, this.discInstances.matricesArray);
    this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, null);

    this.smoothRotationVelocity = this.control.rotationVelocity;
  }

  private render(): void {
    if (!this.gl || !this.discProgram) return;
    const gl = this.gl;

    gl.useProgram(this.discProgram);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    gl.clearColor(0.98, 0.99, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(this.discLocations.uWorldMatrix, false, this.worldMatrix);
    gl.uniformMatrix4fv(this.discLocations.uViewMatrix, false, this.camera.matrices.view);
    gl.uniformMatrix4fv(this.discLocations.uProjectionMatrix, false, this.camera.matrices.projection);
    gl.uniform3f(
      this.discLocations.uCameraPosition,
      this.camera.position[0],
      this.camera.position[1],
      this.camera.position[2]
    );
    gl.uniform4f(
      this.discLocations.uRotationAxisVelocity,
      this.control.rotationAxis[0],
      this.control.rotationAxis[1],
      this.control.rotationAxis[2],
      this.smoothRotationVelocity * 1.1
    );

    gl.uniform1i(this.discLocations.uItemCount, this.items.length);
    gl.uniform1i(this.discLocations.uAtlasSize, this.atlasSize);

    gl.uniform1f(this.discLocations.uFrames, this._frames);
    gl.uniform1f(this.discLocations.uScaleFactor, this.scaleFactor);

    gl.uniform1i(this.discLocations.uTex, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.tex);

    gl.bindVertexArray(this.discVAO);
    gl.drawElementsInstanced(
      gl.TRIANGLES,
      this.discBuffers.indices.length,
      gl.UNSIGNED_SHORT,
      0,
      this.DISC_INSTANCE_COUNT
    );
    gl.bindVertexArray(null);
  }

  private updateCameraMatrix(): void {
    mat4.targetTo(this.camera.matrix, this.camera.position, [0, 0, 0], this.camera.up);
    mat4.invert(this.camera.matrices.view, this.camera.matrix);
  }

  private updateProjectionMatrix(): void {
    if (!this.gl) return;
    const canvasEl = this.gl.canvas as HTMLCanvasElement;
    this.camera.aspect = canvasEl.clientWidth / canvasEl.clientHeight;
    const height = this.SPHERE_RADIUS * 0.35;
    const distance = this.camera.position[2];
    if (this.camera.aspect > 1) {
      this.camera.fov = 2 * Math.atan(height / distance);
    } else {
      this.camera.fov = 2 * Math.atan(height / this.camera.aspect / distance);
    }
    mat4.perspective(
      this.camera.matrices.projection,
      this.camera.fov,
      this.camera.aspect,
      this.camera.near,
      this.camera.far
    );
    mat4.invert(this.camera.matrices.inversProjection, this.camera.matrices.projection);
  }

  private onControlUpdate(deltaTime: number): void {
    const timeScale = deltaTime / this.TARGET_FRAME_DURATION + 0.0001;
    let damping = 5 / timeScale;
    let cameraTargetZ = 3;

    const isMoving = this.control.isPointerDown || Math.abs(this.smoothRotationVelocity) > 0.01;

    if (isMoving !== this.movementActive) {
      this.movementActive = isMoving;
      this.onMovementChange(isMoving);
    }

    if (!this.control.isPointerDown) {
      const nearestVertexIndex = this.findNearestVertexIndex();
      const itemIndex = nearestVertexIndex % Math.max(1, this.items.length);
      this.onActiveItemChange(itemIndex);
      const snapDirection = vec3.normalize(vec3.create(), this.getVertexWorldPosition(nearestVertexIndex));
      this.control.snapTargetDirection = snapDirection;
    } else {
      cameraTargetZ += this.control.rotationVelocity * 80 + 2.5;
      damping = 7 / timeScale;
    }

    this.camera.position[2] += (cameraTargetZ - this.camera.position[2]) / damping;
    this.updateCameraMatrix();
  }

  private findNearestVertexIndex(): number {
    const n = this.control.snapDirection;
    const inversOrientation = quat.conjugate(quat.create(), this.control.orientation);
    const nt = vec3.transformQuat(vec3.create(), n, inversOrientation);

    let maxD = -1;
    let nearestVertexIndex = 0;
    for (let i = 0; i < this.instancePositions.length; ++i) {
      const d = vec3.dot(nt, this.instancePositions[i]);
      if (d > maxD) {
        maxD = d;
        nearestVertexIndex = i;
      }
    }
    return nearestVertexIndex;
  }

  private getVertexWorldPosition(index: number): vec3 {
    const nearestVertexPos = this.instancePositions[index];
    return vec3.transformQuat(vec3.create(), nearestVertexPos, this.control.orientation);
  }
}

/* ===================== REACT WRAPPER ===================== */

const defaultItems: MenuItem[] = [
  {
    image: "https://picsum.photos/900/900?grayscale",
    link: "https://example.com/",
    title: "Team Member",
    description: "Add your team items to InfiniteMenu props.",
  },
];

const getNameParts = (fullName?: string) => {
  if (!fullName) return { firstName: "", lastName: "" };
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
};

const getTaglineForItem = (item?: MenuItem) => {
  if (!item) return "";

  switch (item.title) {
    case "Siddhant Gupta":
      return "Crafting seamless digital experiences and guiding the team toward cleaner, smarter engineering.";
    case "Rohit Sharma":
      return "Building reliable hardware systems that turn ideas into powerful, real-world solutions.";
    case "Srijan Prasad":
      return "Leading with clarity and purpose, keeping every member aligned with the bigger goal.";
    case "Siddharth Mishra":
      return "Designing intuitive app experiences that feel fast, fluid, and thoughtfully engineered.";
    case "Vashika Chaurasia":
      return "Shaping the team’s presence online through creative storytelling and sharp audience insight.";
    case "Sambhav Sahu":
      return "Supporting core hardware workflows with precision, consistency, and hands-on problem-solving.";
    case "Abhishek Kumar":
      return "Guiding the team with experience so every member grows stronger in their craft.";
    default:
      return "Bringing unique skills and energy to move the entire team forward.";
  }
};

interface InfiniteMenuProps {
  items?: MenuItem[];
  className?: string;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  onItemClick?: (item: MenuItem, index: number) => void;
  onItemHover?: (item: MenuItem, index: number) => void;
  discScale?: number;
}

const SocialIcon = ({ platform }: { platform: "github" | "linkedin" | "instagram" }) => {
  if (platform === "github") {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.24c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.31.76-1.61-2.67-.31-5.48-1.34-5.48-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.6-2.81 5.62-5.5 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.57C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
      </svg>
    );
  }
  if (platform === "linkedin") {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07C3.28 4.23 4.2 3.3 5.34 3.3c1.14 0 2.06.93 2.06 2.06 0 1.14-.92 2.07-2.06 2.07zM7.13 20.45H3.55V9h3.58v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.46C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.23 0z" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.26.07 1.64.07 4.85 0 3.21-.01 3.59-.07 4.85-.15 3.23-1.67 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07-3.21 0-3.59-.01-4.85-.07-3.26-.15-4.77-1.69-4.92-4.92C2.17 15.59 2.16 15.21 2.16 12c0-3.21.01-3.59.07-4.85.15-3.23 1.66-4.77 4.92-4.92C8.41 2.17 8.79 2.16 12 2.16zm0-2.16C8.71 0 8.29.01 7 .07 2.64.27.22 2.69.02 7.05.01 8.34 0 8.76 0 12.05c0 3.29.01 3.71.02 5 .2 4.36 2.62 6.78 6.98 6.98 1.29.01 1.71.02 5 .02s3.71-.01 5-.02c4.36-.2 6.78-2.62 6.98-6.98.01-1.29.02-1.71.02-5s-.01-3.71-.02-5C23.78 2.69 21.36.27 17 .07 15.71.01 15.29 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  );
};

const InfiniteMenu: FC<InfiniteMenuProps> = ({
  items = [],
  className = "",
  loadingFallback,
  errorFallback,
  onItemClick,
  onItemHover,
  discScale = 0.18,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [showIntroHint, setShowIntroHint] = useState<boolean>(true);

  const { firstName, lastName } = getNameParts(activeItem?.title);
  const tagline = getTaglineForItem(activeItem);

  useEffect(() => {
    const timeout = setTimeout(() => setHasEntered(true), 40);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!showIntroHint) return;
    const timeout = setTimeout(() => setShowIntroHint(false), 4500);
    return () => clearTimeout(timeout);
  }, [showIntroHint]);

  useEffect(() => {
    const canvas = canvasRef.current;
    let sketch: InfiniteGridMenu | null = null;

    const handleActiveItem = (index: number) => {
      const list = items.length ? items : defaultItems;
      if (!list.length) return;
      const itemIndex = index % list.length;
      const newActiveItem = list[itemIndex];
      setActiveItem(newActiveItem);
      onItemHover?.(newActiveItem, itemIndex);
    };

    const handleMovementChange = (moving: boolean) => {
      setIsMoving(moving);
      if (moving) setShowIntroHint(false);
    };

    const handleInit = (sk: InfiniteGridMenu) => {
      setIsLoading(false);
      sk.run();
    };

    const handleInitError = (err: Error) => {
      setError(err.message);
      setIsLoading(false);
    };

    if (canvas) {
      try {
        sketch = new InfiniteGridMenu(
          canvas,
          items.length ? items : defaultItems,
          handleActiveItem,
          handleMovementChange,
          handleInit,
          discScale
        );
      } catch (err) {
        handleInitError(err as Error);
      }
    }

    const handleResize = () => sketch?.resize();

    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, [items, onItemHover, discScale]);

  const handleItemClick = () => {
    if (!activeItem?.link) return;
    const list = items.length ? items : defaultItems;
    const itemIndex = list.indexOf(activeItem);
    onItemClick?.(activeItem, itemIndex);

    if (activeItem.link.startsWith("http")) {
      window.open(activeItem.link, "_blank", "noopener,noreferrer");
    } else {
      console.log("Internal route:", activeItem.link);
    }
  };

  const handleSocialClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const entryClass = hasEntered ? "opacity-100 scale-100" : "opacity-0 scale-95";

  if (isLoading && loadingFallback) {
    return <div className={`h-full w-full ${className}`}>{loadingFallback}</div>;
  }

  if (error && errorFallback) {
    return <div className={`h-full w-full ${className}`}>{errorFallback}</div>;
  }

  return (
    <div
      className={`
        relative w-full max-w-[100vw]
        min-h-[520px] sm:min-h-[640px] md:min-h-[720px]
        bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.16)_0,_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.12)_0,_transparent_55%),linear-gradient(to_br,#f8fafc,#ffffff)]
        overflow-hidden 
        ${className}
      `}
    >
      {/* Soft UI overlays */}
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light">
        <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="absolute right-[-120px] bottom-[-60px] h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
      </div>

      {/* Canvas */}
      <canvas
        id="infinite-grid-menu-canvas"
        ref={canvasRef}
        className={`
          relative z-0
          h-full w-full cursor-grab overflow-hidden outline-none
          transition-opacity duration-500
          translate-y-8
          ${isLoading ? "opacity-0" : "opacity-100"}
          ${isMoving ? "active:cursor-grabbing" : ""}
        `}
      />

      {/* TOP HINT TEXT */}
      <div
        className={`
          pointer-events-none
          absolute top-4 left-1/2 -translate-x-1/2
          z-20
          transition-all duration-500
          ${hasEntered ? "opacity-80" : "opacity-0"}
          ${isMoving ? "opacity-40" : ""}
        `}
      >
        <div className="inline-flex items-center gap-3 rounded-full bg-white/80 px-4 py-1.5 shadow-sm border border-slate-200/70 backdrop-blur-sm">
          <span className="flex items-center gap-1 text-xs text-slate-700">
            <span className="w-1 h-1 bg-slate-500 rounded-full" />
            Drag to rotate
          </span>
          <span className="w-[1px] h-3 bg-slate-300" />
          <span className="hidden sm:flex items-center gap-1 text-xs text-slate-700">
            <span className="w-1 h-1 bg-slate-500 rounded-full" />
            Tap discs to explore each member
          </span>
        </div>
      </div>

      {/* ENTRY HINT OVERLAY */}
      {showIntroHint && !isLoading && !error && (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
          <div className="relative flex flex-col items-center gap-3">
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-white/60 blur-2xl" />
            </div>
            <div className="relative h-14 w-14 rounded-full border border-orange-400/80 bg-white/90 shadow-md flex items-center justify-center">
              <div className="h-7 w-7 rounded-full border border-slate-500/80 flex items-center justify-center">
                <span className="text-[10px] text-slate-700 animate-pulse">⇆</span>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-full border border-orange-400/40 animate-ping" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-700 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-sm text-center">
              Drag anywhere on the sphere to explore your core team.
            </p>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && !loadingFallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50/80 to-white z-20">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-400 border-t-transparent"></div>
              <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border-4 border-orange-400 border-t-transparent opacity-20"></div>
            </div>
            <p className="text-sm font-medium text-slate-600">Booting up your team sphere...</p>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {error && !errorFallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-white z-20">
          <div className="text-center max-w-md mx-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-lg font-semibold text-red-600 mb-2">Team view failed to load</p>
            <p className="text-sm text-slate-600">
              Try refreshing the page, or check if WebGL is enabled in your browser.
            </p>
          </div>
        </div>
      )}

      {activeItem && !isLoading && !error && (
        <>
          {/* DESKTOP / TABLET OVERLAYS (md and up) */}
          {/* LEFT: name / title */}
          <div
            className={`
              pointer-events-none
              hidden md:block
              absolute
              left-[6%]
              top-1/2
              -translate-y-1/2
              select-none 
              transform-gpu
              transition-all
              duration-700
              ease-out
              ${entryClass}
              ${isMoving ? "scale-95 translate-x-2 opacity-80" : ""}
            `}
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  CORE TEAM
                </span>
              </div>

              <h1 className="text-3xl sm:text-[3.6rem] leading-[0.9] font-black text-slate-900 tracking-tight">
                <span className="block">{firstName}</span>
                {lastName && (
                  <span className="block text-2xl sm:text-[3rem] text-slate-500 mt-2">
                    {lastName}
                  </span>
                )}
              </h1>

              <p className="max-w-sm text-[13px] text-slate-500 leading-relaxed">{tagline}</p>

              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-pink-500 rounded-full transform transition-all duration-1000">
                <div
                  className={`h-full bg-white/70 rounded-full transition-all duration-1000 ${
                    isMoving ? "w-1/3" : "w-full"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: profile card */}
          <div
            className={`
              hidden md:flex
              absolute
              top-1/2
              right-[6%]
              -translate-y-1/2
              z-20
              w-full max-w-xs sm:max-w-sm md:w-[360px]
              rounded-3xl
              border
              border-white/40
              bg-white/92
              backdrop-blur-2xl
              p-6
              shadow-[0_24px_80px_rgba(15,23,42,0.18)]
              flex-col
              transform-gpu
              transition-all
              duration-400
              ease-out
              ${entryClass}
              ${isMoving ? "scale-[0.97] opacity-90" : ""}
            `}
          >
            {/* subtle background glows */}
            <div className="pointer-events-none absolute -right-20 -top-16 h-40 w-40 rounded-full bg-orange-300/28 blur-3xl" />
            <div className="pointer-events-none absolute -left-10 bottom-[-40px] h-32 w-32 rounded-full bg-slate-200/40 blur-2xl" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/85 via-transparent to-orange-50/70 opacity-90" />

            <div className="relative z-10 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-2xl border border-white/70 bg-slate-100/80 overflow-hidden shadow-sm shadow-slate-400/30">
                    <img
                      src={activeItem.image}
                      alt={activeItem.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 ring-1 ring-white/50 mix-blend-screen" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
                      NOW EXPLORING
                    </p>
                    <p className="text-sm font-semibold text-slate-900 leading-tight">
                      {firstName}{" "}
                      {lastName && (
                        <span className="text-slate-500 font-medium">{lastName}</span>
                      )}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50/90 px-3 py-1 text-[11px] font-medium text-orange-700 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                  Live profile
                </span>
              </div>

              {/* Role / description */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    ROLE IN THE TEAM
                  </span>
                </div>
                <p className="text-[15px] font-semibold text-slate-900 leading-snug">
                  {activeItem.description}
                </p>
              </div>

              {/* Divider */}
              <div className="relative h-px">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
              </div>

              {/* Connect & Follow */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    CONNECT & FOLLOW
                  </span>
                  <span className="text-[11px] text-slate-400">One-tap links</span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-sm flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-900">
                      Jump straight into their world
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      Check out their work, journey & highlights.
                    </span>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {activeItem.github && (
                      <button
                        type="button"
                        onClick={(e) => handleSocialClick(e, activeItem.github!)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-900 text-white shadow-sm hover:scale-105 active:scale-95 transition-all duration-150"
                        aria-label="Open GitHub"
                      >
                        <SocialIcon platform="github" />
                      </button>
                    )}

                    {activeItem.linkedin && (
                      <button
                        type="button"
                        onClick={(e) => handleSocialClick(e, activeItem.linkedin!)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-[#0A66C2] text-white shadow-sm hover:scale-105 active:scale-95 transition-all duration-150"
                        aria-label="Open LinkedIn"
                      >
                        <SocialIcon platform="linkedin" />
                      </button>
                    )}

                    {activeItem.instagram && (
                      <button
                        type="button"
                        onClick={(e) => handleSocialClick(e, activeItem.instagram!)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-900 text-white shadow-sm hover:scale-105 active:scale-95 transition-all duration-150"
                        aria-label="Open Instagram"
                      >
                        <SocialIcon platform="instagram" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP CENTER CTA BUTTON */}
          <button
            onClick={handleItemClick}
            className={`
              hidden md:inline-flex
              absolute
              left-1/2
              bottom-10
              -translate-x-1/2
              z-30
              items-center
              gap-3
              rounded-full
              border
              border-slate-200
              bg-white/95
              px-5
              py-2.5
              text-sm
              font-semibold
              text-slate-900
              shadow-[0_18px_45px_rgba(15,23,42,0.18)]
              backdrop-blur
              transition-all
              duration-400
              ease-out
              ${hasEntered ? "opacity-100 scale-100" : "opacity-0 scale-95"}
              ${isMoving ? "opacity-0 pointer-events-none" : "hover:shadow-[0_22px_60px_rgba(15,23,42,0.25)] hover:-translate-y-1 active:scale-95 pointer-events-auto"}
            `}
            aria-label={`Visit ${activeItem.title}'s profile`}
          >
            <span>Visit Official Page</span>
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-slate-900 font-bold shadow-md">
              ↗
            </span>
          </button>

          {/* MOBILE OVERLAY CARD (md:hidden) */}
          <div
            className={`
              md:hidden
              pointer-events-none
              absolute
              inset-x-4
              bottom-5
              z-30
              transform-gpu
              transition-all
              duration-400
              ${entryClass}
              ${isMoving ? "translate-y-4 opacity-80" : ""}
            `}
          >
            <div className="pointer-events-auto rounded-3xl border border-white/60 bg-white/95 backdrop-blur-2xl p-4 shadow-[0_18px_50px_rgba(15,23,42,0.25)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative h-10 w-10 rounded-2xl border border-white/70 bg-slate-100/80 overflow-hidden shadow-sm shadow-slate-400/30">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-500 mb-0.5">
                    NOW EXPLORING
                  </p>
                  <p className="text-sm font-semibold text-slate-900 leading-tight">
                    {activeItem.title}
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 mb-3 line-clamp-3">{tagline}</p>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handleItemClick}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-900 text-slate-50 text-xs font-semibold py-2 shadow-md active:scale-[0.97] transition-transform"
                >
                  Visit profile
                  <span className="ml-2 text-[11px]">↗</span>
                </button>

                <div className="flex items-center gap-2">
                  {activeItem.github && (
                    <button
                      type="button"
                      onClick={(e) => handleSocialClick(e, activeItem.github!)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-900 text-white shadow-sm"
                      aria-label="Open GitHub"
                    >
                      <SocialIcon platform="github" />
                    </button>
                  )}
                  {activeItem.linkedin && (
                    <button
                      type="button"
                      onClick={(e) => handleSocialClick(e, activeItem.linkedin!)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-[#0A66C2] text-white shadow-sm"
                      aria-label="Open LinkedIn"
                    >
                      <SocialIcon platform="linkedin" />
                    </button>
                  )}
                  {activeItem.instagram && (
                    <button
                      type="button"
                      onClick={(e) => handleSocialClick(e, activeItem.instagram!)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-900 text-white shadow-sm"
                      aria-label="Open Instagram"
                    >
                      <SocialIcon platform="instagram" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InfiniteMenu;
