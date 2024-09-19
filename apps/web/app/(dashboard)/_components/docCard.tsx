'use client'
import Image from 'next/image'
import { UploadDropzone } from '../../../utils/uploadthing'
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog'
import { trpc } from '../../_trpc/client'
import { useSession } from 'next-auth/react'
import { IoMdTime } from 'react-icons/io'
import { useState } from 'react'
import { toast } from 'sonner'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import Link from 'next/link'

const DocCard = () => {
  const { data } = useSession()
  const userId = data?.user?.id
  const [open, setOpen] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  const {
    data: files,
    isLoading,
    error,
    refetch,
  } = trpc.files.getFilesByUserId.useQuery(userId as string)

  const deleteFileMutation = trpc.files.deleteFile.useMutation({
    onSuccess: () => {
      toast.success('Document deleted successfully.')
      setGalleryOpen(false)
      refetch()
    },
    onError: (error: any) => {
      toast.error(`Error deleting document: ${error.message}`)
    },
  })

  const handleDocumentClick = (index: number) => {
    setStartIndex(index)
    setGalleryOpen(true)
  }

  const handleDeleteDocument = (fileId: string) => {
    deleteFileMutation.mutate({ id: fileId, userId: userId as string })
  }

  const galleryItems =
    files?.map((file, index) => ({
      original: file.url,

      renderItem: () => (
        <>
          <div className=" w-full h-full flex flex-col justify-center items-center">
            <div className="h-full w-full">
              <iframe
                src={file.url}
                className="w-full h-full"
                title={`Document ${index + 1}`}
              ></iframe>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-end py-3 w-full mt-20">
          <Link
          href={file.url}
          target='_blank'
              className=" h-10  items-center flex justify-center text-center right-2 bg-blue-500 text-white p-2 rounded"
            >
              Open
            </Link>
            <button
              onClick={() => handleDeleteDocument(file.id)}
              className=" h-10  items-center flex justify-center text-center right-2 bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </div>
        </>
      ),
    })) || []

  if (error) {
    console.error(error)
    return <div>Error loading files.</div>
  }

  return (
    <div className="w-full bg-white h-full flex flex-col overflow-hidden rounded-3xl hover:shadow-2xl hover:shadow-black cursor-pointer hover:scale-102 transition-all duration-300">
      <div className="bg-gradient-to-tr from-gray-200 to-blue-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-start gap-2 p-2">
          <Image
            src="/doc.png"
            height={50}
            width={50}
            alt="Cloud"
            className="bg-white rounded-lg"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold">Drive</span>
            <span className="text-xs font-extralight pt-1 flex items-center gap-[2px]">
              <IoMdTime className="h-3 w-3 text-blue-700" />{' '}
              <span> Recents </span>
            </span>
          </div>
        </div>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-gradient-to-tr from-blue-200 to-blue-400 py-2 px-3 rounded-lg hover:shadow-sm">
              Upload
            </DialogTrigger>
            <DialogContent className="bg-white w-fit">
              <UploadDropzone
                appearance={{
                  button:
                    'ut-ready:bg-green-500 ut-uploading:cursor-not-allowed bg-blue-500 h-16 px-2 rounded-xl',
                  container: 'w-80 h-40 flex-row rounded-md w-full mx-auto',
                  allowedContent:
                    'flex h-8 flex-col items-center justify-center px-2 text-white',
                }}
                endpoint="fileUploader"
                onClientUploadComplete={() => {
                  toast.success('Document uploaded successfully')
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
        <div className="h-full overflow-hidden">
          {files && files.length > 0 ? (
            <div className="grid lg:grid-cols-4 grid-cols-2 md:h-full h-[300px] photo-grid">
              {files.map((file, index) => (
                <div
                  key={file.id}
                  className={`relative h-full w-full group ${
                    index >= 4 ? 'hidden lg:block' : ''
                  }`}
                  onClick={() => handleDocumentClick(index)}
                >
                  <div className="absolute inset-0 group-hover:bg-black/40 z-20"></div>
                  <iframe
                    src={file.url}
                    className="h-full w-full"
                    title="Document Viewer"
                  ></iframe>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              {/* Placeholder content */}
              <div className="grid grid-cols-4 w-full h-full">
                <div className="bg-white"></div>
                <div className="bg-gray-50"></div>
                <div className="bg-white"></div>
                <div className="bg-gray-50"></div>
                <div className="bg-gray-50"></div>
                <div className="bg-white"></div>
                <div className="bg-gray-50"></div>
                <div className="bg-white"></div>
              </div>
            </div>
          )}
        </div>
      )}
      {isLoading && (
        <div className="flex items-center justify-center h-[300px]">
          Loading...
        </div>
      )}

      {galleryOpen && (
        <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
          <DialogContent className="bg-white w-full h-fit">
            <ImageGallery
              items={galleryItems}
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

export default DocCard
