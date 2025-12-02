# Multiple Choice Challenge Implementation

## Overview

The Challenge.vue component now supports both **code** and **multiple-choice** type challenges based on the new schema.

## Database Schema

```javascript
export const challenges = mysqlTable('challenges', {
  id: int('id').autoincrement().primaryKey(),
  sectionID: int('section_id').references(() => sections.id),
  title: varchar({ length: 255 }).notNull().unique(),
  order: int().default(0),
  type: varchar({ length: 50 })
    .notNull()
    .default('code')
    .$type<ChallengeType>(),
  moduleType: varchar({ length: 100 }).notNull(),
  description: varchar({ length: 2048 }).notNull(),
  difficulty: varchar({ length: 50 }).notNull().$type<Difficulty>(),
  durationLimitMinutes: int('duration_limit_minutes', {
    unsigned: true,
  }).default(0),
  expectedOutput: varchar({ length: 2048 }).notNull(),
  choices: text(),  // JSON string for multiple choice options
  creditPoints: int().notNull(),
  rewardPoints: int().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});
```

## Expected JSON Format for `choices` Field

The `choices` field should be a JSON string containing an array of choice objects:

```json
[
  {
    "text": "JavaScript is a compiled language",
    "isCorrect": false
  },
  {
    "text": "JavaScript is an interpreted language",
    "isCorrect": true
  },
  {
    "text": "JavaScript is a markup language",
    "isCorrect": false
  },
  {
    "text": "JavaScript is a database language",
    "isCorrect": false
  }
]
```

### Choice Object Structure

- `text` (string): The text of the choice option
- `isCorrect` (boolean): Whether this is the correct answer

## Backend API Requirements

### Submit Answer Endpoint: `POST /challenges/:id/answer`

#### Request Body for Multiple Choice

```json
{
  "answer": 1, // Index of the selected choice (0-based)
  "type": "multiple-choice"
}
```

#### Request Body for Code Challenge

```json
{
  "answer": "encodeURIComponent(code)",
  "type": "code"
}
```

#### Response for Multiple Choice

```json
{
  "status": "ok",
  "data": {
    "result": {
      "correct": true, // or false
      "explanation": "JavaScript is indeed an interpreted language. It is executed line by line by the JavaScript engine."
    },
    "status": "solved" // or "ongoing" if incorrect
  }
}
```

#### Response for Code Challenge (existing)

```json
{
  "status": "ok",
  "data": {
    "ongoingAnswer": {
      "submission": {
        "code": "...",
        "metadata": {
          "status": "ok",
          "results": [...]
        }
      }
    },
    "result": "solved"
  }
}
```

## Frontend Implementation Details

### Component Changes

#### 1. Data Properties

- Added `selectedChoice: null` - tracks the selected radio button index

#### 2. Computed Properties

- Added `parsedChoices` - parses the JSON `choices` field from the challenge

#### 3. Template Updates

- **Multiple Choice UI**: Shows radio buttons with choices when `type === 'multiple-choice'`
- **Code UI**: Shows Ace Editor when `type === 'code'`
- **Results Display**: Different UI for multiple choice showing correct/incorrect feedback

#### 4. Method Updates

- `submitAnswer()`: Handles both code and multiple-choice submissions
- `displayChallenge()`: Resets `selectedChoice` when switching challenges

### Visual Features

#### Multiple Choice Display

- Radio button options with themed styling
- Selected option highlighted with primary color
- Disabled submit button until an option is selected
- Shake animation on incorrect answer
- Theme-adaptive colors (dark/light mode)

#### Result Display

- ✅ Success indicator for correct answers
- ❌ Error indicator for incorrect answers
- Shows user's selected answer vs correct answer (on incorrect)
- Displays explanation if provided
- Color-coded backgrounds (green for correct, red for incorrect)

#### Status Views

- **Ongoing**: Shows choice selection or code editor
- **Solved**: Shows correct answer with success styling
- **Completed**: Shows time spent, answer, and AI feedback

## Usage Example

### Creating a Multiple Choice Challenge

```sql
INSERT INTO challenges (
  section_id,
  title,
  order,
  type,
  module_type,
  description,
  difficulty,
  expected_output,
  choices,
  credit_points,
  reward_points
) VALUES (
  1,
  'JavaScript Language Type',
  1,
  'multiple-choice',
  'javascript',
  '<p>What type of language is JavaScript?</p>',
  'easy',
  'JavaScript is an interpreted language',
  '[{"text":"JavaScript is a compiled language","isCorrect":false},{"text":"JavaScript is an interpreted language","isCorrect":true},{"text":"JavaScript is a markup language","isCorrect":false},{"text":"JavaScript is a database language","isCorrect":false}]',
  10,
  50
);
```

## Theme Support

Both challenge types fully support the light/dark theme toggle:

- Dynamic text colors
- Adaptive background colors
- Theme-aware borders and shadows
- Consistent styling across all challenge states

## Error Handling

- Validates that a choice is selected before submission
- Parses JSON choices safely with error catching
- Shows appropriate error messages via SweetAlert2
- Handles network errors gracefully
