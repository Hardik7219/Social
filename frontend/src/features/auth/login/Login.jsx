
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
        <div>
            <div className='h-screen w-full flex justify-center items-center'>

                <div className='h-100 w-100'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-10 justify-center items-center'>
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className='p-2 border-2 flex items-center justify-center gap-3 rounded-lg'>
                            <label><MdOutlineMail></MdOutlineMail></label>
                            <input type="email" placeholder='Email' name="email" className='outline-0' onChange={handleChange} />
                        </div>
                        <div className='p-2 border-2 flex items-center justify-center gap-3 rounded-lg'>
                            <label><RiLockPasswordLine></RiLockPasswordLine></label>
                            <input type="password" placeholder='Password' name="password" className='outline-0' onChange={handleChange} />
                        </div>
                        <div>
                            <button type="submit" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </div>
                        <div>
                            <Link to="/signup">Don't have an account? Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
