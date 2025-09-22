import {
  Search,
  BellDot,
  Calendar,
  Circle,
  StretchHorizontal,
  PlusCircle,
  CircleEllipsis,
} from "lucide-react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { done, todo, inProgress } from "./taskList";
import TaskCardDraggable from "./TaskCardDraggable";

// --- Draggable component ---
function Draggable() {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable-1",
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-4 bg-blue-500 text-white rounded-lg cursor-grab active:cursor-grabbing"
    >
      Drag me
    </button>
  );
}

// --- Droppable component ---
function Droppable({ isOver }) {
  const { setNodeRef } = useDroppable({
    id: "droppable-1",
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-40 h-40 border-2 rounded-lg flex items-center justify-center
        ${
          isOver
            ? "bg-green-400 border-green-600"
            : "bg-gray-200 border-gray-400"
        }
      `}
    >
      Drop here
    </div>
  );
}

const DisplayPanel = () => {
  const [isOver, setIsOver] = useState(false);
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div>
          <h4 className="text-md font-bold">Welcome back, Vincent</h4>
        </div>
        <div className="flex items-center gap-2">
          <Search size={16} />
          <BellDot size={16} />
          <Calendar size={16} />
          <p className="text-sm font-light">19 May 2022</p>
          <Circle />
        </div>
      </div>
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
      <div className="columns-3 gap-6 mt-2">
        <div className="bg-black rounded p-2 min-h-64">
          <div className="flex justify-between">
            <p className="text-sm text-zinc-500">To do(4)</p>
            <div className="flex items-center gap-1">
              <PlusCircle size={16} />
              <p className="text-sm">Add new task</p>
            </div>
          </div>
          {todo.map((tod, i) => (
            <div key={i}>
              <TaskCardDraggable task={tod} />
            </div>
          ))}
        </div>
        <div className="bg-black rounded p-2 min-h-64">
          <div className="flex justify-between">
            <p className="text-sm text-zinc-500">In progress (4)</p>
            <div className="flex items-center gap-1">
              <PlusCircle size={16} />
              <p className="text-sm">Add new task</p>
            </div>
          </div>
          {inProgress.map((tod, i) => (
            <div key={i}>
              <TaskCardDraggable task={tod} />
            </div>
          ))}
        </div>
        <div className="bg-black rounded p-2 min-h-64">
          <div className="flex justify-between">
            <p className="text-sm text-zinc-500">Done (3)</p>
            <div className="flex items-center gap-1">
              <PlusCircle size={16} />
              <p className="text-sm">Add new task</p>
            </div>
          </div>
          {done.map((tod, i) => (
            <div key={i}>
              <TaskCardDraggable task={tod} />
            </div>
          ))}
        </div>
      </div>
      <DndContext
        onDragOver={({ over }) => setIsOver(!!over)}
        onDragEnd={({ over }) => {
          if (over) {
            alert("Dropped inside!");
          }
          setIsOver(false);
        }}
      >
        <div className="flex gap-10 p-10">
          <Draggable />
          <Droppable isOver={isOver} />
        </div>
      </DndContext>
    </div>
  );
};

export default DisplayPanel;
