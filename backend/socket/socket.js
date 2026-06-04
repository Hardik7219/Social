import { Server } from "socket.io";

let io;

const users = {};

export const initSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            credentials: true
        }
    });

    io.on("connection", (socket) => {

        socket.on("add_user", (userId) => {
            users[userId] = socket.id;
        }
        );

        socket.on(
            "send_message",
            (data) => {
                const receiverSocketId = users[data.receiverId];

                if (receiverSocketId) {

                    io.to(receiverSocketId).emit(
                        "receive_message",
                        data
                    );
                    io.to(receiverSocketId).emit("receive_message_notification");
                }
            }
        );

        socket.on("disconnect", () => {

            for (const key in users) {

                if (
                    users[key] === socket.id
                ) {

                    delete users[key];
                }
            }
        });
    });
};

export const getReceiverSocketId = (
    userId
) => {

    return users[userId];
};

export { io };