import { useRef } from "react";
import CategoryGrid from "../components/home/CategoryGrid";
import HomeHero from "../components/home/HomeHero";
import ExploreBokku from "../components/home/ExploreBokku";
import TopSellingProducts from "../components/home/TopSellingProducts";
import useGsapReveal from "../hooks/useGsapReveal";

const HomePage = () => {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useGsapReveal(pageRef);

  return (
    <div ref={pageRef} className="overflow-visible bg-slate-50">
      <HomeHero />
      <CategoryGrid />
      <TopSellingProducts />
      <ExploreBokku />
    </div>
  );
};

export default HomePage;
