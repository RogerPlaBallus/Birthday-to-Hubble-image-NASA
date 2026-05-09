import { useEffect, useState } from 'react';
import { NASA_CSV_URL } from '../constants';
import type { HubbleEntry } from '../types';
import { buildEntryMap, parseCSV } from '../utils/csv';

interface UseHubbleDataResult {
  entryMap: Map<string, HubbleEntry>;
  loading: boolean;
  fetchError: string;
}

// Fetches the official NASA CSV and exposes parsed lookup data to the app.
export const useHubbleData = (): UseHubbleDataResult => {
  const [entryMap, setEntryMap] = useState<Map<string, HubbleEntry>>(new Map());
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setFetchError('');

        const response = await fetch(NASA_CSV_URL);
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);

        const csvText = await response.text();
        const entries = parseCSV(csvText);
        setEntryMap(buildEntryMap(entries));
      } catch (error) {
        console.error('Error fetching Hubble data:', error);
        setFetchError('Failed to load Hubble data. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { entryMap, loading, fetchError };
};
