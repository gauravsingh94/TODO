import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../_connectDb/mongodb";
import User from "../../_models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    await dbConnect();
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "Incorrect Email" },
        { status: 400 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: false, message: "Incorrect password" },
        { status: 400 }
      );
    }

    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json({ success: true, token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse("", {
    status: 200,
  });
};
