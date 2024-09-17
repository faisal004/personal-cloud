import Image from 'next/image'
import { auth } from '../../../auth'

const PhotoCard = async () => {
  const session = await auth()
  console.log(session)
  return (
    <div className="w-full bg-white h-full flex flex-col overflow-hidden  rounded-3xl hover:shadow-2xl hover:shadow-black cursor-pointer hover:scale-102 transition-all duration-300">
      <div className="bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#f5f5f5]  to-[#b5daf8]  bg-opacity-30  p-4">
        <div className=" flex items-start gap-2 p-2">
          <Image
            src="/image.png"
            height={50}
            width={50}
            alt="Cloud"
            className=" bg-white rounded-lg"
          />
          <span className='text-2xl font-bold'>
            Photos
          </span>
        </div>
      </div>
    </div>
  )
}

export default PhotoCard
