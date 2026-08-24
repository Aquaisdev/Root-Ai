export type Language = "en" | "hi" | "kn";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface MissionQuestion {
  id: string;
  circuit: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  xp: number;
  flavor?: string;
}

export interface MazeStep {
  id: string;
  terminalText: string;
  answer: string;
  hint: string;
}

export interface ComicPanel {
  id: string;
  image: string;
  caption: string;
  narration: string;
}

export interface HeritageStory {
  slug: string;
  name: string;
  location: string;
  heroImage: string;
  importance: string;
  panels: ComicPanel[];
}

export interface HeritageSite {
  id: string;
  name: string;
  hint: string;
  lat: number;
  lng: number;
  xp: number;
}
