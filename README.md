# Interactive Quiz App

This is a simple quiz application built using **Next.js, TypeScript, and Dexie (IndexedDB)**. It allows users to take quizzes with multiple-choice and integer-based questions.

## Features

- **Dynamic Quiz Questions:** Supports both MCQs and integer-based questions.
- **Local Database:** Uses Dexie.js to store quiz data in IndexedDB.
- **Timer Calculation:** Automatically calculates quiz duration based on question count.
- **Routing:** Uses `useRouter` from Next.js for navigation.

## Installation

To set up the project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/krush30/Interactive-Quiz-Platform.git
   ```
2. Navigate to the project directory:
   ```sh
   cd interactive-quiz-platform
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```
   The app should now be running at `http://localhost:3000`.

## Project Structure

```
quiz-app/
│-- lib/
│   ├── db.ts      # Dexie.js setup for IndexedDB
│   ├── seedData.ts # Function to seed quiz questions
│-- components/
│   ├── Header.tsx
│   ├── QuizCard.tsx # Component to display quiz info
|   |── Footer.tsx
│-- public/
│-- package.json
│-- README.md
```

## How It Works

- The `QuizCard` component fetches quiz data from IndexedDB and displays the number of questions.
- When the **Start** button is clicked, it navigates to `/quiz`, where users can take the quiz.
- The quiz duration is calculated dynamically based on the number of questions (30 sec per question).

## Technologies Used

- **Next.js** - React framework for SSR and routing
- **TypeScript** - Statically typed JavaScript
- **Dexie.js** - Wrapper for IndexedDB
- **Ant Design** - UI components

## Future Improvements

- Add a scoring system.
- Implement quiz categories.
- Store user progress.

---

### Made during my internship 😃

Hope this helps!
