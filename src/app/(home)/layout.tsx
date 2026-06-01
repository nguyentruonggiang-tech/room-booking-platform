import type { PropsWithChildren } from "react";
import { HomeLayout } from "@/components/layout/home";

export default function HomeRootLayout({ children }: PropsWithChildren) {
  return <HomeLayout>{children}</HomeLayout>;
}
