import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack, IoPerson } from "react-icons/io5";
import { BsPersonVideo } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegImage } from "react-icons/fa6";
import { MdOutlineDescription } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "../../services/user.servive";

function ProfileUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, login, loading: authLoading } = useAuth();
  const imageRef = useRef();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    bio: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user || user._id !== id) {
      navigate(user?._id ? `/profile/${user._id}` : "/login");
      return;
    }

    setFormData({
      username: user.username || "",
      name: user.name || "",
      bio: user.bio || "",
    });
    if (user.avatar) {
      setAvatarPreview(user.avatar);
    }
  }, [user, id, authLoading, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    setError("");
    setShowPasswordModal(true);
  };

  const handleConfirmUpdate = async () => {
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = new FormData();
      payload.append("username", formData.username);
      payload.append("name", formData.name);
      payload.append("bio", formData.bio);
      payload.append("currentPassword", password);
      if (avatarFile) {
        payload.append("avatar", avatarFile);
      }

      const data = await updateProfile(payload);
      login(data.user);
      queryClient.invalidateQueries({ queryKey: ["profile", id] });
      setShowPasswordModal(false);
      setPassword("");
      navigate(`/profile/${id}`);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Update failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen max-w-lg mx-auto px-4 sm:px-6 py-8 flex items-center justify-center">
        <p className="text-slate-500 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-lg mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="auth-card max-w-lg">
        <Link
          to={`/profile/${id}`}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
        >
          <IoArrowBack className="text-xl" />
          <span className="text-sm">Back to profile</span>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gradient glow-text mb-2">
            Update profile
          </h1>
          <p className="text-slate-500 text-sm">
            Change your info — you&apos;ll confirm with your password
          </p>
        </div>

        <form onSubmit={handleUpdateClick} className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-3 mb-2">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover border border-blue-500/30 neon-ring"
              />
            ) : (
              <div className="avatar-placeholder h-24 w-24" />
            )}
            <button
              type="button"
              onClick={() => imageRef.current?.click()}
              className="btn-ghost text-xs gap-2"
            >
              <FaRegImage className="text-cyan-400" />
              Change photo
            </button>
            <input
              type="file"
              accept="image/*"
              hidden
              ref={imageRef}
              onChange={handleAvatarChange}
            />
          </div>

          <div className="auth-input-group">
            <label className="text-slate-400 shrink-0">
              <BsPersonVideo className="text-xl" />
            </label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              className="input-glass"
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label className="text-slate-400 shrink-0">
              <IoPerson className="text-xl" />
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              className="input-glass"
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group items-start py-3">
            <label className="text-slate-400 shrink-0 mt-0.5">
              <MdOutlineDescription className="text-xl" />
            </label>
            <textarea
              placeholder="Bio"
              name="bio"
              value={formData.bio}
              rows={3}
              className="input-glass resize-none"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-primary w-full mt-2">
            Update profile
          </button>
        </form>
      </div>

      {showPasswordModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => !loading && setShowPasswordModal(false)}
        >
          <div
            className="auth-card w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white mb-1">
              Confirm your password
            </h2>
            <p className="text-slate-500 text-sm mb-5">
              Enter your password to save these changes.
            </p>

            {error && (
              <p className="text-red-400 text-sm text-center px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 mb-4">
                {error}
              </p>
            )}

            <div className="auth-input-group mb-5">
              <label className="text-slate-400 shrink-0">
                <RiLockPasswordLine className="text-xl" />
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                className="input-glass"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleConfirmUpdate();
                }}
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="btn-ghost flex-1"
                disabled={loading}
                onClick={() => {
                  setShowPasswordModal(false);
                  setPassword("");
                  setError("");
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary flex-1"
                disabled={loading}
                onClick={handleConfirmUpdate}
              >
                {loading ? "Updating..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileUpdate;
