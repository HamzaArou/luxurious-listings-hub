import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsCarousel from "@/components/NewsCarousel";
import Stats from "@/components/Stats";
import FeaturedProjects from "@/components/FeaturedProjects";
import Services from "@/components/Services";
import Partners from "@/components/Partners";
import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div id="hero">
        <Hero />
      </div>
      <div id="news">
        <NewsCarousel />
        <FeaturedProjects />
      </div>
      <div id="stats">
        <Stats />
      </div>
      <div id="services">
        <Services />
      </div>
      <Partners />
      <div id="about">
        <AboutUs />
      </div>
      <div id="contact">
        <ContactUs />
      </div>
      <Footer />
    </div>
  );
};

export default Index;