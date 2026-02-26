import { branding } from "@/config/branding";

export const applyBrandColors = () => {
  const root = document.documentElement;
  const isDark = root.classList.contains("dark");
  
  const colors = isDark ? branding.colors.dark : branding.colors.light;
  
  // Apply customizable colors
  root.style.setProperty("--primary", colors.primary);
  root.style.setProperty("--primary-glow", colors.primaryGlow);
  root.style.setProperty("--background", colors.background);
  root.style.setProperty("--foreground", colors.foreground);
};
