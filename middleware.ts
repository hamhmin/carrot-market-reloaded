/* 미들웨어에선 최소한의 npm 지원, 페이지 로드 전 실행됨, 
쿠키확인, 페이지json으로 변환 등의 작업가능 
주로 로그인 유무에 따라 페이지를 진입 가능/불가능하는 기능 다룸
*/
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";
import db from "./lib/db";
import { notFound } from "next/navigation";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
  "/github/start": true,
  "/github/complete": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const pathname = request.nextUrl.pathname;
  const exists = publicOnlyUrls[pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  //   const pathname = request.nextUrl.pathname;
  //   if (pathname === "/") {
  //     const response = NextResponse.next();
  //     response.cookies.set("middleware-cookie", "hello!");
  //     return response;
  //   }
  //   console.log(cookies());
  //   const session = await getSession();
  //   console.log(session);
  //   console.log(request.cookies.getAll());
  //   if (request.nextUrl.pathname === "/profile") {
  // return Response.json({
  //   error: "you are not allowed here!",
  // });
  //   return Response.redirect(new URL("/", request.url));
  //   }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
  //   matcher: ["/", "/profile", "/create-account", "/user/:path*"],
  // "/user/:path*" => /user/asdasd , /user/zxczxc/zxczxc . . . // /user~ 로 시작하는 모든것에 미들웨어 실행
  //matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"] // api, _next.static, _next.image, favicon.ico를 제외한 모든것에 미들웨어 실행
};
