# Travel Memory Globe 🌍

An interactive 3D globe application built with **React Three Fiber** and **Supabase**, designed to pin and preserve your travel memories across the world.

![Globe Preview](https://raw.githubusercontent.com/vudovn/ag-kit/main/assets/preview-placeholder.png) *(Placeholder for actually generated or captured screenshot)*

---

## 🚀 Overview

**Travel Memory Globe** allows users to visualize their travels on a high-fidelity 3D Earth. Users can interact with the globe, search for specific locations, and add pins representing their memories, complete with titles, dates, and descriptions.

This project was built using modern web technologies focusing on performance, visual excellence (PBR textures, atmospheric effects), and a smooth user experience.

---

## ✨ Features

### 🌎 Milestone 1: Core 3D Foundation
- **Interactive 3D Globe**: Fluid rotation and zoom using `OrbitControls`.
- **Raycasting Engine**: Precise click-to-coordinate mapping (Latitude/Longitude).
- **Zustand State Management**: Centralized store for managing pins and active states without UI lag.
- **Dynamic Pin Placement**: Reactive markers that anchor to the globe's surface.

### 🎨 Milestone 2: Visuals & Experience
- **High-Fidelity Textures**: 10K Earth textures (Map, Bump, Specular) for a fotorrealistic look.
- **Atmospheric Effects**: Custom Fresnel shader for a realistic "glow" around the planet.
- **Cloud Layers**: Animated, translucent clouds rotating independently.
- **GSAP Camera Animations**: Smooth "fly-to" transitions when focusing on specific pins.
- **Search UI**: Real-time filtering and highlighting of markers across the world.

---

## 🛠️ Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **3D Engine**: [Three.js](https://threejs.org/)
- **React 3D**: [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- **State**: [Zustand](https://github.com/pmndrs/zustand)
- **Animation**: [GSAP](https://greensock.com/gsap/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend / DB**: [Supabase](https://supabase.com/)

---

## ⚙️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/TravelMemoryGlobe.git
   cd TravelMemoryGlobe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── Globe/        # 3D Scene, Earth, Atmosphere, Controls
│   ├── PinMarker/    # 3D Pin logic and rendering
│   └── UI/           # DOM-based Search and Overlay components
├── store/            # Zustand store state definitions
├── three/utils/      # Coordinate conversion math
└── App.tsx           # Main application shell
```

---

## 🛣️ Roadmap

- [ ] **Milestone 3**: Supabase Auth & DB Integration (Persistent pins).
- [ ] **Milestone 4**: Media Uploads (Photos/Gallery for each pin).
- [ ] **Milestone 5**: Social sharing and public travel profiles.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Developed with ❤️ by [Your Name/Daniel].
