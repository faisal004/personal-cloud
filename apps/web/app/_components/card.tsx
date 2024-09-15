import Image from 'next/image'
import React from 'react'

interface CardProps {
  image?: string
  head?: string
  subhead?: string
}

const Card: React.FC<CardProps> = ({ image, head, subhead }) => {
  return (
    <div className="flex flex-col md:p-10 p-6   items-start justify-between gap-1  rounded-xl overflow-hidden shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] shadow-gray-300">
      <div className='h-full'>
        {image && (
          <Image
            height={500}
            width={500}
            className="object-contain flex items-center h-full p-3 justify-center"
            src={image}
            alt="Image"
          />
        )}
      </div>
      <div className='text-left mt-[30px]'>
        {head && <h2 className="text-[28px] leading-8 font-bold text-gray-800">{head}</h2>}
      </div>
      <div className="">
        {subhead && <p className="md:mt-7 mt-2 ">{subhead}</p>}
      </div>
    </div>
  )
}

export default Card
