import { MazeStep, MissionQuestion } from "@/types";

// Circuits 1-9: one heritage question each, escalating XP.
// Feel free to add more questions per circuit later — the UI already
// supports an array, this just ships one per circuit for the MVP.
export const missionQuestions: MissionQuestion[] = [
  {
    id: "c1",
    circuit: 1,
    prompt: "Which empire built the ruins of Hampi as its capital?",
    options: [
      "The Vijayanagara Empire",
      "The Mughal Empire",
      "The Maratha Empire",
      "The Chola Empire",
    ],
    correctIndex: 0,
    xp: 50,
    flavor: "Archive fragment recovered from Sector 1.",
  },
  {
    id: "c2",
    circuit: 2,
    prompt: "The Sun Temple at Konark is built in the shape of a giant what?",
    options: ["Lotus", "Chariot", "Elephant", "Peacock"],
    correctIndex: 1,
    xp: 60,
    flavor: "Stone carvings detected — decoding structural pattern.",
  },
  {
    id: "c3",
    circuit: 3,
    prompt: "Which UNESCO site in Karnataka is famous for its intricately carved Hoysala temples?",
    options: ["Belur & Halebidu", "Pattadakal", "Badami", "Aihole"],
    correctIndex: 0,
    xp: 60,
    flavor: "Cross-referencing Hoysala architectural signatures.",
  },
  {
    id: "c4",
    circuit: 4,
    prompt: "The Ajanta and Ellora Caves are primarily carved out of which type of rock?",
    options: ["Basalt", "Granite", "Sandstone", "Limestone"],
    correctIndex: 0,
    xp: 70,
    flavor: "Geo-scan of cave sector complete.",
  },
  {
    id: "c5",
    circuit: 5,
    prompt: "Who commissioned the construction of the Taj Mahal?",
    options: [
      "Emperor Shah Jahan",
      "Emperor Akbar",
      "Emperor Aurangzeb",
      "Emperor Humayun",
    ],
    correctIndex: 0,
    xp: 70,
    flavor: "Imperial decree fragment located.",
  },
  {
    id: "c6",
    circuit: 6,
    prompt: "The Qutub Minar in Delhi was originally commissioned by which ruler?",
    options: ["Qutb-ud-din Aibak", "Iltutmish", "Alauddin Khilji", "Ashoka"],
    correctIndex: 0,
    xp: 80,
    flavor: "Tower schematics unlocked.",
  },
  {
    id: "c7",
    circuit: 7,
    prompt: "Which ancient Indian university, now in ruins in Bihar, was a global center of learning?",
    options: ["Nalanda", "Takshashila", "Vikramashila", "Odantapuri"],
    correctIndex: 0,
    xp: 80,
    flavor: "Scholarly archive index restored.",
  },
  {
    id: "c8",
    circuit: 8,
    prompt: "Mahabalipuram's shore temples were built under which South Indian dynasty?",
    options: ["Pallava", "Pandya", "Chera", "Chalukya"],
    correctIndex: 0,
    xp: 90,
    flavor: "Coastal survey data streaming in.",
  },
  {
    id: "c9",
    circuit: 9,
    prompt: "The Amber Fort overlooks which Rajasthani city?",
    options: ["Jaipur", "Jodhpur", "Udaipur", "Bikaner"],
    correctIndex: 0,
    xp: 90,
    flavor: "Final knowledge cache before the deep archive.",
  },
];

// Circuit 10: fictional "server maze" puzzle — entirely game flavor text,
// no real systems or techniques are referenced.
export const mazeSteps: MazeStep[] = [
  {
    id: "maze1",
    terminalText:
      "ROOT ARCHIVE — DEEP VAULT\n> Node 01 is sealed behind a riddle left by the archive's builders.\n> \"I am carved from stone but I speak like a book. Kings wrote their laws on my body. What am I?\"",
    answer: "edict",
    hint: "Ashoka carved these on pillars across the empire.",
  },
  {
    id: "maze2",
    terminalText:
      "> Node 02 online.\n> \"I have a dome but no doors of my own choosing, built by a grieving emperor for eternal love. What structure am I?\"",
    answer: "taj mahal",
    hint: "It's the most famous mausoleum in India.",
  },
  {
    id: "maze3",
    terminalText:
      "> Final gate.\n> \"I am a city turned to stone, abandoned by water, ruled by an empire that fell to invaders. What was I?\"",
    answer: "hampi",
    hint: "You've already met this place in Story Mode.",
  },
];

export const totalMissionXp =
  missionQuestions.reduce((sum, q) => sum + q.xp, 0) + 150; // + maze completion bonus
