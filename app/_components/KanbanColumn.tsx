import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useDrop } from "react-dnd";
import { Task } from "../tasks";
import KanbanCard from "./KanbanCard";

type KanbanColumnProps = {
  column: {
    id: string;
    title: string;
    tasks: Task[];
  };
  moveTask: (
    taskId: number,
    sourceColumnId: string,
    targetColumnId: string,
  ) => void;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, moveTask }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: number; sourceColumnId: string }) => {
      if (item.sourceColumnId !== column.id) {
        moveTask(item.id, item.sourceColumnId, column.id);
      }
    },
  });

  return (
    <Card
      ref={drop}
      className="p-4 bg-black border border-[#27272A] rounded-lg text-white"
    >
      <CardHeader>
        <CardTitle>{column.title}</CardTitle>
      </CardHeader>
      {column.tasks.map((task) => (
        <div className="mb-4">
          <KanbanCard key={task.id} task={task} columnId={column.id} />
        </div>
      ))}
    </Card>
  );
};

export default KanbanColumn;
