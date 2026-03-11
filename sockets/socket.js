let io;

const initSocket=(server)=>{
    io=require("socket.io")(server,{
        cors: {
      origin: "*",
    },
    });
    io.on("connection",(socket)=>{
        console.log("user connected ",socket.id)
        socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
    })
}
const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = { initSocket, getIO };