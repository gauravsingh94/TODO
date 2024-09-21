import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useDrop } from "react-dnd";
import KanbanCard from "./KanbanCard";

export type Task = {
  _id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
};
type KanbanColumnProps = {
  column: {
    id: string;
    title: string;
    tasks: Task[];
  };
  moveTask: (
    taskId: string, // Use string type for MongoDB _id
    sourceColumnId: string,
    targetColumnId: string,
  ) => void;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, moveTask }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item: { _id: string; sourceColumnId: string }) => {
      if (item.sourceColumnId !== column.id) {
        moveTask(item._id, item.sourceColumnId, column.id); // Use _id instead of id
      }
    },
  });

  return (
    <Card
      // @ts-ignore
      ref={drop}
      className="p-4 bg-black border border-[#27272A] rounded-lg text-white"
    >
      <CardHeader>
        <CardTitle>{column.title}</CardTitle>
      </CardHeader>
      {column.tasks.map((task) => (
        <div key={task._id} className="mb-4">
          {" "}
          {/* Use _id as key */}
          <KanbanCard task={task} columnId={column.id} />
        </div>
      ))}
    </Card>
  );
};

export default KanbanColumn;
