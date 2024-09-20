'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const HomeSection = () => {
  const { status } = useSession()

  return (
    <div className="flex flex-col gap-1 items-center justify-center pt-[50px] md:pt-12">
      <div className="flex flex-col items-center justify-center  ">
        <div>
          <video
            height={380}
            width={430}
            src="/animation.mp4"
            playsInline
            autoPlay
            loop
            muted
          ></video>
        </div>
        <div className="font-bold md:text-[140px] text-7xl">myCloud</div>
      </div>
      <div className="flex flex-col items-center justify-center mt-[80px] md:mt-[0px]">
        <div>
          {status === 'authenticated' ? (
            <div className='flex max-w-screen-sm:flex-row items-center gap-2'>
              <Link href={"/dashboard"}
                className="bg-black rounded-full font-light text-white px-10 py-2 text-2xl mt-7 tracking-wider"
              >
                Dashboard
              </Link>
              {/* <button
                onClick={() => signOut()}
                className="bg-black rounded-full font-light text-white px-10 py-2 text-2xl mt-7 tracking-wider"
              >
                Sign Out
              </button> */}
            </div>
          ) : status === 'unauthenticated' ? (
            <button
              onClick={() => signIn('passkey')}
              className="bg-black rounded-full font-light text-white px-10 py-2 text-2xl mt-7 tracking-wider"
            >
              Sign In
            </button>
          ) : null}
        </div>
        <p className="text-xl md:mt-[40px] mt-[20px] md:mx-[0] mx-[20px] mb-[20px] md:max-w-[478px] max-w-[350px] md:text-[40px] text-[24px] md:leading-[44px] leading-[28px] text-[#1d1d1f] font-semibold text-center">
          The best place for all your photos, files, notes, mail, and more.
        </p>
      </div>
    </div>
  )
}

export default HomeSection
