import API from "../lib/axios";


export const getSuggestedUsers = async () => {
    const res = await API.get("/user/suggestion")
    return res.data;
}

export const getUser = async (id) => {
    const res = await API.get(`/user/profile/${id}`)

    return res.data;


}
export const follow = async (id) => {

    await API.post(`/user/follow/${id}`)

}
export const getUserFollowings = async (id) => {

    const res = await API.get(`/user/getfollowings/${id}`)
    return res.data.followings;

}

export const getUserFollowers = async (id) => {
    const res = await API.get(`/user/getfollowers/${id}`)
    return res.data.followers;
}

export const updateProfile = async (formData) => {
    const res = await API.put("/user/update", formData);
    return res.data;
}

export const searchUser = async (query) => {
    const res = await API.get(
        `/user/search?q=${query}`
    );
    return res.data.users;

}