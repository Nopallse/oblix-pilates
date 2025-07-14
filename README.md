# Oblix Pilates

A modern React application for Oblix Pilates studio.

## Features

- Responsive design
- Modern UI/UX
- AOS (Animate On Scroll) animations
- React Router navigation
- Tailwind CSS styling

## AOS (Animate On Scroll) Integration

This project uses AOS library for smooth scroll animations. Here's how to use it:

### Basic Usage

Add `data-aos` attributes to any element:

```jsx
<div data-aos="fade-up">
  This will fade up when scrolled into view
</div>
```

### Available Animations

- `fade-up` - Fade in from bottom
- `fade-down` - Fade in from top
- `fade-left` - Fade in from right
- `fade-right` - Fade in from left
- `fade-in` - Simple fade in
- `zoom-in` - Zoom in effect
- `slide-up` - Slide up from bottom
- `slide-down` - Slide down from top

### Adding Delays

Use `data-aos-delay` to add timing delays:

```jsx
<div data-aos="fade-up" data-aos-delay="200">
  This will animate 200ms after the trigger
</div>
```

### Custom Hook

Use the custom `useAOS` hook for programmatic control:

```jsx
import { useAOS } from '../shared/hooks'

const MyComponent = () => {
  const { refreshAOS } = useAOS()
  
  // Refresh AOS when needed
  const handleSomeAction = () => {
    refreshAOS()
  }
  
  return (
    <div data-aos="fade-up">
      Content
    </div>
  )
}
```

### AOS Configuration

AOS is configured in `src/main.jsx` with these settings:

- Duration: 800ms
- Easing: ease-in-out
- Once: true (animations only trigger once)
- Mirror: false (no reverse animation on scroll up)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
├── shared/             # Shared utilities and hooks
│   └── hooks/          # Custom hooks including useAOS
├── data/               # Static data
└── assets/             # Images and static assets
```

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- AOS (Animate On Scroll)
- React Router
- React Icons
