
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import FeaturedProjects from "@/components/FeaturedProjects";
import Partners from "@/components/Partners";
import ContactUs from "@/components/ContactUs";
import FloatingContact from "@/components/FloatingContact";
import NewsCarousel from "@/components/NewsCarousel";

export default function Index() {
  return (
    <main className="flex min-h-screen flex-col">
      <section id="hero">
        <Hero />
      </section>
      <section id="news-section">
        <NewsCarousel />
      </section>
      <section id="featured-projects">
        <FeaturedProjects />
      </section>
      <section id="services-section">
        <Services />
      </section>
      <section id="stats-section">
        <Stats />
      </section>
      <Partners />
      <section id="about-section">
        <AboutUs />
      </section>
      <ContactUs />
      <FloatingContact />
    </main>
  );
}
