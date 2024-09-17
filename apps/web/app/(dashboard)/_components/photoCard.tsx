'use client'
import Image from 'next/image'
import {  UploadDropzone } from '../../../utils/uploadthing'
import {
  Dialog,
  DialogContent,

  DialogTrigger,
} from '../../ui/dialog'

const PhotoCard = () => {
  return (
    <div className="w-full bg-white h-full flex flex-col overflow-hidden  rounded-3xl hover:shadow-2xl hover:shadow-black cursor-pointer hover:scale-102 transition-all duration-300">
      <div className="bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#f5f5f5]  to-[#b5daf8]  bg-opacity-30  p-4 flex items-center justify-between">
        <div className=" flex items-start gap-2 p-2">
          <Image
            src="/image.png"
            height={50}
            width={50}
            alt="Cloud"
            className=" bg-white rounded-lg"
          />
          <span className="text-2xl font-bold">Photos</span>
        </div>
        <div>
          <Dialog>
            <DialogTrigger className="bg-gradient-to-tr from-[#aecef6] to-[#e8eeef] py-2 px-3 rounded-lg hover:shadow-sm">
              Upload
            </DialogTrigger>
            <DialogContent className="bg-white w-fit">
              <UploadDropzone
                appearance={{
                  button:
                    'ut-ready:bg-green-500 ut-uploading:cursor-not-allowed  bg-blue-500 bg-none after:bg-orange-400 h-16 px-2 rounded-xl',
                  container: 'w-80 h-40 flex-row rounded-md  w-full mx-auto',
                  allowedContent:
                    'flex h-8 flex-col items-center justify-center px-2 text-white',
                }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log('Files: ', res)

                  alert('Upload Completed')
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`)
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default PhotoCard
