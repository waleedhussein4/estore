import bcrypt from "bcryptjs";
import User from "@models/User";
import { NextResponse } from "next/server";
import connectDB from "@utils/db";


export async function POST(request) {
  await connectDB();
  const { firstName, lastName, username, email, password } = await request.json();

  if (!firstName || !lastName || !username || !email || !password) {
    return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 })
  }

  // TODO: credential validation

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return NextResponse.json({ error: "Email already in use." }, { status: 400 });
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return NextResponse.json({ error: "Username already in use." }, { status: 400 });
  }

  const user = new User({ firstName, lastName, username, email, password: bcrypt.hashSync(password, 10), registrationDate: new Date(), lastLogin: new Date(), role: "user" });


  try {
    await user.save();
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error registering user." }, { status: 500 });
  }

  return NextResponse.json({ message: "User registered." });
}

