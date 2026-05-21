import useAuth from '../../hooks/useAuth'
import { Link, useParams } from 'react-router-dom'
import { follow, getUser } from '../../services/user.servive'
import { getUserPost } from '../../services/post.servive'
import Post from '../../components/ui/Post'

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SkeletonPost from '../../components/ui/skelotonLoaders/SkeletonPost'
import SkeletonProfile from '../../components/ui/skelotonLoaders/SkeletonProfile'
import { IoArrowBack } from 'react-icons/io5'
function ProfilePage() {
  const { user } = useAuth()
  const { id } = useParams()
  const queryClient = useQueryClient();
  const otherUser = id !== user?._id;
  const {

    data: profile,

    isLoading: profileLoading,

    error: profileError

  } = useQuery({
    queryKey: ["profile", id],

    queryFn: async () => {
      if (id === user?._id) {
        return user;
      }

      return await getUser(id);
    },

    enabled: !!user
  })
  const {

    data: posts,

    isLoading: postsLoading,

    error: postsError

  } = useQuery({
    queryKey: ["posts", id],

    queryFn: () => getUserPost(id),

    enabled: !!user
  })

  const followMutation = useMutation({


    mutationFn: () => follow(id),

    onMutate: async () => {

      await queryClient.cancelQueries({

        queryKey: ["profile", id]
      });

      const previousProfile =
        queryClient.getQueryData([
          "profile",
          id
        ]);

      queryClient.setQueryData(
        ["profile", id],
        (old) => {

          if (!old) return old;

          const alreadyFollowing =
            old.followers?.includes(user?._id);

          return {
            ...old,

            followers: alreadyFollowing

              ? old.followers.filter(
                (f) => f !== user?._id
              )

              : [
                ...(old.followers || []),
                user?._id
              ]
          };
        }
      );

      return { previousProfile };
    },

    onError: (
      err,
      variables,
      context
    ) => {

      queryClient.setQueryData(

        ["profile", id],

        context.previousProfile
      );
    },

    onSettled: () => {

      queryClient.invalidateQueries({

        queryKey: ["profile", id]
      });
    }
  });
  const updateProfile = async () => {

  }
  if (profileLoading || postsLoading) {

    return <div>
      <SkeletonProfile></SkeletonProfile>
      <SkeletonPost></SkeletonPost>
    </div>;
  }
  console.log("user", posts);

  if (postsError || profileError) {
    return <h1>error</h1>
  }
  const isFollowing =
    profile?.followers?.includes(user?._id);
  return (
    <div className="min-h-screen max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      {profile && (
        <header className="glass-panel rounded-2xl p-6 sm:p-8 mb-8 neon-ring">
          <Link
            to="/"
            className=" text-slate-400  hover:text-white hover:bg-white/6 transition-all duration-300"
          >
            <IoArrowBack className="text-xl" />
          </Link>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="avatar-placeholder h-24 w-24 sm:h-28 sm:w-28" />
            <div className="flex-1 text-center sm:text-left min-w-0">
              <h1 className="text-2xl font-bold text-white truncate">{profile.username}</h1>
              <p className="text-slate-400 mt-1">{profile.name}</p>
              <p className="text-sm text-slate-500 mt-2 truncate">{profile.email}</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-end shrink-0">
              <button disabled={followMutation.isPending}
                onClick={() => {
                  otherUser
                    ? followMutation.mutate()
                    : updateProfile()
                }}

                className={
                  isFollowing
                    ? "btn-ghost"
                    : "btn-primary"
                }
              >
                {
                  otherUser
                    ? (isFollowing ? "Following" : "Follow")
                    : "Update profile"
                }
              </button>
              {otherUser && (
                <Link to={`/chatsec/${profile?._id}`} className="btn-ghost">
                  Message
                </Link>
              )}
            </div>
          </div>
        </header>
      )}

      <section>
        <p className="section-subtitle mb-2">Activity</p>
        <h2 className="section-title mb-6">Posts</h2>
        <div className='stagger-children'>
          {posts && (
            posts?.map((e) => (
              <div key={e._id}>
                <Post post={e}></Post>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
