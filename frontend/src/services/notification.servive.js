import API from "../lib/axios";

export const getNotifications = async () => {
    const res = await API.get('/notification')
    return res.data;
}


export const deleteNotifications = async () => {
    await API.delete('/notification')

}
export const getUnreadNotificationCount = async () => {

    const res = await API.get('/notification/unread-count"')

    return res.data;

};