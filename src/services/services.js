import { client } from "./axiosClient";
import axios from "axios";

export function getProfile(userId) {
    return client.get(`/profile/${userId}`);
}

export function getProfileSaved(userId) {
    return client.get(`/profile/saved/${userId}`);
}

export function followUser(followerId, userId) {
    return client.post('/profile/followuser', {
        follower_id: followerId,
        followed_id: userId
    });
}

export function unfollowUser(followerId, userId) {
    return client.post('/profile/unfollowuser', {
        follower_id: followerId,
        followed_id: userId
    });
}

export const addPost = (formData, onUploadProgress) => {
    return client.post('/posts/addpost',
        formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress,
    })
}

export function uploadStory(userId, story) {
    const formData = new FormData();
    let file;

    if (typeof story === 'string') {
        file = base64ToBlob(story);
    } else {
        file = story;
    }

    formData.append('story', file); const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    return axios.post(`https://bassheads.shop/story/upload/${userId}`, formData, config)
}

function base64ToBlob(base64String) {
    const base64WithoutPrefix = base64String.split(',')[1];

    const binaryData = atob(base64WithoutPrefix);

    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: 'image/jpeg' });

    return blob;
}

export function getStories(userId) {
    return client.get(`/story/${userId}/getstories`)
}

export function searchUser(query) {
    return client.get(`/searchuser/${query}`)
}

export function fetchUserChats(userId) {
    return client.post(`/chats`)
}

export function accessChat(userId) {
    return client.get(`/chats/${userId}`)
}

export function getMessages(chatId) {
    return client.get(`/messages/${chatId}`)
}

export function sentMessage(chatId, message) {
    return client.post(`/messages/${chatId}`, {
        content: message
    })
}

export function commentDelete(postId, commentId) {
    return client.delete(`/comment/${postId}/${commentId}`)
}

export function deleteCommentReply(postId, commentId, replyId) {
    return client.delete(`/comment/${postId}/${commentId}/replies/${replyId}`)
}

export function ResendOTP(email) {
    return client.post(`/resendmail/${email}`)
}

export function likePost(postId, userId) {
    return client.post(`/posts/${postId}/like`, { userId });
}


export function removePostLike(postId, userId) {
    return client.put(`/posts/${postId}/unlike`, { userId });
}

