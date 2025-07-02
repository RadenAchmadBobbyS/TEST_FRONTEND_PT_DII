import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateInput(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export function validateNIK(nik: string): boolean {
  return /^\d{16}$/.test(nik);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}
