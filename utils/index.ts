import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(url: string | URL, base?: string | URL) {
  try {
    return new URL(url, base).toString()
  } catch (e: unknown) {
    return new URL(url, process.env.NEXT_PUBLIC_APP_URL!).toString()
  }
}
