import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="flex flex-col gap-2 max-w-8xl h-screen mx-auto">

      <Navbar />
      <div className="relative isolate px-6 pt-14 lg:px-1 top-4 " >
        <Outlet />
      </div>
      <footer className="text-center text-xs text-gray-500 py-6">
        Built with React • Tailwind • FastAPI • GPT
      </footer>
    </div >
  );
}