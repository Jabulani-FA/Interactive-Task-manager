import {
  Search,
  BellDot,
  Calendar,
  Circle,
  StretchHorizontal,
  PlusCircle,
  CircleEllipsis,
} from "lucide-react";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { done as initDone, todo as initTodo, inProgress as initProgress } from "./taskList";
import TaskCardDraggable from "./TaskCardDraggable";

// Droppable column
function Column({ id, title, tasks, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`bg-black rounded p-2 min-h-64 col-span-4 transition-colors ${
        isOver ? "bg-zinc-800" : "bg-black"
      }`}
    >
      <div className="flex justify-between">
        <p className="text-sm text-zinc-500">
          {title} ({tasks.length})
        </p>
        <div className="flex items-center gap-1">
          <PlusCircle size={16} />
          <p className="text-sm">Add new task</p>
        </div>
      </div>
      {children}
    </div>
  );
}

const DisplayPanel = () => {
  const [columns, setColumns] = useState({
    todo: initTodo,
    inProgress: initProgress,
    done: initDone,
  });

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const [fromColumn, fromIndex] = active.id.split("-");
    const toColumn = over.id;

    if (fromColumn === toColumn) return;

    // Copy arrays
    const fromTasks = [...columns[fromColumn]];
    const toTasks = [...columns[toColumn]];

    // Move task
    const [movedTask] = fromTasks.splice(parseInt(fromIndex, 10), 1);
    toTasks.push(movedTask);

    setColumns({
      ...columns,
      [fromColumn]: fromTasks,
      [toColumn]: toTasks,
    });
  };

  return (
    <div className="p-4">
      {/* Top header */}
      <div className="flex justify-between">
        <h4 className="text-md font-bold">Welcome back, Vincent</h4>
        <div className="flex items-center gap-2">
          <Search size={16} />
          <BellDot size={16} />
          <Calendar size={16} />
          <p className="text-sm font-light">19 May 2022</p>
          <Circle />
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-between mt-6">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <StretchHorizontal size={16} />
            <h6 className="text-sm">Board view</h6>
          </div>
          <div className="flex items-center gap-2">
            <PlusCircle size={16} className="text-zinc-300" />
            <h6 className="text-sm text-zinc-300">Add view</h6>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-bold text-sm">Filter</p>
          <p className="font-bold text-sm text-zinc-300">Sort</p>
          <CircleEllipsis className="text-zinc-300" size={16} />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl text-sm">
            New template
          </button>
        </div>
      </div>

      <hr className="mt-2" />

      {/* Board */}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-12 gap-6 mt-2">
          {Object.entries(columns).map(([colId, tasks]) => (
            <Column key={colId} id={colId} title={colId} tasks={tasks}>
              {tasks.map((task, i) => (
                <TaskCardDraggable
                  key={colId + "-" + i}
                  task={task}
                  id={`${colId}-${i}`}
                />
              ))}
            </Column>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default DisplayPanel;
