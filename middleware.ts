import { NextRequest, NextResponse } from "next/server";
import { getToken } from "./api/requests";

export async function middleware(request: NextRequest) {
  // @ts-ignore
  let authToken = request.cookies.get("authToken")?.value;
  if (!authToken) {
    authToken = await getToken();
  }

  const response = NextResponse.next();

  // @ts-ignore
  response.cookies.set("authToken", authToken);

  return response;
}
