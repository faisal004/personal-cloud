import Image from 'next/image'
import { auth } from '../../../auth'

const ProfileCard = async () => {
  const session = await auth()
  console.log(session)
  return (
    <div>
      <div className="relative w-full h-full flex flex-col items-start justify-center overflow-hidden p-10 rounded-3xl bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#f5f5f5]  to-[#80bef0] hover:shadow-2xl hover:shadow-black cursor-pointer hover:scale-102 transition-all duration-300">
      
      <div className='relative '>
      <Image
          src="/cloud.svg"
          height={220}
          width={220}
          alt="Cloud"
          className="-translate-x-8 -translate-y-6 "
        />
        <Image
          src="/userCircle.svg"
          height={140}
          width={140}
          alt="UserCircle"
          className="absolute top-0 "
        />
      </div>
      
        <div className="text-gray-600 text-lg tracking-wide">
          {session?.user?.email}
        </div>
        <div className="font-semibold text-gray-800 mt-1 ">myCloud</div>
      </div>
    </div>
  )
}

export default ProfileCard
