import Navbar from "../components/Navbar.js";
import Hero from "../components/HeroClient.js";
import StatsBar from "../components/StatsBar";
import FeaturesBento from "../components/FeaturesBento";
import HowItWorks from "../components/HowItWorks";
import ProductShowcase from "../components/ProductShowcase";
import Pricing from "../components/Pricing";
import CTASection from "../components/CTASection";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export const metadata = {
  title: "POS-it — Offline Point of Sale for Pakistani Shops",
  description:
    "Bill customers, track inventory, and manage credit sales — fully offline. No subscription, no cloud. Buy once, own forever. Works on Windows 7+.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <FeaturesBento />
        <HowItWorks />
        <ProductShowcase />
        <Pricing />
        <CTASection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
