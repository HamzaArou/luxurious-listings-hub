import { useEffect, useRef, useState } from "react";
import { Building2, Users, Trophy, Calendar } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: 50,
    label: "عدد المشاريع",
  },
  {
    icon: Users,
    value: 1000,
    label: "عملاء سعداء",
  },
  {
    icon: Trophy,
    value: 25,
    label: "جوائز التميز",
  },
  {
    icon: Calendar,
    value: 15,
    label: "سنوات الخبرة",
  },
];

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-warmBeige relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <stat.icon className="w-12 h-12 text-gold mx-auto mb-4" />
              <div className="stats-counter">
                {isVisible ? stat.value : 0}
              </div>
              <div className="text-gold font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;