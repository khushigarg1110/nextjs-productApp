import { NextResponse } from "next/server";
import { users } from "@/app/api/lib/users";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;
  console.log("Users:", users);

  // check if user already exists
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  // store new user
  users.push({ email, password });

  return NextResponse.json({ message: "User registered successfully" });
}