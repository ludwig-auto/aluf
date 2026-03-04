import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/sections/Footer";

// Dynamic imports for below-fold sections
const TrustedBy = dynamic(() => import("@/components/sections/TrustedBy"), {
  ssr: true,
  loading: () => <div className="h-16 bg-black" />,
});

const Solutions = dynamic(() => import("@/components/sections/Solutions"), {
  ssr: true,
  loading: () => <div className="h-32 bg-black" />,
});

const FeaturedCase = dynamic(() => import("@/components/sections/FeaturedCase"), {
  ssr: true,
  loading: () => <div className="h-64 bg-[#040407]" />,
});

const WhyUs = dynamic(() => import("@/components/sections/WhyUs"), {
  ssr: true,
  loading: () => <div className="h-64 bg-black" />,
});

const Process = dynamic(() => import("@/components/sections/Process"), {
  ssr: true,
  loading: () => <div className="h-96 bg-[#040407]" />,
});

const Team = dynamic(() => import("@/components/sections/Team"), {
  ssr: true,
  loading: () => <div className="h-48 bg-black" />,
});

const FAQ = dynamic(() => import("@/components/sections/FAQ"), {
  ssr: true,
  loading: () => <div className="h-96 bg-[#040407]" />,
});

const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA"), {
  ssr: true,
  loading: () => <div className="h-48 bg-black" />,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustedBy />
        <Solutions />
        <FeaturedCase />
        <WhyUs />
        <Process />
        <Team />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
