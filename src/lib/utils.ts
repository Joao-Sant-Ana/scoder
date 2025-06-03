import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidCPF(value: string): boolean {
  const cpf = value.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  const calcCheckDigit = (slice: number) => {
    const numbers = cpf.slice(0, slice).split('').map(Number);
    const sum = numbers.reduce((acc, num, idx) => acc + num * (slice + 1 - idx), 0);
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  const digit1 = calcCheckDigit(9);
  const digit2 = calcCheckDigit(10);

  return digit1 === Number(cpf[9]) && digit2 === Number(cpf[10]);
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[^\d]+/g, '');

  if (!(digits.length === 10 || digits.length === 11)) return false;

  if (digits.length === 11 && digits[2] !== '9') return false;

  if (/^(\d)\1+$/.test(digits)) return false;

  return true;
}

export function maskCPF(value: string = ""): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
}

export function maskPhone(value: string = ""): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d{4})$/, '$1-$2');
  } else {
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{4})$/, '$1-$2');
  }
}

export function unmask(value: string): string {
  return value.replace(/[^\d]+/g, '');
}
