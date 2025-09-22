import {
  CircleEllipsis,
  Logs,
  MessageSquareText,
  Paperclip,
} from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { Progress } from "@/components/ui/progress";

// --- Draggable component ---
function Draggable({ task, id }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const percent = Math.min(
    100,
    Math.round((task.taskProgress / task.taskTarget) * 100)
  );

  // Color grading
  const getColor = () => {
    if (percent < 25) return "bg-red-500";
    if (percent < 50) return "bg-orange-500";
    if (percent < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

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
      className="w-full text-white rounded-lg cursor-grab active:cursor-grabbing"
    >
      <div className="bg-zinc-900 p-3 rounded-md mt-3 w-full">
        <div className="flex justify-between">
          <h4 className="text-sm font-bold">{task.title}</h4>
          <CircleEllipsis size={18} />
        </div>
        <p className="text-xs text-start font-light text-zinc-500 mb-3">
          {task.sub}
        </p>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Logs className="text-zinc-500" size={16} />
            <p className="text-xs text-zinc-500">Progress</p>
          </div>
          <p className="text-xs font-bold text-zinc-500">
            {task.taskProgress}/{task.taskTarget}
          </p>
        </div>
        <div className="mt-3">
          <Progress value={percent} className="h-2" indicatorClassName={getColor()} />
        </div>
        <div className="flex justify-between mt-2">
          <div className="bg-zinc-700 p-px px-4 rounded-2xl">
            <p className="text-sm text-zinc-500 hover:pointer">
              {task.dateCreated}
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <MessageSquareText size={14} className="text-zinc-500" />
              <p className="text-xs text-zinc-500">{task.comments}</p>
            </div>
            <div className="flex items-center gap-1">
              <Paperclip size={14} className="text-zinc-500" />
              <p className="text-xs text-zinc-500">{task.attachments}</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

const TaskCardDraggable = ({ task, id }) => {
  return <Draggable task={task} id={id} />;
};

export default TaskCardDraggable;
