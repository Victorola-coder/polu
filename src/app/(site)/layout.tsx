import { ScrollEffects } from "@/components/motion/scroll-effects";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <SmoothScroll>
      <Nav />
      <main>{children}</main>
      <Footer />
      <ScrollEffects />
    </SmoothScroll>
  );
}
