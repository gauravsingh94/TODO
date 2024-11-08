import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../_connectDb/mongodb";
import Tasks from "../../_models/Tasks";
import { isAuthenticated } from "../../_jwt/jwt";

export async function GET(request: Request) {
  await dbConnect();

  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  try {
    const userId = await isAuthenticated(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const task = await Tasks.findById(id);
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  await dbConnect();

  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  try {
    const userId = await isAuthenticated(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const updatedTask = await Tasks.findByIdAndUpdate(id, body, { new: true });
    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request) {
  await dbConnect();

  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  try {
    const userId = await isAuthenticated(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const result = await Tasks.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Task deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 400 },
    );
  }
}

export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}
