import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SkinQuiz } from "@/components/sections/SkinQuiz";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { Bundles } from "@/components/sections/Bundles";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SocialProofToast } from "@/components/ui/SocialProofToast";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <SkinQuiz />
        <BeforeAfterSlider />
        <ProductGrid />
        <Testimonials />
        <Bundles />
        <Faq />
        <FinalCta />
      </main>

      <Footer />

      {/* Global overlays — mounted once, driven entirely by store state */}
      <CartDrawer />
      <SocialProofToast />
    </>
  );
}
