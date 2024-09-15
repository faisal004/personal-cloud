import { db } from "@repo/db"
import NextAuth from "next-auth"
import Passkey from "next-auth/providers/passkey"

import { DrizzleAdapter } from "@auth/drizzle-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter:DrizzleAdapter(db),

    providers: [Passkey],
    experimental: { enableWebAuthn: true },
})