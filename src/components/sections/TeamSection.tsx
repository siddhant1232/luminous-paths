"use client";

import React from "react";
import InfiniteMenu, { MenuItem } from "@/components/InfiniteMenu";

const items: MenuItem[] = [
  {
    image: "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764530630/WhatsApp_Image_2025-12-01_at_00.53.36_dcfnvm.jpg",
    link: "https://google.com/",
    title: "Siddhant Gupta",
    description: "Software Team Lead – Web Developer",
    github: "https://github.com/mentor",
    linkedin: "https://linkedin.com/in/mentor",
    instagram: "https://instagram.com/mentor",
  },
  {
    image: "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764529990/WhatsApp_Image_2025-11-29_at_12.12.40_tylgu1.jpg",
    link: "https://google.com/",
    title: "Rohit Sharma",
    description: "Hardware Team Lead",
    github: "https://github.com/mentor",
    linkedin: "https://linkedin.com/in/mentor",
    instagram: "https://instagram.com/mentor",
  },
  {
    image: "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764530008/WhatsApp_Image_2025-11-29_at_12.26.07_yv23kf.jpg",
    link: "https://google.com/",
    title: "Srijan Prasad",
    description: "Team Leader",
    github: "https://github.com/mentor",
    linkedin: "https://linkedin.com/in/mentor",
    instagram: "https://instagram.com/mentor",
  },
  {
    image: "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764529997/WhatsApp_Image_2025-11-29_at_12.17.57_c6yjnx.jpg",
    link: "https://google.com/",
    title: "Siddharth Mishra",
    description: "Software Team – App Developer",
    github: "https://github.com/mentor",
    linkedin: "https://linkedin.com/in/mentor",
    instagram: "https://instagram.com/mentor",
  },
  {
    image: "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764563641/IMG-20251112-WA0013_abiahu.jpg",
    link: "https://google.com/",
    title: "Vashika Chaurasia",
    description: "Social Media Manager",
    github: "https://github.com/mentor",
    linkedin: "https://linkedin.com/in/mentor",
    instagram: "https://instagram.com/mentor",
  },
  {
    image: "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764530002/WhatsApp_Image_2025-11-29_at_12.20.57_rsnc0w.jpg",
    link: "https://google.com/",
    title: "Sambhav Sahu",
    description: "Hardware Assistant",
    github: "https://github.com/mentor",
    linkedin: "https://linkedin.com/in/mentor",
    instagram: "https://instagram.com/mentor",
  },
  {
    image: "https://picsum.photos/600/600?grayscale",
    link: "https://google.com/",
    title: "Abhishek Kumar",
    description: "Mentor",
    github: "https://github.com/mentor",
    linkedin: "https://linkedin.com/in/mentor",
    instagram: "https://instagram.com/mentor",
  },
];

const HeroSection: React.FC = () => {
  return (
    <section id="team" data-page-theme="light" className="relative h-[600px] w-full overflow-x-hidden bg-white md:h-[650px] lg:h-[700px]">
      <InfiniteMenu items={items} />
    </section>
  );
};

export default HeroSection;
