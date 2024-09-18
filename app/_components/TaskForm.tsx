import { useState } from "react";
import { Task } from "./TaskManager";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function TaskForm({
  initialTask,
  onSubmit,
}: {
  initialTask: Omit<Task, "id">;
  onSubmit: (task: Omit<Task, "id">) => void;
}) {
  const [task, setTask] = useState(initialTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={task.status}
          onValueChange={(value) =>
            setTask({ ...task, status: value as Task["status"] })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="priority">Priority</Label>
        <Select
          value={task.priority}
          onValueChange={(value) =>
            setTask({ ...task, priority: value as Task["priority"] })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
      </div>
      <Button type="submit">Save Task</Button>
    </form>
  );
}
export default TaskForm;
