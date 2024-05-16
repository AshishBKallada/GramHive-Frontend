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
    return axios.post(`http://localhost:3000/story/upload/${userId}`, formData, config)
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
