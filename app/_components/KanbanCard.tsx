import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { useDrag } from "react-dnd";

export type Task = {
  _id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
};
function KanbanCard({ task, columnId }: { task: Task; columnId: string }) {
  const statusColors = {
    "To Do": "bg-yellow-400",
    "In Progress": "bg-blue-600",
    Completed: "bg-green-600",
  };

  const priorityColors = {
    Low: "bg-blue-600",
    Medium: "bg-yellow-600",
    High: "bg-red-600",
  };

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { _id: task._id, sourceColumnId: columnId }, // Use _id instead of id
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Card
      // @ts-ignore
      ref={drag}
      className={`border-2 border-[#27272A] ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <CardContent className="p-4 bg-[#1C1C1C] text-white ">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-300">{task.description}</p>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <span
            className={`px-2 py-1 rounded text-sm ${statusColors[task.status]}`}
          >
            {task.status}
          </span>
          <span
            className={`px-2 py-1 rounded text-sm bg-black ${priorityColors[task.priority]}`}
          >
            {task.priority} Priority
          </span>
          {task.dueDate && (
            <span className="px-2 py-1 rounded text-sm bg-black">
              Due: {format(new Date(task.dueDate), "MMM d, yyyy")}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default KanbanCard;
