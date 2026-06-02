import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ className?: string }>;

export default function HomeContainer({ children, className = "" }: Props) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
