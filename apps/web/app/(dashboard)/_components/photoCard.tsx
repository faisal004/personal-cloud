'use client'
import Image from 'next/image'
import { UploadDropzone } from '../../../utils/uploadthing'
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog'
import { trpc } from '../../_trpc/client'
import { useSession } from 'next-auth/react'

const PhotoCard = () => {
  const { data } = useSession()

  const userId = data?.user?.id

  const { data: images, isLoading, error } = trpc.getImagesByUserId.useQuery(
    userId as string,
  )

  //  if (isLoading) {
  //    return <div>Loading...</div>
  //  }

  if (error) {
    console.error(error)
    return <div>Error loading images.</div>
  }

  console.log(images)
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
      {!isLoading && (
        <div className="h-full overflow-hidden  ">
          {images && images.length > 0 ? (
            <div className="grid lgnew:grid-cols-4 grid-cols-2 md:h-full h-[300px] photo-grid  ">
              {images.map((image,index) => (
                <div
                key={image.id}
                className={`relative h-full w-full group ${
                  index >= 4 ? 'hidden lg:block' : ''
                } ${index >= 7 ? 'lg:hidden' : ''}`}
              >
                  <div className='absolute inset-0 group-hover:bg-black/40 z-20'></div>
                  <Image
                    src={image.url}
                    alt="User uploaded"
                    layout="fill"
                    objectFit="cover"
                    className="h-full w-full"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>No images found.</div>
          )}
        </div>
      )}
      {
        isLoading && (
          <div className='flex items-center justify-center h-full'>
            Loading...
          </div>
        )
      }
    </div>
  )
}

export default PhotoCard
