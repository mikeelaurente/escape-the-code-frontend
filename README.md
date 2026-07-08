# Escape The Code — Frontend

A Vue 3 single-page application for **Escape The Code**, a gamified platform that teaches JavaScript through interactive lessons, coding challenges, sandboxed code execution, and AI-generated feedback.

**Live Demo:** https://escapethecode.cloud

![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-state-FFD859?logo=pinia&logoColor=black)
![Webpack](https://img.shields.io/badge/Webpack-5.x-8DD6F9?logo=webpack&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-visualizations-FF6384?logo=chart.js&logoColor=white)

This repository contains the **Vue 3 frontend** responsible for the coding workspace, authenticated user experience, progress visualization, and real-time AI feedback streaming.

---

# Why I Built This

Learning platforms often focus on delivering content, but writing and debugging code should feel just as interactive as using a real development environment.

The frontend was designed to provide a responsive coding experience where learners can write code in the browser, submit solutions, receive streamed AI feedback, track their progress, and navigate the platform without interrupting their learning flow.

---

# Highlights

- **Interactive coding workspace** — integrates Ace Editor with challenge state, syntax highlighting, hints, submissions, execution results, and AI feedback in a single workflow.
- **Live AI feedback streaming** — manually parses Server-Sent Events using Axios's Fetch adapter, `ReadableStream`, and `TextDecoder`, allowing feedback to appear progressively while supporting cancellation through `AbortController`.
- **Standalone code runner** — users can execute arbitrary JavaScript outside the challenge system and inspect console output and runtime errors.
- **Centralized state management** — Pinia manages authentication, user state, progress, and challenge-related data across the application.
- **Protected routing & API layer** — Vue Router navigation guards and a shared Axios instance centralize authentication and API communication.
- **Gamified user experience** — dashboards, leaderboards, achievements, and progress visualizations powered by Chart.js.

---

# Tech Stack

| Area             | Technology                       |
| ---------------- | -------------------------------- |
| Framework        | Vue 3, Vue Router                |
| State Management | Pinia                            |
| Styling          | Tailwind CSS, Sass/SCSS, PostCSS |
| HTTP             | Axios                            |
| Code Editor      | Ace Editor (`vue3-ace-editor`)   |
| Charts           | Chart.js, vue-chartjs            |
| UI               | SweetAlert2, Toastify JS         |
| Build Tool       | Webpack 5                        |

---

# Architecture

```text
Browser
    │
Vue Router
    │
Views / Pages
    │
Reusable Components
    │
Pinia Stores
    │
Shared Axios Client
    │
REST API
```

The application follows a component-based architecture with centralized state management. Authentication, routing, and API communication are shared across the application while feature-specific logic remains close to each page or component.

---

# Request Flow

## Challenge Submission

```text
User Writes Code
       │
       ▼
Ace Editor
       │
       ▼
Axios Request
       │
       ▼
Backend Grades Submission
       │
       ▼
Receive Results
       │
       ▼
Update Challenge State
```

## AI Feedback Streaming

```text
Challenge Completed
       │
       ▼
Open Streaming Request
       │
       ▼
Read Stream Chunks
       │
       ▼
Parse SSE Messages
       │
       ▼
Update Feedback UI
       │
       ▼
Display Completion State
```

---

# Project Structure

```text
src/
├── assets/
│   └── js/
│       ├── http.js
│       └── route.js
├── components/
│   ├── partials/
│   ├── ui/
│   ├── Challenge.vue
│   ├── Runnables.vue
│   └── Pagination.vue
├── layouts/
├── pages/
├── partials/
├── stores/
└── App.vue
```

The project follows a lightweight feature organization where reusable UI components, route-level pages, layouts, and Pinia stores remain separated while sharing a centralized HTTP client.

---

# Engineering Challenges

### Streaming AI Feedback Without EventSource

The backend streams AI feedback over Server-Sent Events, but authenticated requests require an authorization header, which the native `EventSource` API does not support.

Instead, the application uses Axios's Fetch adapter to receive a streamed response, manually reading chunks with `ReadableStream.getReader()` and parsing individual SSE messages with `TextDecoder`. This approach also enables request cancellation through `AbortController`.

### Integrating a Browser Code Editor

The coding experience required syntax highlighting, line numbers, editable templates, and seamless Vue integration. Ace Editor provided a lightweight solution that fits naturally into Vue's component lifecycle without introducing unnecessary complexity.

### Centralizing Authentication

Authentication is handled through a shared Axios instance responsible for attaching bearer tokens to every request, while Vue Router navigation guards protect authenticated routes. This keeps API communication consistent without introducing a dedicated service layer.

### State Management

Pinia centralizes user authentication, application state, challenge progression, and transaction data, reducing prop drilling while keeping shared state predictable across views.

---

# Features

- User authentication
- Dashboard
- Course browser
- Chapter and section navigation
- Interactive coding challenges
- Standalone code runner
- AI feedback viewer
- Achievement tracking
- Leaderboards
- User statistics
- Profile management

---

# Getting Started

## Requirements

- Node.js
- Escape The Code backend API

## Installation

```bash
npm install
```

Create either a `.env.development` or `.env.production` file:

```env
NODE_ENV=development
API_BASE_URL=http://localhost:3000/api
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

The production build is generated in the `dist/` directory.

---

# Future Improvements

- Introduce a dedicated API/service layer
- Migrate to TypeScript
- Add unit and end-to-end testing
- Add linting and formatting automation
- CI/CD pipeline
- Docker deployment

---

# Author

**Mikee Laurente**

- Live Demo: https://escapethecode.cloud
- LinkedIn: https://www.linkedin.com/in/mikee-laurente-0773313a6/
