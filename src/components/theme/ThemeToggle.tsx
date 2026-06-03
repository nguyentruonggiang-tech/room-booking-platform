"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme.store";

type Props = {
  className?: string;
};

export default function ThemeToggle({ className }: Props) {
  const { isDark, toggle } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button onClick={toggle} aria-label="Đổi giao diện" className={className}>
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
