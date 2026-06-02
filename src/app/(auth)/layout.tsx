import type { PropsWithChildren } from "react";
import { AuthLayout } from "@/components/layout/auth";

export default function AuthRootLayout({ children }: PropsWithChildren) {
  return <AuthLayout>{children}</AuthLayout>;
}
