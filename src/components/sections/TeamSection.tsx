"use client";

import React from "react";
import InfiniteMenu, { MenuItem } from "@/components/InfiniteMenu";

const items: MenuItem[] = [
  {
    image: "https://picsum.photos/300/300?grayscale",
    link: "https://google.com/",
    title: "Siddhant Gupta",
    description: "Software Team Lead – Web Developer",
    github: "https://github.com/mentor",
    linkedin: "https://linkedin.com/in/mentor",
    instagram: "https://instagram.com/mentor",
  },
  {
    image: "https://picsum.photos/400/400?grayscale",
    link: "https://google.com/",
    title: "Rohit Sharma",
    description: "Hardware Team Lead",
    github: "https://github.com/mentor",
    linkedin: "https://linkedin.com/in/mentor",
    instagram: "https://instagram.com/mentor",
  },
  {
    image: "https://picsum.photos/500/500?grayscale",
    link: "https://google.com/",
    title: "Srijan Prasad",
    description: "Team Leader",
    github: "https://github.com/mentor",
    linkedin: "https://linkedin.com/in/mentor",
    instagram: "https://instagram.com/mentor",
  },
  {
    image: "https://picsum.photos/600/600?grayscale",
    link: "https://google.com/",
    title: "Siddharth Mishra",
    description: "Software Team – App Developer",
    github: "https://github.com/mentor",
    linkedin: "https://linkedin.com/in/mentor",
    instagram: "https://instagram.com/mentor",
  },
  {
    image: "https://picsum.photos/600/600?grayscale",
    link: "https://google.com/",
    title: "Vashika Chaurasia",
    description: "Social Media Manager",
    github: "https://github.com/mentor",
    linkedin: "https://linkedin.com/in/mentor",
    instagram: "https://instagram.com/mentor",
  },
  {
    image: "https://picsum.photos/600/600?grayscale",
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
    <section id="team" className="relative h-[600px] w-full bg-white md:h-[650px] lg:h-[700px]">
      <InfiniteMenu items={items} />
    </section>
  );
};

export default HeroSection;
