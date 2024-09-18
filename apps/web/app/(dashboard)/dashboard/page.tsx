import DocCard from '../_components/docCard'
import NotesCard from '../_components/notesCard'
import PhotoCard from '../_components/photoCard'
import ProfileCard from '../_components/profileCard'

const UserDashboard = () => {
  return (
    <div className=" bg-[url('/wallpaper.webp')] bg-cover min-h-screen bg-no-repeat bg-fixed">
      <div className="py-32 grid lgnew:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 max-w-[1082px] px-10 md:px-36 lgnew:px-0 mx-auto">
        <ProfileCard />
        <div className='lgnew:col-span-2 h-full '>
          <PhotoCard/>
        </div>
        <div className='lgnew:col-span-2 h-full '>
          <DocCard/>
        </div>
        <NotesCard />
      </div>
    </div>
  )
}

export default UserDashboard
