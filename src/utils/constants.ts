import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const statusNames: Record<number, string> = {
  1: "Request Submit",
  2: "Arrived",
  3: "Add to Cart",
  4: "Price Calculate",
  5: "Check Out",
  6: "Repacking 📦",
  7: "Shipping 🚚",
  8: "Shipped ✈️",
};

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
