import type { PropsWithChildren } from "react";

export default function AdminContent({ children }: PropsWithChildren) {
  return (
    <main className="flex-1 bg-admin-content p-6">{children}</main>
  );
}
