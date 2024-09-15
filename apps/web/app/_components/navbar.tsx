'use client'
import useScrollTop from '../../hooks/use-scroll'

const Navbar = () => {
  const scrolled = useScrollTop()
  return (
    <div
      className={`px-2 py-2 fixed duration-500 w-full ${
        scrolled
          ? 'bg-opacity-60 bg-slate-100 bg-clip-padding backdrop-filter backdrop-blur-sm '
          : 'bg-transparent'
      } `}
    >
      <div className="font-bold tracking-wide p-1 text-2xl">myCloud</div>
    </div>
  )
}

export default Navbar
