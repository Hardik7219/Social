import { IoPerson } from "react-icons/io5";
import { BsPersonVideo } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import { signUp } from "../../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        name: "",
        password: ""
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res =await signUp(formData)
            navigate("/");
            console.log(res);
            

        } catch (error) {
            console.log(error.response.data);
        }
    }
    return (
        <div className='h-screen w-full flex justify-center items-center'>

            <div className='h-100 w-100'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-10 justify-center items-center'>
                    <div className='p-2 border-2 flex items-center justify-center gap-3 rounded-lg'>
                        <label><BsPersonVideo /></label>
                        <input type="text" placeholder='UserName' name="username" className='outline-0' onChange={handleChange} />
                    </div>
                    <div className='p-2 border-2 flex items-center justify-center gap-3 rounded-lg'>
                        <label><IoPerson></IoPerson></label>
                        <input type="text" placeholder='Name' name="name" className='outline-0' onChange={handleChange} />
                    </div>
                    <div className='p-2 border-2 flex items-center justify-center gap-3 rounded-lg'>
                        <label><MdOutlineMail></MdOutlineMail></label>
                        <input type="email" placeholder='Email' name="email" className='outline-0' onChange={handleChange} />
                    </div>
                    <div className='p-2 border-2 flex items-center justify-center gap-3 rounded-lg'>
                        <label><RiLockPasswordLine></RiLockPasswordLine></label>
                        <input type="password" placeholder='Password' name="password" className='outline-0' onChange={handleChange} />
                    </div>
                    <div>
                        <button type="submit">submit</button>
                    </div>
                    <div>
                        <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
