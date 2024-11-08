import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../_connectDb/mongodb";
import Tasks from "../_models/Tasks";
import User from "../_models/User";
import { isAuthenticated } from "../_jwt/jwt";

export async function GET(req: Request) {
  await dbConnect();

  try {
    const userId = await isAuthenticated(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(userId).populate("tasks").exec();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const userId = await isAuthenticated(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(userId).populate("tasks").exec();
    const body = await request.json();
    console.log(body);
    console.log();
    const newTask = new Tasks({
      ...body,
    });

    const savedTask = await newTask.save();

    user.tasks.push(savedTask._id);

    await user.save();

    return NextResponse.json(savedTask, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}
export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}