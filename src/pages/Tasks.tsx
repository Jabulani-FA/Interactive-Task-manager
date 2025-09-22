import DisplayPanel from "@/components/tasks/DisplayPanel";
import NavPanel from "@/components/tasks/NavPanel";
import { useThemeStore } from "@/store/useThemeStore";


const Tasks = () => {
  const { theme } = useThemeStore(); // get from zustand
  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      <div className={theme === "dark" ? "bg-zinc-900 text-white col-span-3 h-screen overflow-hidden shadow-xl" : "bg-white text-black col-span-3 h-screen overflow-hidden shadow-xl"}>
        <NavPanel/>
      </div>
      <div className={theme === "dark" ? "text-white col-span-9 bg-neutral-900 overflow-y-auto shadow-xl" : "bg-white text-black col-span-9 overflow-y-auto shadow-xl"}>
        <DisplayPanel/>
      </div>
    </div>
  );
};

export default Tasks;
