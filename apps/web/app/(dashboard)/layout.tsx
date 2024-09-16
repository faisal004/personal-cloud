import Navbar from './_components/navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  )
}
