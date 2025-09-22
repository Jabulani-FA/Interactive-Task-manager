import DisplayPanel from "@/components/tasks/DisplayPanel";
import NavPanel from "@/components/tasks/NavPanel";
import { useThemeStore } from "@/store/useThemeStore";


const Tasks = () => {
  const { theme } = useThemeStore(); // get from zustand
  return (
    <div className="grid grid-cols-12">
      <div className={theme === "dark" ? "bg-zinc-900 text-white col-span-3" : "bg-white text-black col-span-3"}>
        <NavPanel/>
      </div>
      <div className={theme === "dark" ? "text-white col-span-9 bg-neutral-900 min-h-screen" : "bg-white text-black col-span-9 min-h-screen"}>
        <DisplayPanel/>
      </div>
    </div>
  );
};

export default Tasks;
