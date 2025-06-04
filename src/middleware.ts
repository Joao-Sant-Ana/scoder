import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const isAuth = !!token;
    const isOnLoginPage = request.nextUrl.pathname === '/admin';

    if (isOnLoginPage && isAuth) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    if (
        !isAuth &&
        request.nextUrl.pathname.startsWith('/admin') &&
        request.nextUrl.pathname !== '/admin'
    ) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
