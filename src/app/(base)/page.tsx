import Announcements from "@/components/anouncements";
import FeaturedNews from "@/components/featured-news";
import Hero from "@/components/hero";
import Landmarks from "@/components/landmarks";
import Map from "@/components/map";
import Services from "@/components/services";
import Stats from "@/components/stats";
import TheChairman from "@/components/the-chairman";

export default function Home() {
  return (
    <>
      <Hero />
      <Landmarks />
      <Services />
      <TheChairman />
      <Stats />
      <Announcements/>
      <FeaturedNews />
      <Map />
    </>
  );
}
