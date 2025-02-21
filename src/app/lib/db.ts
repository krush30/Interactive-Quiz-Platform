import Dexie, { Table } from "dexie";

// Define MCQ question structure
export interface MCQQuestion {
  id?: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

// Define Integer-Type question structure
export interface IntegerQuestion {
  id?: number;
  question: string;
  correctAnswer: number;
}

// Initialize Dexie Database
export class QuizDatabase extends Dexie {
  mcqQuestions!: Table<MCQQuestion>;
  integerQuestions!: Table<IntegerQuestion>;

  constructor() {
    super("QuizDB");
    this.version(1).stores({
      mcqQuestions: "++id, question, options, correctAnswer",
      integerQuestions: "++id, question, correctAnswer",
    });
  }
}

// Export database instance
export const db = new QuizDatabase();
