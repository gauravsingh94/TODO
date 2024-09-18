import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import TaskCard from "./_components/TaskCard";
import TaskForm from "./_components/TaskForm";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Complete project proposal",
    description: "Draft and submit the project proposal",
    status: "To Do",
    priority: "High",
    dueDate: "2023-06-30",
  },
  {
    id: 2,
    title: "Review code",
    description: "Perform code review for the latest pull request",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2023-06-25",
  },
  {
    id: 3,
    title: "Update documentation",
    description: "Update the user guide with new features",
    status: "Completed",
    priority: "Low",
    dueDate: "2023-06-20",
  },
];

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddOrUpdateTask = (task: Omit<Task, "id">) => {
    if (editingTask) {
      setTasks(
        tasks.map((t) =>
          t.id === editingTask.id ? { ...task, id: editingTask.id } : t,
        ),
      );
    } else {
      setTasks([...tasks, { ...task, id: Date.now() }]);
    }
    setEditingTask(null);
    setIsDialogOpen(false);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };
    if (a.priority !== b.priority) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setEditingTask(null)}>
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingTask ? "Edit Task" : "Add Task"}</DialogTitle>
          </DialogHeader>
          <TaskForm
            initialTask={
              editingTask || {
                title: "",
                description: "",
                status: "To Do",
                priority: "Medium",
                dueDate: "",
              }
            }
            onSubmit={handleAddOrUpdateTask}
          />
        </DialogContent>
      </Dialog>
      <div className="grid gap-4 mt-4">
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}
