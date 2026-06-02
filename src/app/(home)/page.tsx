import HomeHero from "@/components/home/HomeHero";
import LocationSection from "@/features/home/components/LocationSection";
import RoomSection from "@/features/home/components/RoomSection";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <LocationSection />
      <RoomSection />
    </main>
  );
}
