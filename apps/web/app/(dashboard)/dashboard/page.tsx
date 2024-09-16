import ProfileCard from '../_components/profileCard'

const UserDashboard = () => {
  return (
    <div className=" bg-[url('/wallpaper.webp')] bg-cover min-h-screen bg-no-repeat bg-fixed">
      <div className="pt-32 grid grid-cols-3 gap-6 max-w-[1082px] mx-auto">
        <ProfileCard />
        <div className="bg-white col-span-2 w-full h-full">sdsd</div>{' '}
        <div className="bg-white col-span-2 w-full h-full">sdsd</div>{' '}
        <div className="bg-white w-full h-full">sdsd</div>
      </div>
    </div>
  )
}

export default UserDashboard
