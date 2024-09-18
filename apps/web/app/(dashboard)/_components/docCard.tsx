'use client'
import Image from 'next/image'
import { UploadDropzone } from '../../../utils/uploadthing'
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog'
import { trpc } from '../../_trpc/client'
import { useSession } from 'next-auth/react'
import { IoMdTime } from 'react-icons/io'
import Link from 'next/link'

const DocCard = () => {
  const { data } = useSession()
  const userId = data?.user?.id

  const { data: files, isLoading, error } = trpc.getFilesByUserId.useQuery(
    userId as string,
  )

  if (error) {
    console.error(error)
    return <div>Error loading files.</div>
  }
  return (
    <div className="w-full bg-white h-full flex flex-col overflow-hidden rounded-3xl hover:shadow-2xl hover:shadow-black cursor-pointer hover:scale-102 transition-all duration-300">
      <div className="bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#f5f5f5] to-[#b5daf8] bg-opacity-30 px-4 py-2 flex items-center justify-between">
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
          <Dialog>
            <DialogTrigger className="bg-gradient-to-tr from-[#aecef6] to-[#e8eeef] py-2 px-3 rounded-lg hover:shadow-sm">
              Upload
            </DialogTrigger>
            <DialogContent className="bg-white w-fit">
              <UploadDropzone
                appearance={{
                  button:
                    'ut-ready:bg-green-500 ut-uploading:cursor-not-allowed bg-blue-500 bg-none after:bg-orange-400 h-16 px-2 rounded-xl',
                  container: 'w-80 h-40 flex-row rounded-md w-full mx-auto',
                  allowedContent:
                    'flex h-8 flex-col items-center justify-center px-2 text-white',
                }}
                endpoint="fileUploader"
                onClientUploadComplete={(res:any) => {
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
        <div className="h-full overflow-hidden">
          {files && files.length > 0 ? (
            <div className="grid lg:grid-cols-4 grid-cols-2 md:h-full h-[300px] photo-grid">
              {files.map((file, index) => (
                <div
                  key={file.id}
                  className={`relative h-full w-full group ${
                    index >= 4 ? 'hidden lg:block' : ''
                  } ${index >= 7 ? 'lg:hidden' : ''}`}
                >
                  <Link href={file.url} target='_blank'>
                    <div className="absolute inset-0 group-hover:bg-black/40 z-20"></div>
                    <iframe
                      src={file.url}
                      className="h-full w-full"
                      title="PDF Viewer"
                    ></iframe>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px]">
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
    </div>
  )
}

export default DocCard
