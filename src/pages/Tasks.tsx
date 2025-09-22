import DisplayPanel from "@/components/tasks/DisplayPanel";
import NavPanel from "@/components/tasks/NavPanel";


const Tasks = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 bg-black">
        <NavPanel/>
      </div>
      <div className="col-span-9 bg-neutral-900 min-h-screen">
        <DisplayPanel/>
      </div>
    </div>
  );
};

export default Tasks;
