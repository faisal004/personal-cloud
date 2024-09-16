'use client'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div
      className={`px-2 py-2 fixed duration-500 w-full ${
          'bg-opacity-60 bg-blue-400 bg-clip-padding backdrop-filter backdrop-blur-sm '
          
      } `}
    >
      <Link href={'/'} className="font-bold tracking-wide text-white    p-1 text-2xl">myCloud</Link>
    </div>
  )
}

export default Navbar
