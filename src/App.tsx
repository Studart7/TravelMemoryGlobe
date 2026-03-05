import { GlobeScene } from './components/Globe';
import { SearchBar } from './components/UI/SearchBar';

function App() {
    return (
        <div className="w-full h-full relative">
            <div className="absolute top-0 left-0 w-full p-6 z-10 pointer-events-none">
                <h1 className="text-3xl font-bold font-sans tracking-tight text-white drop-shadow-md">
                    Travel Memory Globe
                </h1>
                <p className="text-slate-300 drop-shadow">Milestone 2 - Visuals & Animation</p>
            </div>

            <SearchBar />

            <div className="w-full h-full">
                <GlobeScene />
            </div>
        </div>
    )
}

export default App
