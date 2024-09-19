import Link from 'next/link'
import { FaRegUserCircle } from 'react-icons/fa'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { auth,  } from '../../../auth';
import UserCircle from './userCicle';
const Navbar = async() => {
  const session = await auth()
  return (
    <div
      className={`px-2 py-2 fixed  duration-500 z-50 w-full ${'bg-opacity-60 bg-blue-400 bg-clip-padding backdrop-filter backdrop-blur-sm '} `}
    >
      <div className="flex items-center justify-between container mx-auto">
        <Link
          href={'/'}
          className="font-bold tracking-wide text-white    p-1 text-2xl"
        >
          myCloud
        </Link>
        <Popover>
          <PopoverTrigger>
            <FaRegUserCircle className="text-white h-6 w-6 " fill="white" />
          </PopoverTrigger>
          <PopoverContent className='bg-white rounded-xl  p-0'>
            <div className='bg-stone-100 p-4 text-gray-500'>
            {session?.user?.email}
            </div>
            <div className='p-2'>
           <UserCircle/>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default Navbar
