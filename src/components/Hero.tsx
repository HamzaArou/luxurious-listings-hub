import { useEffect, useRef } from "react";
import GeometricDecorator from "./GeometricDecorator";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      // Start with zoomed in view
      imageRef.current.style.transform = 'scale(1.2)';
    }
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <img
        ref={imageRef}
        src="/lovable-uploads/c87b89a6-0c42-40a2-947d-51e3a2553341.png"
        alt="مجموعة الفيصل العقارية - مشاريع سكنية فاخرة"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ 
          willChange: 'transform',
          transition: 'transform 15s linear'
        }}
        onLoad={() => {
          if (imageRef.current) {
            // Trigger the zoom out animation after the image loads
            setTimeout(() => {
              if (imageRef.current) {
                imageRef.current.style.transform = 'scale(1)';
              }
            }, 100);
          }
        }}
      />
      <GeometricDecorator type="vertical-lines" className="opacity-20" />
      
      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
          ثقتك بوابتنا لتحقيق حلمك
        </h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={scrollToProjects}
            className="bg-white text-black px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all duration-300"
          >
            عرض العقارات
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;