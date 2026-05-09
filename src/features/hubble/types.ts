// Represents one row from NASA's Hubble birthday CSV dataset.
export interface HubbleEntry {
  date: string;
  image: string;
  name: string;
  caption: string;
  url: string;
  year: string;
}
