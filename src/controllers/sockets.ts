import { io } from "../app";


let activeUsers = [{userId: '', socketId: ''}];


io.on("connection", (socket) => { // solo para mostrar usuarios online
    socket.on("newUserAdded", (newUserId) => {
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push(
                {
                    userId: newUserId,
                    socketId: socket.id
                }
                )
            }
            const active = activeUsers.filter(user => user.userId !== '' )
            console.log("users connected", active)
            io.emit("getUsers", active) // send the users active
    })
    socket.on("newMessage", (data) => {
        console.log("2-",data)

        const {reciverId} = data
        console.log("3-",reciverId)

        const user = activeUsers.find((user) => user.userId === reciverId)
        if(user) {
            console.log("4-",user)
            io.to(user.socketId).emit("reciveMessage", data);
        }

    })

    socket.on("disconnected", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        console.log("user disconnected", activeUsers)
        io.emit("getUsers", activeUsers)
    })
})