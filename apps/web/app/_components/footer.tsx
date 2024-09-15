const Footer = () => {
  return (
    <footer className=" flex p-5  bg-slate-100  min-h-20 w-full mx-auto">
      <div className="flex md:flex-row flex-col gap-2 items-center max-w-[1100px] mx-auto w-full justify-between text-slate-400 md:text-sm text-xs">
        <div className="grid grid-cols-3 divide-x divide-slate-400 ">
          <div className="flex items-center justify-center">System Status</div>
          <div className="flex items-center justify-center px-3">
            Privacy Policy
          </div>{' '}
          <div className="flex items-center justify-center pl-2 md:px-3">
            Terms & Conditions
          </div>
        </div>
        <div className="ml-5">Copyright © 2024 Apple Inc. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer
