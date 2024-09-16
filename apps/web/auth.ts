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
      }
    
}satisfies NextAuthConfig
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)