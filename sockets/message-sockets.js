const users = {};

module.exports = function(io) {
  console.log("running");
  //this .on listener runs everytime a user connect
  io.on("connection", function(socket) {
    //SOCKET ROUTES

    socket.on("new-name", function(data){
      //add property "name" to users object
      users[data.name] = socket;
      //send the names obtained from Object.keys to everybody
      io.emit('emit-users', Object.keys(users));
    });

    // push to all sockets
    // socket.on("new-message", function(data) {
    //   //send to all users
    //   io.emit('emit-message',data);
    // });

    //emit only to private sockets
    socket.on("new-message", function(data){
      const socket1 = users[data.sender];
      const socket2 = users[data.recipient];
      //convert to array for render function
      const dataList = [data];
      socket1.emit('emit-message', dataList);
      socket2.emit('emit-message', dataList);
    });

  });
};
