const express = require('express');
const app = express();
const generateID = () => Math.random().toString(36).substring(2, 10);
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const http = require('http').Server(app);
const cors = require('cors');
app.use(cors());

let chatRooms = [
  // {
  //   id: '1',
  //   name: 'Julie Watson',
  //   userImage: '../../../assets/images/png/mydp.png',
  //   messages: [
  //     {
  //       id: '1a',
  //       text: 'Hello guys, welcome!',
  //       time: '07:50',
  //       user: 'Julie Watson',
  //     },
  //     {
  //       id: '1b',
  //       text: 'Hi Tomer, thank you! 😇',
  //       time: '08:50',
  //       user: 'Emily',
  //     },
  //   ],
  // },
];

const socketIO = require('socket.io')(http, {
  cors: {
    origin: '<http://localhost:4000>',
    methods: ['GET', 'POST'],
  },
});

socketIO.on('connection', socket => {
  console.log(`⚡: ${socket.id} user just connected!`);
  // socket.emit('roomsList', chatRooms);
  const users = [];
  for (let [id, socket] of socketIO.of('/').sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socketIO.emit('users', users);
  console.log(users);
  socket.broadcast.emit('user connected', {
    userID: socket.id,
    username: socket.username,
  });
  socket.on('private message', ({content, to, timestamp}) => {
    console.log('sent,recieve', content, to);
    socket.to(to).emit('private message', {
      content,
      from: socket.id,
      time: `${timestamp.hour}:${timestamp.mins}`,
    });
  });

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('🔥: A user disconnected');
  });
});

// socketIO.on('connection', socket => {
//   console.log(`⚡: ${socket.id} user just connected!`);
//   // socket.emit('roomsList', chatRooms);
//   const users = [];
//   for (let [id, socket] of socketIO.of('/').sockets) {
//     users.push({
//       userID: id,
//       username: socket.username,
//     });
//   }

//   socketIO.emit('users', users);

//   socket.on('createRoom', name => {
//     socket.join(name);
//     //👇🏻 Adds the new group name to the chat rooms array
//     chatRooms.unshift({id: generateID(), name, messages: []});
//     //👇🏻 Returns the updated chat rooms via another event
//     socketIO.emit('roomsList', chatRooms);
//   });

//   socket.on('findRoom', id => {
//     //👇🏻 Filters the array by the ID
//     let result = chatRooms.filter(room => room.id == id);
//     //👇🏻 Sends the messages to the app
//     socket.emit('foundRoom', result[0]?.messages);
//     socketIO.emit('foundRoom', result[0]?.messages);
//   });

//   socket.on('newMessage', data => {
//     console.log(data, 'dataataaaaaa');
//     //👇🏻 Destructures the property from the object
//     const {room_id, message, user, timestamp} = data;

//     //👇🏻 Finds the room where the message was sent
//     let result = chatRooms.filter(room => room.id == room_id);

//     //👇🏻 Create the data structure for the message
//     const newMessage = {
//       id: generateID(),
//       text: message,
//       user,
//       time: `${timestamp.hour}:${timestamp.mins}`,
//     };
//     //👇🏻 Updates the chatroom messages
//     socket.to(result[0]?.name).emit('roomMessage', newMessage);
//     result[0]?.messages?.unshift(newMessage);

//     //👇🏻 Trigger the events to reflect the new changes
//     socket.emit('roomsList', chatRooms);
//     socket.emit('foundRoom', result[0]?.messages);
//   });

//   socket.on('disconnect', () => {
//     socket.disconnect();
//     console.log('🔥: A user disconnected');
//   });
// });

socketIO.use((socket, next) => {
  const username = socket.handshake.auth.username;
  console.log(socket.handshake.auth.username, 'server');

  if (!username) {
    return next(new Error('invalid username'));
  }
  socket.username = username;
  next();
});

app.get('/api', (req, res) => {
  res.json(chatRooms);
});
app.get('/', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});
http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
