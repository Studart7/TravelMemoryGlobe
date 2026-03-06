# Travel Memory Globe 🌍

An interactive 3D globe application built with **React Three Fiber** and **Tailwind CSS**, designed to pin and preserve your travel memories with a premium visual experience.

![Globe Preview](https://raw.githubusercontent.com/vudovn/ag-kit/main/assets/preview-placeholder.png) *(High-fidelity 3D Earth with custom markers and glassmorphism UI)*

---

## 🚀 Overview

**Travel Memory Globe** allows users to visualize their travels on a luxury 3D Earth. Users can interact with the globe, search for specific locations, and add pins representing their memories, complete with titles, chronological dates, and photo galleries.

This project focuses on **Visual Excellence** (PBR textures, atmospheric shaders) and **Premium UX** (smooth transitions, accessible touch controls, and intuitive data management).

---

## ✨ Key Features

### 🌎 Core 3D Experience (Milestone 1)
- **Interactive 3D Globe**: Fluid rotation, momentum, and zoom using `OrbitControls`.
- **Raycasting Engine**: Precise pixel-perfect click-to-coordinate mapping.
- **Dynamic Pin Markers**: Custom 3D markers anchored to geographical coordinates.
- **GSAP Camera Fly-to**: Cinematic camera transitions when focusing on a specific memory.

### 🎨 Premium UI & Media (Milestone 2)
- **Memory Management (CRUD)**: Create, View, Edit, and Delete pins with in-app confirmation modals.
- **Glassmorphism Design System**: Sleek, translucent UI built with Tailwind CSS v4.
- **Photo Gallery**: "Card Stack" 3D gallery with full-screen Lightbox and Grid views.
- **Smart Sorting**: A collapsible sidebar to organize memories by **Name** or **Memory Date**.
- **Local Media Support**: In-browser photo preview system (Blob-based) before backend sync.
- **Loading Feedback**: Custom asset loader that handles 10K Earth textures and shaders.

### 📱 Performance & Mobile
- **Responsive Layout**: Adaptive UI that transforms the details panel into a base-sheet on mobile.
- **Touch-First Accessibility**: 56px oversized touch targets for sidebar controls and navigation.
- **Zustand State**: Lightweight, reactive state management for zero-lag interactions.

---

## 🛠️ Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **3D Engine**: [Three.js](https://threejs.org/)
- **React 3D**: [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- **State**: [Zustand](https://github.com/pmndrs/zustand)
- **Animation**: [GSAP](https://greensock.com/gsap/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: Lucide / SVG-based (Touch-optimized)

---

## ⚙️ Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── Globe/        # 3D Scene, Shaders, Atmosphere
│   ├── UI/           # Modals, Sidebar, SearchBar, Lightbox
│   └── Media/        # PhotoStack, Grid, Media Previews
├── store/            # Zustand global state (Pin & UI logic)
├── utils/            # Geo-math & Math helpers
└── styles/           # Global design tokens
```

---

## 🛣️ Roadmap

- [x] **Milestone 1**: Foundation & 3D Mapping.
- [x] **Milestone 2**: UI/UX, Local Media, and Mobile Responsiveness.
- [ ] **Milestone 3**: Supabase Integration (Auth, Persistence & Cloud Storage).
- [ ] **Milestone 4**: Interactive Timeline (Animated path between travels).
- [ ] **Milestone 5**: Collaborative Travel Collections.

---

Developed with ❤️ by Daniel Studart.
