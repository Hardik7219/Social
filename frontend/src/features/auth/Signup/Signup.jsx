import { IoPerson } from "react-icons/io5";
import { BsPersonVideo } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
function Signup() {
    return (
        <div className='h-screen w-full flex justify-center items-center'>

            <div className='h-100 w-100'>
                <form className='flex flex-col gap-10 justify-center items-center'>
                    <div className='p-2 border-2 flex items-center justify-center gap-3 rounded-lg'>
                        <label><BsPersonVideo /></label>
                        <input type="text" placeholder='UserName' className='outline-0' />
                    </div>
                    <div className='p-2 border-2 flex items-center justify-center gap-3 rounded-lg'>
                        <label><IoPerson></IoPerson></label>
                        <input type="text" placeholder='Name' className='outline-0' />
                    </div>
                    <div className='p-2 border-2 flex items-center justify-center gap-3 rounded-lg'>                        
                        <label><MdOutlineMail></MdOutlineMail></label>
                        <input type="email" placeholder='Email' className='outline-0' />
                    </div>
                    <div className='p-2 border-2 flex items-center justify-center gap-3 rounded-lg'>                        
                        <label><RiLockPasswordLine></RiLockPasswordLine></label>
                        <input type="password" placeholder='Password' className='outline-0' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
