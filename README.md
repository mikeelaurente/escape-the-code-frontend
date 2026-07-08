# Escape The Code — Frontend

The Vue 3 client for Escape The Code, a gamified platform for learning JavaScript through interactive lessons, coding challenges, sandboxed execution, and streamed AI feedback.

**Live Demo:** https://escapethecode.cloud

![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-state-FFD859?logo=pinia&logoColor=black)
![Webpack](https://img.shields.io/badge/Webpack-5.x-8DD6F9?logo=webpack&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-visualizations-FF6384?logo=chart.js&logoColor=white)

This repository contains the **Vue 3 SPA** that students use to browse courses, solve coding challenges in an in-browser editor, and watch AI feedback stream in live after each submission.

---

## Why I Built This

The backend does the heavy lifting — sandboxed execution, grading, gamification, and AI feedback — but none of that matters if the experience of writing and submitting code feels clunky. The frontend needed to feel like a real code editor, show grading results clearly, and make streamed AI feedback feel instant rather than like a stalled request.

---

## Highlights

- **In-browser code editor** — challenges are solved directly in the browser using **Ace Editor** (via `vue3-ace-editor`), configured for JavaScript.
- **Live-streamed AI feedback** — rather than waiting for one big response, the client manually parses a Server-Sent Events stream (via Axios's fetch adapter, `ReadableStream.getReader()`, and `TextDecoder`) to render progress, feedback chunks, and completion state as they arrive — including support for cancellation via `AbortController`.
- **Standalone code runner** — a separate "Runnables" view lets users execute arbitrary JavaScript and see console output and error locations, independent of the challenge flow.
- **Gamified UI surface** — dedicated views for course progress, leaderboards, achievements, and user stats, with progress visualized using Chart.js.
- **Centralized auth & API layer** — a single Axios instance handles the base URL and bearer-token injection, with a route guard protecting authenticated pages.

---

## Tech Stack

| Area             | Technology                       |
| ---------------- | -------------------------------- |
| Framework        | Vue 3, Vue Router                |
| State Management | Pinia                            |
| Styling          | Tailwind CSS, Sass/SCSS, PostCSS |
| HTTP             | Axios                            |
| Code Editor      | Ace Editor (`vue3-ace-editor`)   |
| Charts           | Chart.js, vue-chartjs            |
| Dialogs/Toasts   | SweetAlert2, Toastify JS         |
| Build Tool       | Webpack 5                        |

---

## Project Structure

```text
src/
├── assets/
│   └── js/
│       ├── http.js       # Shared Axios instance, base URL, auth interceptor
│       └── route.js      # Manually configured Vue Router routes
├── components/
│   ├── partials/         # Navigation, sidebar, preloader, scroll-to-top
│   ├── ui/                # Shared UI (e.g. Loading)
│   ├── Challenge.vue      # Challenge view: editor, submission, hints, streamed feedback
│   ├── Runnables.vue      # Standalone code runner UI
│   └── Pagination.vue     # Shared pagination component
├── layouts/
├── pages/                 # Route-level page components
├── partials/
├── stores/                # Pinia stores (app, auth, sections, creditTransactions)
└── App.vue
```

Routes are registered manually rather than file-based, and API calls are made directly from pages, components, and stores through the shared Axios instance — there's no separate `services/`/`api/` layer.

---

## Key Pages

| Route                                                   | Purpose                           |
| ------------------------------------------------------- | --------------------------------- |
| `/login`, `/register`                                   | Authentication                    |
| `/`                                                     | Authenticated dashboard           |
| `/courses`, `/courses/:id`                              | Course listing and detail         |
| `/courses/:id/progress`                                 | Detailed course progress          |
| `/sections/:section`                                    | Section content and challenges    |
| `/achievements`                                         | Earned and available achievements |
| `/leaderboard`                                          | Global rankings                   |
| `/progress`, `/user-stats/:id`                          | Progress history and user stats   |
| `/profile`                                              | Profile management                |
| `/verify-email`, `/password-reset`, `/password-confirm` | Account/email flows               |

---

## Engineering Challenges

### Streaming AI Feedback Without a Native SSE Client

The backend streams challenge-completion feedback over Server-Sent Events, but the app needed the request to also carry an auth header — something the native `EventSource` API doesn't support. Instead, the frontend uses Axios's fetch adapter with a streamed response, reading the raw stream with `ReadableStream.getReader()` and manually parsing `message:`, `feedback:`, `end:chunk`, and `end:` records as they arrive, with `AbortController` wired in for cancellation.

### Making a Real Code Editor Feel Native to Vue

Challenge submissions needed a proper code-editing experience — syntax highlighting, line numbers, sensible defaults — without pulling in a heavyweight framework-agnostic editor and fighting Vue's reactivity around it. Ace Editor via `vue3-ace-editor` gave a lightweight editor that integrates cleanly with Vue's component lifecycle.

### Centralizing Auth Without Over-Engineering It

Rather than building a full API client layer, a single shared Axios instance handles the base URL and token injection, with a route guard protecting authenticated views — kept intentionally simple for the scale of the app rather than introducing a service layer prematurely.

---

## Getting Started

### Requirements

- Node.js
- The backend API running (see the [backend README](https://github.com/mikeelaurente/escape-the-code-backend) or repo)

### Installation

```bash
npm install
```

Create the appropriate environment file — `.env.development` or `.env.production` — with:

```env
NODE_ENV=development
API_BASE_URL=http://localhost:3000/api
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

Output is generated in `dist/`.

---

## Future Improvements

- Add a dedicated `services/`/`api/` layer instead of calling Axios directly from pages and stores
- Add automated testing (unit and end-to-end)
- Add linting and formatting scripts
- Migrate to TypeScript for stronger type safety across components and stores
- Add CI for linting, builds, and tests
- Add a deployment pipeline (Docker, CI/CD)

---

## Author

**Mikee Laurente**

- Live Demo: https://escapethecode.cloud
- LinkedIn: https://www.linkedin.com/in/mikee-laurente-0773313a6/
