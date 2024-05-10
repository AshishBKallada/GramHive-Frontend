export const getSender = (userId, users) => {
    return users[0]._id === userId ? users[1].username : users[0].username;
}

export const getSenderImage = (userId, users) => {
    return users[0]._id === userId ? users[1].image : users[0].image;
}
export const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    );
}

export const isLastMessage = (messages, i, userId) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    );
}