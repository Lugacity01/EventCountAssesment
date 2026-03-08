# Momentum – Event Countdown Collection

Momentum is a simple countdown manager for tracking important events.  
The application focuses on clean design, clear time visualization, and smooth user interactions.

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open your browser and visit:

http://localhost:3000

## Features

- Create and manage multiple countdown events
- Real-time countdown timers
- Visual urgency states based on how close an event is
- Persistent storage using browser localStorage
- Responsive layout designed for both mobile and desktop

### Urgency States

Events change visually depending on how close they are:

- 🔴 **Less than 24 hours** – marked as urgent  
- 🟡 **Less than 7 days** – upcoming  
- 🟢 **More than 7 days** – normal state  

This helps users quickly identify which events need attention.

## Design Decisions

**Dark Mode First**  
A dark interface was chosen to create a modern look while improving contrast for the countdown timers.

**Visual Priority**  
Color and subtle animation are used to highlight events that are approaching soon so users can quickly recognize urgent tasks.

**Readable Timers**  
Large monospaced digits were used to ensure the countdown timers are easy to read at a glance.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Date Handling:** date-fns

## Challenges

One challenge was managing real-time countdown updates without causing unnecessary re-renders. The solution involved carefully handling state updates so the timers remain accurate while maintaining good UI performance.

## Future Improvements

- Add event categories or tags (Work, Personal, Health, etc.)
- Allow sorting or filtering events
- Add optional notifications for upcoming deadlines
- Allow exporting or importing events for backup

## Time Spent

Approximately **12 hours** of focused work, including UI design, implementing the countdown logic, animations, and refining the overall user experience.