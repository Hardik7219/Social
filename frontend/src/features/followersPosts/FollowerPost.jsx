
import Post from '../../components/ui/Post'
import { FollowersPost } from '../../services/post.servive'



import { useQuery } from "@tanstack/react-query";

import SkeletonPost from '../../components/ui/skelotonLoaders/SkeletonPost';

function FollowerPost() {

    const {
        data: posts,
        isLoading,
        error
    } = useQuery({
        queryKey: ["posts"],
        queryFn: FollowersPost
    })
    if (error) {
        return <h1>error</h1>
    }




    return (
        <>
            {isLoading && (
                <SkeletonPost></SkeletonPost>
            )}
            <div className="stagger-children">
                {posts && (
                    posts.map((e) => (
                        <div key={e._id}>
                            <Post post={e}></Post>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default FollowerPost 
