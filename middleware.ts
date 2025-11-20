import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define paths that are protected
    const isProtectedPath = path.startsWith('/admin');
    const isLoginPath = path === '/admin/login';

    if (isProtectedPath && !isLoginPath) {
        const cookie = request.cookies.get('session')?.value;

        if (!cookie) {
            return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
        }

        try {
            // Verify the session
            await decrypt(cookie);
            return NextResponse.next();
        } catch (error) {
            // If verification fails, redirect to login
            return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
        }
    }

    if (isLoginPath) {
        const cookie = request.cookies.get('session')?.value;
        if (cookie) {
            try {
                await decrypt(cookie);
                // If already logged in, redirect to dashboard
                return NextResponse.redirect(new URL('/admin', request.nextUrl));
            } catch (error) {
                // Invalid cookie, let them login
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin', '/admin/:path*'],
};
