import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import FeaturedCase from "@/components/sections/FeaturedCase";
import Solutions from "@/components/sections/Solutions";
import TrustedBy from "@/components/sections/TrustedBy";
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import Team from "@/components/sections/Team";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedCase />
      <TrustedBy />
      <Solutions />
      <Process />
      <WhyUs />
      <Team />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
