import { Card, CardContent } from "@/components/ui/card";
import { Task } from "./TaskManager";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { format } from "date-fns";

function TaskCard({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}) {
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

  return (
    <Card className="border-2 border-[#27272A]">
      <CardContent className="p-4 bg-[#1C1C1C] text-white ">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-300">{task.description}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => onEdit(task)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDelete(task.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
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
export default TaskCard;
