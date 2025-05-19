export interface HymnContent {
  type: 'verse' | 'chorus';
  lines: string[];
}

export interface Hymn {
  id: number;
  title: string;
  number: number;
  language?: string;
  content: HymnContent[];
}