export function chatFileUpload(chatId, files) {
    const formData = new FormData();
    files.forEach((file, index) => {
        formData.append(`file${index}`, file);
    })
    return client.post(`/messages/${chatId}/fileupload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export function messageDelete(Id) {
    return client.put(`/messages/delete/${Id}`);
}

export function sendReport(report) {
    return client.post('/reports/content', { content: report });
}

export function addNewAd(Ad) {
    const formData = new FormData();

    Ad.images.forEach((img, index) => {
        if (img.imageFile) {
            formData.append(`images[${index}][file]`, img.imageFile);
            formData.append(`images[${index}][caption]`, img.caption);
            formData.append(`images[${index}][url]`, img.url);
        }
    });

    formData.append('title', Ad.title);
    formData.append('rate', Ad.rate);

    return client.post(`/ads/addAd`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export function confirmPayment(Id) {
    return client.put(`/ads/confirmpay/${Id}`);
}

export function getMyAds() {
    return client.get(`/ads/getads`);
}


export const getHomeAds = async () => {
    try {
        const response = await client.get(`/ads/gethomeads`);
        const data = await response.data;
        return data;
    } catch (error) {
        console.error("Error fetching home ads:", error);
        return { data: null };
    }
};

export async function ReportPost(Id, category, reason) {
    try {
        const response = await client.post(`/reports/post/${Id}`, {
            category,
            reason,
        });

        if (response.status === 200) {
            return { success: true, message: "Post was reported successfully" };
        } else if (response.status === 201) {
            return { success: false, message: "Post was already reported" };
        } else {
            return { success: false, message: "Failed to report post" };
        }
    } catch (error) {
        console.error("Error reporting post:", error);
        return { success: false, message: "An error occurred" };
    }
}


export async function ReportUser(Id, category, reason) {
    try {
        const response = await client.post(`/reports/user/${Id}`, {
            category,
            reason,
        });

        if (response.status === 200) {
            return { success: true, message: "User was reported successfully" };
        } else if (response.status === 201) {
            return { success: false, message: "User was already reported" };
        } else {
            return { success: false, message: "Failed to report user" };
        }
    } catch (error) {
        console.error("Error reporting user:", error);
        return { success: false, message: "An error occurred" };
    }
}


export async function updateUserLocation(location) {
    return client.post('/updatelocation', location);
}

export async function getUsersLocations() {
    try {
        const response = await client.get('/getlocations');
        if (response.status === 200) {
            return { success: true, data: response.data.users };
        } else {
            return { success: false, message: "Failed to get locations" };
        }
    } catch (error) {
        console.error("Error reporting user:", error);
        return { success: false, message: "An error occurred" };
    }
}
export const getReviews = (filter) => {
    return client.get(`/admin/reviews/${filter}`)
}

export const getPostReports = () => {
    return client.get(`/admin/postreports`);
}

export const BanPost = (Id) => {
    return client.post(`/admin/banpost/${Id}`);
}

export const getUserReports = () => {
    return client.get(`/admin/userreports`);
}

export const addLiveStream = (liveStreamData) => {
    return client.post(`/live/addlive`, {
        liveStreamData
    })
}
export const removeLiveStream = (userId) => {
    return client.delete(`/live/removelive/${userId}`)
}

export const sentReportFeedback = (data) => {
    return client.post(`/reports/addfeedback`, data);
}

export const getNotifications = (page) => {
    return client.get(`/notifications/${page}`);
}

export const onUpdateNotifications = () => {
    return client.put(`/notifications/update`)
}

export const onFollowUser = (follower_id, followed_id) => {
    return client.post(`/profile/followuser`, {
        follower_id: follower_id,
        followed_id: followed_id,
    });
}

export const unFollowUser = (follower_id, followed_id) => {
    return client.post('/profile/unfollowuser', { follower_id, followed_id });
}


export const savePost = (postId, author) => {
    return client.post(`/posts/${postId}/save/${author}`);
}

export const unsavePost = (postId, author) => {
    return client.post(`/posts/${postId}/unsave/${author}`);
}

export const getTransactions = () => {
    return client.get(`/admin/transactions`);
}

export const addNote = (note) => {
    return client.post(`/notes/addnote`, { note });
}

export const getNote = () => {
    return client.get(`/notes/getnote`);
}

export const deleteNote = () => {
    return client.delete(`/notes/deletenote`);
}

export const getNotes = () => {
    return client.get(`/notes`);
}

export const sendNoteReply = (noteId, reply) => {
    return client.post('/notes/reply', { noteId, reply });
}

export const getSuggestions = () => {
    return client.get('/getsuggestions');
}


export const getUsers = (query) => {
    return client.get(`/searchuser/${query}`);
}

export const sharePost = (postId, users) => {
    return client.post(`/posts/share/${postId}`, {
        users
    });

}

export const shareFiles = (chatId, files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));


    return client.post(`/messages/sharefile/${chatId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const uploadAudio = (chatId, data) => {
    const formDataObject = {};

    for (let pair of data.entries()) {
        formDataObject[pair[0]] = pair[1];
    }
    console.log('FormData:', formDataObject);
    return client.post(`/messages/audio/${chatId}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const checkUserExistsByEmail = (email) => {
    return client.post(`/check-email`, { email });
}

export const getExplorePosts = () => {
    return client.get('/posts/explore');
}

export const sendResetPassMail = (email) => {
    return client.post('/forgot-pass', { email });
}

export const resetPassword = (token, newPassword) => {
    return client.put('/reset-password', { token, newPassword });
}
