
export interface Keyword {
  text: string;
  relevance: number; // 0-1 score
  category: 'skill' | 'tool' | 'qualification' | 'experience' | 'other';
}
