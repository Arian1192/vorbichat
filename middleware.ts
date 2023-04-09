import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'


// Set the paths that we don't require to be authenticated
const publicPaths = ['/', '/sign-in*', '/sign-up*']


const isPublic = (path: string) => {
    return publicPaths.find(pathString => {
        path.match(new RegExp(`^${pathString}$`.replace('*$', '($|/)')))
    })
}


export default withClerkMiddleware((req: NextRequest) => {
    if (isPublic(req.nextUrl.pathname)) return NextResponse.next()

    // if the user is not signed in, we redirect them to the sign in page.
    const { userId } = getAuth(req)

    if (!userId) {
        // redirect the users to /pages/sign-in/[[...index]].ts
        
        const signInUrl = new URL('/sign-in', req.url)
        signInUrl.searchParams.set('redirect_url', req.url)
        return NextResponse.redirect(signInUrl)
    }
    return NextResponse.next()
});

// Stop Middleware running on static files
export const config = { matcher: '/((?!_next/image|_next/static|favicon.ico).*)' };