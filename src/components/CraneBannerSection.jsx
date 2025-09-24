import React from "react";

const ColumnCard = ({ title, description, image }) => {
  return (
    <div
      className="relative rounded-xl overflow-hidden w-full h-64 md:h-[450px] md:flex-1 md:min-w-0"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
        <h3 className="text-white text-lg md:text-2xl font-bold mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-white/90 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function ThreeColumnLayout() {
  const columns = [
    {
      title: "Construction & Infrastruture",
      description: "Navigate tight spaces with ease while digging, loading, and grading, all in one go.",
      image: "/images/back_1.webp",
    },
    {
      title: "Site Prep & Cleanup", 
      description: "Clear debris, level ground, and get the site job-ready without switching machines.",
      image: "/images/back_2.webp",
    },
    {
      title: "Agricultural & Utility Work",
      description: "Dig trenches, transport materials, or fix lines, built for non-stop productivity.",
      image: "/images/back_3.webp",
    },
    {
      title: "Rental Fleets & Fast Jobs",
      description: "Durable, low-maintenance, and always in demand, perfect for high-turnover operations.",
      image: "/images/back_4.webp",
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {columns.map((column, index) => (
          <ColumnCard
            key={index}
            title={column.title}
            description={column.description}
            image={column.image}
          />
        ))}
      </div>
    </div>
  );
}
