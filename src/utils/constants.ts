import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const layoutConstant = {
  topbarHeight: 40,
  headerHeight: 80,
  mobileNavHeight: 64,
  containerWidth: 1200,
  mobileHeaderHeight: 64,
  grocerySidenavWidth: 280,
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
