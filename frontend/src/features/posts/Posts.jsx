import { useState, useRef } from 'react'
import Post from '../../components/ui/Post'
import { createPost, fetchPosts } from '../../services/post.servive'
import { FaRegImage, FaCode } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import SkeletonPost from '../../components/ui/skelotonLoaders/SkeletonPost';
import useAuth from '../../hooks/useAuth';

function Posts() {
  const [title, setTitle] = useState("");
  const imageRef = useRef();
  const [img, setImg] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("");
  const { user } = useAuth();
  const [posting, setPosting] = useState(false)
  const {
    data: posts,
    isLoading,
    error
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts
  });

  if (error) {
    return <h1>error</h1>
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(true)
    const formData = new FormData();
    formData.append('title', title);
    if (!code) formData.append('img', img);
    else formData.append('code', code);
    await createPost(formData);
    setTitle("");
    setImg(null);
    setCode("");
    setShowCode(false);
    setPosting(false)
  };

  const handleImgChange = (e) => {
    setCode("");
    setShowCode(false);
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  };

  const openCodeEditor = () => {
    setShowCode(true);
    setImg(null);
    if (imageRef.current) imageRef.current.value = "";
  };

  const closeCodeEditor = () => {
    setShowCode(false);
    setCode("");
  };

  const codeActive = showCode || !!code.trim();

  return (
    <>
      <div className='flex glass-panel rounded-2xl items-start mb-8 p-5 sm:p-6 gap-4 neon-ring animate-fade-in-up'>
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-14 w-14 rounded-full object-cover border border-blue-500/30 neon-ring shrink-0"
          />
        ) : (
          <div className="avatar-placeholder h-14 w-14 shrink-0" />
        )}
        <form onSubmit={handleSubmit} className='flex flex-1 min-w-0 gap-4 flex-col'>
          <div className="w-full">
            <textarea
              placeholder="What's on your mind?"
              className="input-field min-h-25 resize-none text-base"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {showCode && (
            <div className="code-snippet mx-0! w-full animate-fade-in">
              <div className="code-snippet-header">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex gap-1.5 shrink-0" aria-hidden>
                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/70" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400/90">
                    <FaCode className="text-sm" />
                    Write code
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeCodeEditor}
                  className="btn-ghost py-1.5 px-2.5 text-xs shrink-0"
                  aria-label="Remove code"
                >
                  <IoClose className="text-base" />
                </button>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="code-textarea"
                placeholder={'// Paste or type your code here\nfunction hello() {\n  console.log("Hello");\n}'}
                spellCheck={false}
                autoFocus
              />
              <p className="text-xs text-slate-500 px-4 py-2.5 border-t border-white/6 bg-white/2">
                Tip: start with{" "}
                <span className="font-mono text-cyan-400/80">```javascript</span>{" "}
                for syntax highlighting on the feed
              </p>
            </div>
          )}

          {img && (
            <div className="mx-5 mb-4 rounded-xl overflow-hidden border border-white/6 bg-black/40">
              <div className=" mx-0! w-full animate-fade-in">
                <button
                  type="button"
                  onClick={() => setImg(null)}
                  className="btn-ghost py-1.5 px-2.5 text-xs shrink-0 flex justify-self-end m-2"
                  aria-label="Remove code"
                >
                  <IoClose className="text-base" />
                </button>
              </div>
              <img
                src={URL.createObjectURL(img)}
                className='w-full max-h-96 object-contain'
                alt=''
              />
            </div>
          )}

          <div className='flex items-center justify-between gap-4 pt-1'>
            <div className='flex items-center gap-2'>
              <button
                type="button"
                onClick={() => imageRef.current.click()}
                disabled={codeActive}
                className="btn-ghost p-2.5 disabled:opacity-40"
                aria-label="Add image"
              >
                <FaRegImage className="text-lg text-cyan-400" />
              </button>
              <input
                type='file'
                accept='image/*'
                hidden
                ref={imageRef}
                onChange={handleImgChange}
              />
              <button
                type="button"
                className={`btn-ghost p-2.5 ${codeActive ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300" : ""}`}
                onClick={() => (showCode ? closeCodeEditor() : openCodeEditor())}
                aria-label="Add code"
                aria-pressed={codeActive}
              >
                <FaCode className="text-lg" />
              </button>
            </div>
            <button
              type="submit"
              className='btn-primary px-6'
              disabled={!title.trim() && !code.trim() && !img}
            >
              {posting ? ("Publishing...") : ("Publish")}
            </button>
          </div>
        </form>
      </div>

      {isLoading && (
        <div>
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </div>
      )}

      <div className="stagger-children">
        {posts && (
          posts.map((e) => (
            <div key={e._id}>
              <Post post={e} />
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Posts
