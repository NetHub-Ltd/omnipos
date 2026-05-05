// server action that feches the user from the backend using the access token from the session
import { NextResponse } from "next/server";
import { auth } from "@/auth"; 
import { fetchUser } from "@/lib/actions/fetchUser";

export async function GET() {
  const session = await auth();   
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await fetchUser()
  if (!data) {
    throw new Error("User not found", { cause: "not_found" });
  }
    return NextResponse.json(data);
  }