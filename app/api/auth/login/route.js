import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { users } from "@/app/api/lib/users";

const SECRET = "mysecretkey";


export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  // check password
  if (user.password !== password) {
    return NextResponse.json(
      { message: "Invalid password" },
      { status: 401 }
    );
  }

  // generate token
  const token = jwt.sign({ email: user.email }, SECRET, {
    expiresIn: "1d",
  });

  const response = NextResponse.json({ message: "Login successful" });

  // set cookie
  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
  });
 
  return response;
}