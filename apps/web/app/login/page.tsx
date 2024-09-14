'use client'

import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/webauthn'
import { signOut } from "next-auth/react"
import { useEffect } from 'react'
export default function Login() {
  const { status,data } = useSession()
console.log(status)
  // const getAuth = async () => {
  //   try {
  //     const session = await auth()
  //     console.log(session)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // useEffect(() => {
  //   getAuth()
  // }, [])
  return (
    <div>

      {status === 'authenticated' ? (
        <>
          {/* <button onClick={() => signIn('passkey', { action: 'register' })}>
          Register new Passkey
        </button> */}
         <button onClick={() => signOut()}>
         Signout
       </button>
        </>
      
      ) : status === 'unauthenticated' ? (
        <button onClick={() => signIn('passkey')}>Sign in with Passkey</button>
      ) : null}
    </div>
  )
}
