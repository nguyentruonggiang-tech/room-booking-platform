import type { PropsWithChildren } from "react";
import AuthGuard from "@/features/auth/components/AuthGuard";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return <AuthGuard>{children}</AuthGuard>;
}
