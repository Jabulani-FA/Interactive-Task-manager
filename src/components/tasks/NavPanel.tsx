import { Plus, ChevronDown, ChevronRight, Sun, Moon } from "lucide-react";
import NavigationPane from "./NavigationPane";
import { useState } from "react";
import { useThemeStore } from "../../store/useThemeStore";
const NavPanel = () => {
  const [projectOpen, setProjectOpen] = useState(true);
  const [tasksOpen, setTasksOpen] = useState(true);

  const { theme, setTheme } = useThemeStore();
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 bg-black text-white">
        <NavigationPane/>
      </div>
      <div className={theme === "dark" ? "text-white col-span-9 bg-neutral-950 min-h-screen px-4 py-6" : "bg-white text-black min-h-screen col-span-9 px-4 py-6"}>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Projects</h1>
          <Plus size={16} />
        </div>
        <div className="flex justify-between items-center mt-4">
          <h6 className="text-sm text-neutral-500 font-bold">Team</h6>
          <ChevronRight size={16} />
        </div>

        <div className="text-white">
          {/* Projects Section */}
          <div>
            <button
              onClick={() => setProjectOpen(!projectOpen)}
              className="flex items-center justify-between w-full mt-4"
            >
              <span
                className={`text-sm font-bold ${
                  !projectOpen && "text-neutral-500"
                }`}
              >
                Projects
              </span>
              <span>
                {projectOpen ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>
            </button>
            {projectOpen && (
              <ul className="ml-4 mt-2 space-y-1 text-sm text-zinc-300 font-bold">
                <li>All projects (3)</li>
                <li>Design system</li>
                <li>User flow</li>
                <li>UX research</li>
              </ul>
            )}
          </div>

          {/* Tasks Section */}
          <div className="mt-4">
            <button
              onClick={() => setTasksOpen(!tasksOpen)}
              className="flex items-center justify-between w-full"
            >
              <span
                className={`text-sm font-bold ${
                  !tasksOpen && "text-neutral-500"
                }`}
              >
                Tasks
              </span>
              <span>
                {tasksOpen ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>
            </button>
            {tasksOpen && (
              <ul className="ml-4 mt-2 space-y-1 text-sm text-zinc-300 font-bold">
                <li>All tasks (11)</li>
                <li>To do (4)</li>
                <li>In progress (4)</li>
                <li>Done (3)</li>
              </ul>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <h6 className="text-sm text-neutral-500 font-bold">Reminders</h6>
            <ChevronRight size={16} />
          </div>
          <div className="flex justify-between items-center mt-4">
            <h6 className="text-sm text-neutral-500 font-bold">Messengers</h6>
            <ChevronRight size={16} />
          </div>
        </div>
       <div className="absolute bottom-0 mb-6 flex justify-around">
          <div className="flex bg-zinc-800 p-px rounded-3xl">
            {/* Light button */}
            <button
              onClick={() => setTheme("light")}
              className={`flex items-center gap-1 px-6 py-2 rounded-2xl transition ${
                theme === "light" ? "bg-zinc-700 text-white" : "text-zinc-400"
              }`}
            >
              <Sun size={16} />
              <span>Light</span>
            </button>

            {/* Dark button */}
            <button
              onClick={() => setTheme("dark")}
              className={`flex items-center gap-1 px-6 py-2 rounded-2xl transition ${
                theme === "dark" ? "bg-zinc-700 text-white" : "text-zinc-400"
              }`}
            >
              <Moon size={16} />
              <span>Dark</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavPanel;
