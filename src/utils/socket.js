import io from 'socket.io-client';
const socket = io('https://d9dating.herokuapp.com', {autoConnect: false});
// const socket = io('http://192.168.18.212:3000');
// const socket = io('http://192.168.0.108:3000');
export default socket;
