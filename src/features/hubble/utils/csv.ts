import { monthNames } from '../constants';
import type { HubbleEntry } from '../types';
import { createDateKey } from './helpers';

// Parses one CSV row while preserving commas inside quoted fields.
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  result.push(current.trim());
  return result;
};

// Converts raw CSV text into typed entry objects.
export const parseCSV = (csvText: string): HubbleEntry[] => {
  const lines = csvText.split(/\r?\n/);
  const entries: HubbleEntry[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const fields = parseCSVLine(line);
    if (fields.length < 6) continue;

    entries.push({
      date: fields[0],
      image: fields[1],
      name: fields[2],
      caption: fields[3],
      url: fields[4],
      year: fields[5],
    });
  }

  return entries;
};

// Extracts month/day from strings like "January 15 2019".
const extractMonthDay = (dateText: string): { month: number; day: number } | null => {
  const parts = dateText.split(' ');
  if (parts.length < 2) return null;

  const monthIndex = monthNames.findIndex((name) => name.toLowerCase() === parts[0].toLowerCase());
  const day = Number.parseInt(parts[1], 10);

  if (monthIndex === -1 || Number.isNaN(day)) return null;
  return { month: monthIndex + 1, day };
};

// Creates a date-keyed lookup map used for instant submit results.
export const buildEntryMap = (entries: HubbleEntry[]): Map<string, HubbleEntry> => {
  const map = new Map<string, HubbleEntry>();

  entries.forEach((entry) => {
    const parsed = extractMonthDay(entry.date);
    if (!parsed) return;

    const key = createDateKey(parsed.month, parsed.day);
    if (!map.has(key)) map.set(key, entry);
  });

  return map;
};
