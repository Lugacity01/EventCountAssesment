# Momentum - Event Countdown Collection

A premium, aesthetic countdown manager built for speed and visual delight.

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✨ Features

- **Premium Glassmorphism Design**: A sophisticated dark theme with deep blurs and subtle borders.
- **Dynamic Urgency States**:
  - 🔴 **Danger (< 24h)**: Pulsing red aura to signal immediate priority.
  - 🟡 **Warning (< 7 days)**: Amber glow for upcoming events.
  - 🟢 **Calm (> 7 days)**: Gentle green "breathing" animation for peace of mind.
- **Creative Time Visualization**: Large, mono-spaced digits for high legibility and a mechanical feel.
- **Persistent Storage**: All your events are saved locally in your browser.
- **Responsive Layout**: Designed to look stunning on mobile and desktop.

## 🧠 Design Choices

- **Dark Mode First**: Chosen for its high-end, modern feel and reduced eye strain.
- **Urgency vs. Calm**: I used color theory and animation physics to create different emotional responses. Rapid pulsing for danger creates urgency, while slow breathing for far-off events creates a sense of preparedness without stress.
- **Interaction Breadcrumbs**: Subtle hover effects and modal transitions make the interface feel "alive" and responsive to user input.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: `date-fns`
# Momentum – Event Countdown Collection

A simple countdown manager for tracking important events.  
The app focuses on clean design, clear time visualization, and smooth interactions.

## Quick Start

Install dependencies:

npm install

Run the development server:

npm run dev

Open http://localhost:3000 in your browser.

## Features

- Create and manage multiple countdown events
- Real-time countdown timers
- Visual urgency states for upcoming events
- Persistent storage using localStorage
- Responsive layout for mobile and desktop

### Urgency States

Events change visually based on how close they are:

- 🔴 < 24 hours – marked as urgent
- 🟡 < 7 days – upcoming
- 🟢 > 7 days – normal

This helps users quickly identify which events require attention.

## Design Decisions

- **Dark Mode First**  
  I chose a dark interface to create a modern look and improve contrast for the countdown timers.

- **Visual Priority**  
  Color and subtle animation are used to highlight events that are approaching soon.

- **Readable Timers**  
  Large monospaced digits make the countdown easy to read at a glance.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- date-fns



## Future Improvements

- Add event categories
- Allow sorting or filtering events
- Add optional notifications for upcoming deadlines