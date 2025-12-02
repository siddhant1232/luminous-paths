"use client";

import React from "react";
import InfiniteMenu, { MenuItem } from "@/components/InfiniteMenu";

const items: MenuItem[] = [
  {
    image: "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764530630/WhatsApp_Image_2025-12-01_at_00.53.36_dcfnvm.jpg",
    link: "https://google.com/",
    title: "Siddhant Gupta",
    description: "Software Team Lead – Web Developer",
    github: "https://github.com/siddhant1232",
    linkedin: "https://www.linkedin.com/in/siddhant62632/",
    instagram: "https://www.instagram.com/_siddhan_t_/",
  },
  {
    image: "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764654328/WhatsApp_Image_2025-12-02_at_11.14.06_cekehl.jpg",
    link: "https://google.com/",
    title: "Rohit Sharma",
    description: "Hardware Team Lead",
    github: "https://github.com/RandomRohit-hub",
    linkedin: "https://www.linkedin.com/in/rohit-sharma-441b20297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    instagram: "https://www.instagram.com/_random_rohit?igsh=MnZ4dDdneG53YnFz&utm_source=qr",
  },
  {
    image: "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764654602/WhatsApp_Image_2025-12-02_at_11.18.35_nfqqgq.jpg",
    link: "https://google.com/",
    title: "Srijan Prasad",
    description: "Team Leader",
    github: "https://github.com/Srijanprasad",
    linkedin: "https://www.linkedin.com/in/srijan-prasad-",
    instagram: "https://www.instagram.com/srijanprasad_?igsh=YWRhYWx6cGxzdmM=",
  },
  {
    image: "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764657815/WhatsApp_Image_2025-12-02_at_11.30.17_xem8ti.jpg",
    link: "https://google.com/",
    title: "Siddharth Mishra",
    description: "Software Team – App Developer",
    github: "https://github.com/siddharth382004",
    linkedin: "https://www.linkedin.com/in/siddharthmishra03/",
    instagram: "https://www.instagram.com/siddhartha382004/",
  },
  {
    image: "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764563641/IMG-20251112-WA0013_abiahu.jpg",
    link: "https://google.com/",
    title: "Vashika Chaurasia",
    description: "Social Media Manager",
    linkedin: "https://www.linkedin.com/in/vanshika-chaurasia-2736aa2b2",
    instagram: "https://www.instagram.com/__vanshikkaa__06?igsh=cXBxMnd0ajVpZzd6",
  },
  {
    image: "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764530002/WhatsApp_Image_2025-11-29_at_12.20.57_rsnc0w.jpg",
    link: "https://google.com/",
    title: "Sambhav Sahu",
    description: "Hardware Assistant",
    linkedin: "https://www.linkedin.com/in/sambhav-sahu-a9859039a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/sambhav_sahu_?igsh=cmpiZmZ3dG5vcXg0",
  },
  {
    image: "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764654646/1_waomkv.jpg",
    link: "https://google.com/",
    title: "Abhishek Kumar",
    description: "Mentor",
    github: "https://github.com/Abhi2790",
    linkedin: "https://www.linkedin.com/in/abhishek-461295338",
    instagram: "https://www.instagram.com/abhi_shek_2790?igsh=OHM2Nnh3ZGUxYXln",
  },
];

const HeroSection: React.FC = () => {
  return (
    <section id="team" data-page-theme="light" className="relative h-[600px] w-full  bg-white md:h-[650px] lg:h-[700px]">
      <InfiniteMenu items={items} />
    </section>
  );
};

export default HeroSection;
