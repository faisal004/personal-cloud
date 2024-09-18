'use client'
import Image from 'next/image'
import { MdDeleteOutline } from 'react-icons/md'
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog'
import { trpc } from '../../_trpc/client'
import { useSession } from 'next-auth/react'
import { FaPen } from 'react-icons/fa'
import { NotesEditor } from './notesEditor'
import { useState } from 'react'
import GenericAlertDialog from './deleteAlert'
type Note = {
  id: string
  userId: string
  content: string
  // Add any other properties your note may have
}
const NotesCard = () => {
  const { data } = useSession()
  const [showAlert, setShowAlert] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const userId = data?.user?.id
  const deleteNoteMutation = trpc.deleteNote.useMutation()
  const {
    data: notes,
    isLoading,
    error,
    refetch,
  } = trpc.geNotesByUserId.useQuery(userId as string)

  const handleEditClick = (note: any) => {
    setSelectedNote(note)
    setOpen(true)
  }
  const handleDelete = (note: any) => {
    setSelectedNote(note)
    setShowAlert(true)
  }
  const handleConfirmDelete = async () => {
    if (selectedNote) {
      await deleteNoteMutation.mutateAsync({
        userId: userId as string,
        id: selectedNote.id,
      })
      refetch() 
      setShowAlert(false) 
      setSelectedNote(null) 
    }
  }

  const handleCloseDialog = () => {
    setOpen(false)
    setSelectedNote(null)
    refetch()
  }
  if (error) {
    console.error(error)
    return <div>Error loading images.</div>
  }

  return (
    <>
      <div className="w-full bg-white h-full flex flex-col overflow-hidden  rounded-3xl hover:shadow-2xl hover:shadow-black cursor-pointer hover:scale-102 transition-all duration-300">
        <GenericAlertDialog
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          actionType="note"
          onConfirm={handleConfirmDelete}
        />
        <div className="bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#f5f5f5]  to-[#b5daf8]  bg-opacity-30  px-4 py-2 flex items-center justify-between">
          <div className=" flex items-start gap-2 p-2">
            <Image
              src="/notes.png"
              height={50}
              width={50}
              alt="Cloud"
              className=" bg-white rounded-lg"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold">Notes</span>
              <span className="text-xs font-extralight pt-1">All Notes</span>
            </div>
          </div>
          <div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className="bg-gradient-to-tr from-[#aecef6] to-[#e8eeef] py-2 px-3 rounded-lg hover:shadow-sm">
                <FaPen />
              </DialogTrigger>
              <DialogContent className="bg-white w-[80vw] h-[80vh] p-3">
                <NotesEditor note={selectedNote} onClose={handleCloseDialog} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {!isLoading && (
          <div className="h-[300px] ">
            {notes && notes.length > 0 ? (
              <div className=" md:h-full h-[300px]  flex flex-col overflow-y-scroll ">
                {notes.map((notes) => (
                  <div
                    key={notes.id}
                    className="grid grid-cols-1  border-b-2 p-2 hover:bg-slate-50 relative group "
              
                  >
                    <div className='flex items-center gap-2 absolute right-2 top-10'>
                    <button
                       onClick={() => handleEditClick(notes)}
                      className=" hidden group-hover:flex hover:bg-blue-300 rounded-md "
                    >
                      <FaPen
                        className="h-5 w-5 text-blue-400"
                        fill="blue"
                      />
                    </button>
                    <button
                      onClick={() => handleDelete(notes)}
                      className=" hidden group-hover:flex hover:bg-red-300 rounded-md "
                    >
                      <MdDeleteOutline
                        className="h-6 w-6 text-red-400"
                        fill="red"
                      />
                    </button>
                    </div>
                
                    <div className="text-[20px] capitalize">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: notes.content.slice(0, 10),
                        }}
                      />
                    </div>
                    <div className="line-clamp-1">
                      <div
                        dangerouslySetInnerHTML={{ __html: notes.content }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px]">
                <div className="grid grid-cols-2 w-full h-full">
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
          <div className="flex items-center justify-center h-[300px]">
            Loading...
          </div>
        )}
      </div>
    </>
  )
}

export default NotesCard
