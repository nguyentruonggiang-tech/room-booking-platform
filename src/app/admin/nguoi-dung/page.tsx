import { Suspense } from "react";
import UsersContent from "@/features/admin/users/components/UsersContent";

export default function UsersPage() {
  return (
    <Suspense>
      <UsersContent />
    </Suspense>
  );
}
