
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { loginUser } from "../../../services/auth.service";
function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");
        setLoading(true);

        try {

            const data = await loginUser(formData);

            login(data.user);

            navigate("/");

        } catch (error) {
            const message = error.response?.data?.message || "Login failed. Please try again.";
            setError(message);
            console.log(error.response?.data);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen w-full flex justify-center items-center px-4 py-12">
            <div className="auth-card">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gradient glow-text mb-2">Welcome back</h1>
                    <p className="text-slate-500 text-sm">Sign in to continue to Social</p>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    {error && (
                        <p className="text-red-400 text-sm text-center px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                            {error}
                        </p>
                    )}

                    <div className='auth-input-group'>
                        <label className="text-slate-400 shrink-0"><MdOutlineMail className="text-xl" /></label>
                        <input
                            type="email"
                            placeholder='Email'
                            name="email"
                            className='input-glass'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='auth-input-group'>
                        <label className="text-slate-400 shrink-0"><RiLockPasswordLine className="text-xl" /></label>
                        <input
                            type="password"
                            placeholder='Password'
                            name="password"
                            className='input-glass'
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
                        {loading ? "Logging in..." : "Sign in"}
                    </button>
                    <p className="text-center text-sm text-slate-500">
                        <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                            Don&apos;t have an account? Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
