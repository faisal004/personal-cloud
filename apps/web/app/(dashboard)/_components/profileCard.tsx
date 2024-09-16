import Image from 'next/image'
import { auth } from '../../../auth'

const ProfileCard = async () => {
  const session = await auth()
  console.log(session)
  return (
    <div>
      <div className="relative w-full h-full flex flex-col items-start justify-center overflow-hidden p-10 rounded-3xl bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#f5f5f5]  to-[#80bef0] hover:shadow-2xl hover:shadow-black cursor-pointer hover:scale-105 transition-all duration-300">
        <Image
          src="/cloud.svg"
          height={220}
          width={220}
          alt="Cloud"
          className="md:-translate-x-10 md:-translate-y-6 -translate-x-0 -translate-y-0"
        />
        <Image
          src="/userCircle.svg"
          height={140}
          width={140}
          alt="UserCircle"
          className="absolute md:left-8 md:top-11 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0"
        />
        <div className="text-gray-600 text-lg tracking-wide">
          {session?.user?.email}
        </div>
        <div className="font-semibold text-gray-800 mt-1 ">myCloud</div>
      </div>
    </div>
  )
}

export default ProfileCard
