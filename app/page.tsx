import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/sections/Footer";

// Skeleton loading components
const SkeletonLoader = ({ height }: { height: string }) => (
  <div className={`${height} bg-gradient-to-r from-black via-slate-900 to-black animate-pulse`} />
);

// Dynamic imports for below-fold sections
const TrustedBy = dynamic(() => import("@/components/sections/TrustedBy"), {
  ssr: true,
  loading: () => <SkeletonLoader height="h-16" />,
});

const Solutions = dynamic(() => import("@/components/sections/Solutions"), {
  ssr: true,
  loading: () => <SkeletonLoader height="h-32" />,
});

const FeaturedCase = dynamic(() => import("@/components/sections/FeaturedCase"), {
  ssr: true,
  loading: () => <SkeletonLoader height="h-64" />,
});

const WhyUs = dynamic(() => import("@/components/sections/WhyUs"), {
  ssr: true,
  loading: () => <SkeletonLoader height="h-64" />,
});

const RoiCalculator = dynamic(() => import("@/components/sections/RoiCalculator"), {
  ssr: true,
  loading: () => <SkeletonLoader height="h-96" />,
});

const Process = dynamic(() => import("@/components/sections/Process"), {
  ssr: true,
  loading: () => <SkeletonLoader height="h-96" />,
});

const Team = dynamic(() => import("@/components/sections/Team"), {
  ssr: true,
  loading: () => <SkeletonLoader height="h-48" />,
});

const FAQ = dynamic(() => import("@/components/sections/FAQ"), {
  ssr: true,
  loading: () => <SkeletonLoader height="h-96" />,
});

const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA"), {
  ssr: true,
  loading: () => <SkeletonLoader height="h-48" />,
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
        <RoiCalculator />
        <Process />
        <Team />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
