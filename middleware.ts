import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')

    if (isAuthPage) {
        if (token) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next()
    }

    if (!token && request.nextUrl.pathname !== '/') {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (request.nextUrl.pathname === '/user' && token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard', '/user', '/login', '/register'],
}