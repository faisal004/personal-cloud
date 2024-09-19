"use client"
import { signOut } from "next-auth/react";
import { MdOutlineCancel } from "react-icons/md";

const UserCircle = () => {
    return (    <div      onClick={() => signOut()} className='flex items-center  gap-2 p-1 hover:bg-stone-100 cursor-pointer rounded-md text-red-500'>
    <MdOutlineCancel /> <span>Sign out </span>  
    </div> );
}
 
export default UserCircle;