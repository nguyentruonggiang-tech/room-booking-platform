import type { PropsWithChildren } from "react";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <HomeHeader />
      <main className="mt-20 flex-1">{children}</main>
      <HomeFooter />
    </div>
  );
}
