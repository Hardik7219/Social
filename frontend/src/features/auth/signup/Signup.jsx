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
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await signUp(formData)
            if (res.status === 201) {
                navigate("/login");
            }
        } catch (error) {
            const message = error.response?.data?.message || "Signup failed. Please try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='min-h-screen w-full flex justify-center items-center px-4 py-12'>

            <div className="auth-card">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gradient glow-text mb-2">Create account</h1>
                    <p className="text-slate-500 text-sm">Join the community today</p>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {error && (
                        <p className="text-red-400 text-sm text-center px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                            {error}
                        </p>
                    )}

                    <div className='auth-input-group'>
                        <label className="text-slate-400 shrink-0"><BsPersonVideo className="text-xl" /></label>
                        <input type="text" placeholder='Username' name="username" className='input-glass' onChange={handleChange} />
                    </div>
                    <div className='auth-input-group'>
                        <label className="text-slate-400 shrink-0"><IoPerson className="text-xl" /></label>
                        <input type="text" placeholder='Name' name="name" className='input-glass' onChange={handleChange} />
                    </div>
                    <div className='auth-input-group'>
                        <label className="text-slate-400 shrink-0"><MdOutlineMail className="text-xl" /></label>
                        <input type="email" placeholder='Email' name="email" className='input-glass' onChange={handleChange} />
                    </div>
                    <div className='auth-input-group'>
                        <label className="text-slate-400 shrink-0"><RiLockPasswordLine className="text-xl" /></label>
                        <input type="password" placeholder='Password' name="password" className='input-glass' onChange={handleChange} />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
                        {loading ? "Creating account..." : "Sign up"}
                    </button>
                    <p className="text-center text-sm text-slate-500">
                        <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                            Already have an account? Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
