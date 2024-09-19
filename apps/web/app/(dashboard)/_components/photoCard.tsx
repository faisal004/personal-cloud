'use client'
import Image from 'next/image'
import { UploadDropzone } from '../../../utils/uploadthing'
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog'
import { trpc } from '../../_trpc/client'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useState } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
const PhotoCard = () => {
  const { data } = useSession()
  const [open, setOpen] = useState(false)
  const [carouselOpen, setCarouselOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  const userId = data?.user?.id

  const {
    data: images,
    isLoading,
    error,
    refetch,
  } = trpc.images.getImagesByUserId.useQuery(userId as string)

  const deleteImageMutation = trpc.images.deleteImage.useMutation({
    onSuccess: () => {
      toast.success('Image deleted successfully.')
      refetch()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const handleDeleteImage = async (imageId: string) => {
    deleteImageMutation.mutate({ id: imageId, userId: userId as string })
  }

  const galleryImages =
    images?.map((image) => ({
      original: image.url,
      thumbnail: image.url,
      originalAlt: 'User uploaded image',
      renderItem: () => (
        <div className="  w-full h-full">
          <Image
            src={image.url}
            alt="User uploaded"
            height={500}
            width={500}
            className="w-full h-full object-contain"
          />
          <div className="flex items-center justify-end py-3">
            <button
              onClick={() => handleDeleteImage(image.id)}
              className=" h-10  items-center flex justify-center text-center right-2 bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ),
    })) || []
  const handleImageClick = (index: number) => {
    setStartIndex(index)
    setCarouselOpen(true)
  }
  if (error) {
    console.error(error)
    return <div>Error loading images.</div>
  }

  console.log(images)
  return (
    <div className="w-full bg-white h-full flex flex-col overflow-hidden  rounded-3xl hover:shadow-2xl hover:shadow-black cursor-pointer hover:scale-102 transition-all duration-300">
      <div className="bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#f5f5f5]  to-[#b5daf8]  bg-opacity-30  px-4 py-2 flex items-center justify-between">
        <div className=" flex items-start gap-2 p-2">
          <Image
            src="/image.png"
            height={50}
            width={50}
            alt="Cloud"
            className=" bg-white rounded-lg"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold">Photos</span>
            <span className="text-xs font-extralight pt-1">
              Library - {images?.length} Photos{' '}
            </span>
          </div>
        </div>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
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
                onClientUploadComplete={(res: any) => {
                  toast.success('Image have been uploaded Successfully')
                  setOpen(false)
                  refetch()
                }}
                onUploadError={(error: Error) => {
                  toast.error(` ${error.message}`)
                  setOpen(false)
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
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`relative h-full w-full group ${
                    index >= 4 ? 'hidden lg:block' : ''
                  } ${index >= 7 ? 'lg:hidden' : ''}`}
                  onClick={() => handleImageClick(index)}
                >
                  <div className="absolute inset-0 group-hover:bg-black/40 z-20"></div>
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
            <div className="flex items-center justify-center h-[300px]">
              <div className="grid grid-cols-4 w-full h-full">
                <div className="  bg-white"></div>
                <div className=" bg-gray-50"></div>
                <div className="  bg-white"></div>
                <div className=" bg-gray-50"></div>
                <div className=" bg-gray-50"></div>
                <div className="  bg-white"></div>
                <div className=" bg-gray-50"></div>
                <div className="  bg-white"></div>
              </div>
            </div>
          )}
        </div>
      )}
      {isLoading && (
        <div className="flex items-center justify-center h-full">
          Loading...
        </div>
      )}
      {carouselOpen && (
        <Dialog open={carouselOpen} onOpenChange={setCarouselOpen}>
          <DialogContent className="bg-blue-50 w-full h-fit">
            <ImageGallery
              items={galleryImages}
              startIndex={startIndex}
              showThumbnails={false}
              showPlayButton={false}
              showFullscreenButton={false}
              renderItem={(item: any) => item.renderItem()}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default PhotoCard
