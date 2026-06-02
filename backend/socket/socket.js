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

        // add user
        socket.on("add_user", (userId) => {

            users[userId] = socket.id;
        });

        // send message
        socket.on("send_message", (data) => {

            const receiverSocketId =
                users[data.receiverId];

            if (receiverSocketId) {

                io.to(receiverSocketId).emit(

                    "receive_message",

                    data
                );
            }
        });

        socket.on("disconnect", () => {
            for (const key in users) {

                if (users[key] === socket.id) {

                    delete users[key];
                }
            }
        });
    });
};

export { io };