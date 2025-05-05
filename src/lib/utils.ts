import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatWhatsAppNumber(phoneNumber: string): string {
  // Remove non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Ensure it starts with country code
  if (cleaned.startsWith('62')) {
    return cleaned;
  } else if (cleaned.startsWith('0')) {
    return `62${cleaned.substring(1)}`;
  } else {
    return `62${cleaned}`;
  }
}

export function generateWhatsAppLink(
  phoneNumber: string, 
  productName: string, 
  customerName: string, 
  customerPhone: string, 
  customerAddress: string
): string {
  const formattedNumber = formatWhatsAppNumber(phoneNumber);
  const message = encodeURIComponent(
    `Halo Maxi, saya ingin membeli softlens ${productName}, berikut:\n\nNama: ${customerName}\nNo. WA: ${customerPhone}\nAlamat: ${customerAddress}`
  );
  
  return `https://wa.me/${formattedNumber}?text=${message}`;
}
