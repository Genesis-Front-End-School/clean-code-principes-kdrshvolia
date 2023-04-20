import { NextRequest, NextResponse } from "next/server";
import { tokenService } from "./api/requests";

const AUTH_TOKEN = "authToken";

export async function middleware(request: NextRequest) {
  // @ts-ignore
  let authToken = request.cookies.get(AUTH_TOKEN)?.value;
  if (!authToken) {
    authToken = await tokenService.getToken();
  }

  const response = NextResponse.next();

  // @ts-ignore
  response.cookies.set(AUTH_TOKEN, authToken);

  return response;
}
