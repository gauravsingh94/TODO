"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import TaskCard from "../_components/TaskCard";
import TaskForm from "../_components/TaskForm";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/clientRequest/httpRequests"; // Import your backend task functions
import toast from "react-hot-toast";
export type Task = {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
};

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Task["status"] | "All">(
    "All",
  );
  const [priorityFilter, setPriorityFilter] = useState<
    Task["priority"] | "All"
  >("All");
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTodos();
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddOrUpdateTask = async (task: Omit<Task, "_id">) => {
    // @ts-ignore
    const id = editingTask?._id; // Safely access _id
    try {
      if (id) {
        // Update existing task
        await updateTodo(id.toString(), task);
        // @ts-ignore
        setTasks(tasks.map((t) => (t._id === id ? { ...task, _id: id } : t)));
        toast.success("Todo Updated Successfully.");
      } else {
        // Create new task
        const response = await createTodo(task);
        setTasks([...tasks, { ...response.data }]);
        toast.success("Todo Created Successfully.");
      }
      setEditingTask(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating or creating task:", error);
      toast.error("Error updating or creating task:");
    }
  };
  const handleDeleteTask = async (id: string) => {
    try {
      console.log(id);
      await deleteTodo(id);
      // @ts-ignore
      setTasks(tasks.filter((task) => task._id !== id)); // Change `task.id` to `task._id`
      toast.success("Todo deleted successfully.");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task");
    }
  };
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter(
        (task) =>
          (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) &&
          (statusFilter === "All" || task.status === statusFilter) &&
          (priorityFilter === "All" || task.priority === priorityFilter),
      )
      .sort((a, b) => {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        if (a.priority !== b.priority) {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">
            Search tasks
          </Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground " />
            <Input
              id="search"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 border-[#27272A]"
            />
          </div>
        </div>

        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as Task["status"] | "All")
          }
        >
          <SelectTrigger className="w-full md:w-[180px] border-[#27272A]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={priorityFilter}
          onValueChange={(value) =>
            setPriorityFilter(value as Task["priority"] | "All")
          }
        >
          <SelectTrigger className="w-full md:w-[180px] border-[#27272A]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Priorities</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingTask(null)}
              className="bg-black border border-[#27272A]"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white text-black">
            <DialogHeader>
              <DialogTitle>
                {editingTask ? "Edit Task" : "Add Task"}
              </DialogTitle>
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
              // @ts-ignore
              onSubmit={handleAddOrUpdateTask}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 mt-8">
        {filteredAndSortedTasks.map((task) => (
          <TaskCard
            task={task}
            onEdit={handleEditTask}
            // @ts-ignore
            onDelete={() => handleDeleteTask(task._id)}
          />
        ))}
      </div>
      {filteredAndSortedTasks.length === 0 && (
        <p className="text-center text-muted-foreground mt-4">
          No tasks found. Try adjusting your search or filters.
        </p>
      )}
    </div>
  );
}
