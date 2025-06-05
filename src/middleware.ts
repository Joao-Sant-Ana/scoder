import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const isAuth = !!token;
    const isOnLoginPage = request.nextUrl.pathname === '/admin';
    const isOnRegisterPage = request.nextUrl.pathname === '/admin/register';

    if ((isOnLoginPage || isOnRegisterPage) && isAuth) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    if (
        !isAuth &&
        request.nextUrl.pathname.startsWith('/admin') &&
        !isOnLoginPage &&
        !isOnRegisterPage
    ) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
