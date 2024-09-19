"use client";
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanColumn from "./KanbanColumn";
import { Task } from "../tasks";

type Column = {
  id: string;
  title: string;
  tasks: Task[];
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

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "To Do",
      title: "To Do",
      tasks: initialTasks.filter((task) => task.status === "To Do"),
    },
    {
      id: "In Progress",
      title: "In Progress",
      tasks: initialTasks.filter((task) => task.status === "In Progress"),
    },
    {
      id: "Completed",
      title: "Completed",
      tasks: initialTasks.filter((task) => task.status === "Completed"),
    },
  ]);

  const moveTask = (
    taskId: number,
    sourceColumnId: string,
    targetColumnId: string,
  ) => {
    const sourceColumn = columns.find((col) => col.id === sourceColumnId)!;
    const targetColumn = columns.find((col) => col.id === targetColumnId)!;
    const task = sourceColumn.tasks.find((task) => task.id === taskId)!;

    setColumns((prevColumns) =>
      prevColumns.map((col) => {
        if (col.id === sourceColumnId) {
          return {
            ...col,
            tasks: col.tasks.filter((task) => task.id !== taskId),
          };
        }
        if (col.id === targetColumnId) {
          return { ...col, tasks: [...col.tasks, task] };
        }
        return col;
      }),
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <KanbanColumn key={column.id} column={column} moveTask={moveTask} />
        ))}
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
