import Header from "@/components/Header";
import Hero from "@/components/Hero";
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
      <Hero />
      <FeaturedProjects />
      <Stats />
      <Services />
      <Partners />
      <AboutUs />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Index;