import { NASA_IMAGE_BASE_URL } from '../constants';

// Returns valid day count for a month (1-12).
export const getDaysInMonth = (month: number): number => {
  return new Date(2024, month, 0).getDate();
};

// Builds a normalized MM-DD key for entry map lookup.
export const createDateKey = (month: number, day: number): string => {
  return `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

// Creates a full public image URL from NASA filename.
export const buildImageUrl = (filename: string): string => {
  return `${NASA_IMAGE_BASE_URL}/${filename}`;
};
