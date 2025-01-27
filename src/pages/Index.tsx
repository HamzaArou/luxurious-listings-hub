import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import FeaturedProjects from "@/components/FeaturedProjects";
import Partners from "@/components/Partners";
import ContactUs from "@/components/ContactUs";
import FloatingContact from "@/components/FloatingContact";

export default function Index() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <AboutUs />
      <Services />
      <Stats />
      <FeaturedProjects />
      <Partners />
      <ContactUs />
      <FloatingContact />
    </main>
  );
}