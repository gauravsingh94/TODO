"use client";
import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanColumn from "./KanbanColumn";
import { Task } from "../tasks";
import { getAllTodos, updateTodo } from "@/clientRequest/httpRequests"; // Make sure to import your API methods

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "To Do",
      title: "To Do",
      tasks: [],
    },
    {
      id: "In Progress",
      title: "In Progress",
      tasks: [],
    },
    {
      id: "Completed",
      title: "Completed",
      tasks: [],
    },
  ]);

  // Fetch tasks from the backend on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTodos();
        const tasks = response.data;

        setColumns((prevColumns) =>
          prevColumns.map((column) => ({
            ...column,
            tasks: tasks.filter((task: Task) => task.status === column.id),
          })),
        );
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const moveTask = async (
    taskId: string, // _id is a string in MongoDB
    sourceColumnId: string,
    targetColumnId: string,
  ) => {
    const sourceColumn = columns.find((col) => col.id === sourceColumnId)!;
    const targetColumn = columns.find((col) => col.id === targetColumnId)!;
    // @ts-ignore
    const task = sourceColumn.tasks.find((task) => task._id === taskId)!;

    // Update the task's status in the backend
    try {
      await updateTodo(taskId, { ...task, status: targetColumnId });

      // Update the tasks locally after successful backend update
      // @ts-ignore
      setColumns((prevColumns) =>
        prevColumns.map((col) => {
          if (col.id === sourceColumnId) {
            return {
              ...col,
              // @ts-ignore
              tasks: col.tasks.filter((task) => task._id !== taskId),
            };
          }
          if (col.id === targetColumnId) {
            return {
              ...col,
              tasks: [...col.tasks, { ...task, status: targetColumnId }],
            };
          }
          return col;
        }),
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          // @ts-ignore
          <KanbanColumn key={column.id} column={column} moveTask={moveTask} />
        ))}
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
