import { NextResponse } from "next/server";

const BACKEND_BASE = "https://chatdku.dukekunshan.edu.cn/public";
const AUTH_URL = `${BACKEND_BASE}/auth/get-token`;

export async function GET() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "JWT_SECRET not configured" },
      { status: 500 },
    );
  }

  const response = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "X-Secret": secret },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: `Auth failed: ${response.status}` },
      { status: response.status },
    );
  }

  const data = await response.json();
  const token = data.token || data.access_token;

  if (!token) {
    return NextResponse.json(
      { error: "No token returned from auth endpoint" },
      { status: 502 },
    );
  }

  return NextResponse.json({ token });
}
