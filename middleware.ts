import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//public
const AUTH_PATH: any = { '/sign-in': true, '/sign-up': true, '/forgot-password': true };

//private
const PATH: any = ['test', 'hi-1'];

export async function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get('token');
  const url = request.nextUrl.clone();

  const isMatchAuthPath = AUTH_PATH[request.nextUrl.pathname];
  const isMatchPath = PATH.find((path: string) => request.nextUrl.pathname.includes(path));

  if (token) {
    if (isMatchAuthPath) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (!token && isMatchPath) {
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/sign-in', '/sign-up', '/information', '/forgot-password'],
// };
