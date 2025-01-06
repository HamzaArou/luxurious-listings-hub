import React, { useState } from "react";
import ProjectCard from "./projects/ProjectCard";
import ProjectSearch from "./projects/ProjectSearch";
import MortgageCalculator from "./MortgageCalculator";

const FeaturedProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const projects = [
    {
      id: 1,
      title: "مشروع السكني الأول",
      location: "الرياض - حي النرجس",
      price: "1,200,000",
      area: "250",
      bedrooms: 4,
      bathrooms: 3,
      imageUrl: "/projects/project1.jpg",
      status: "متاح",
    },
    {
      id: 2,
      title: "مشروع الفيصل جاردنز",
      location: "جدة - حي الشاطئ",
      price: "2,500,000",
      area: "350",
      bedrooms: 5,
      bathrooms: 4,
      imageUrl: "/projects/project2.jpg",
      status: "قريباً",
    },
    {
      id: 3,
      title: "مشروع الواحة السكني",
      location: "الدمام - حي الشاطئ",
      price: "900,000",
      area: "200",
      bedrooms: 3,
      bathrooms: 2,
      imageUrl: "/projects/project3.jpg",
      status: "متاح",
    },
  ];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="pt-8 pb-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-right">
          <h2 className="text-3xl font-bold text-white inline-block bg-darkBlue px-4 py-2 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px]">
            مشاريع الفيصل
          </h2>
        </div>

        <ProjectSearch onSearch={handleSearch} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <MortgageCalculator />
      </div>
    </section>
  );
};

export default FeaturedProjects;