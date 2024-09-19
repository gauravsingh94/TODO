import mongoose, { Document, Schema } from "mongoose";

export interface Task extends Document {
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate?: string;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    required: true,
  },
  priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
  dueDate: { type: String, default: null },
});

const Tasks = mongoose.models.Task || mongoose.model<Task>("Task", TaskSchema);
export default Tasks;
