import { db } from "@repo/db"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter:DrizzleAdapter(db),

    providers: [GitHub],
})