import { db } from "@repo/db"
import NextAuth, { NextAuthConfig } from "next-auth"
import Passkey from "next-auth/providers/passkey"

import { DrizzleAdapter } from "@auth/drizzle-adapter"


export const authConfig =
{
    adapter: DrizzleAdapter(db),

    providers: [Passkey],
    experimental: { enableWebAuthn: true },
    callbacks: {
      async session({session, user}) {
        session.user.id = user.id
        return session
      },
        authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth?.user
          const paths = ["/error"]
          const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))
    
          if (isProtected && !isLoggedIn) {
            const redirectUrl = new URL("api/auth/signin", nextUrl.origin)
            redirectUrl.searchParams.append("callbackUrl", nextUrl.href)
            return Response.redirect(redirectUrl)
          }
          
          return true
        },
        async redirect({ url, baseUrl }) {
            // Allows us to control the redirect after sign-in
            return url.startsWith(baseUrl) ? url : baseUrl;
          },
      }
    
}satisfies NextAuthConfig
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)