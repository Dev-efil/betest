const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./config/dbConfig');
connection();
const socket = require('socket.io');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

// Socket.io code
const io = socket(server, {
    cors: {
        origin: '*'
    },
});

const getAllClient = async () => {
    const ids = await io.allSockets();
    const AllClientIds =  Array.from(ids);
    io.emit('usercount', { allClient: AllClientIds });
}


io.on('connection', function (socket) {
    getAllClient();
    console.log(`Made a Socket connection 🔌 : ${socket.id}`);

    // Register an event to console the data which coming from Client.
    socket.on('bet', (getBet) => {
        console.log(getBet);
        // if(getBet.bet === random) {
        //     getBet.user === DB.user (check user is autherized)
        //     then update = DB.user points
        // }
        // else {
        //     send user try again message
        // }
    });

    socket.on('userlogin', (getData)=> {

        // getData  = fb name, fb email

        // if fb email === db email || fb email
        //     emit this user points from db
    })

    socket.on('disconnect', function () {
        getAllClient()
        console.log(`Socket disconnected 🔌 : ${socket.id}`);
    });
});



const arr = ['1', '2', '3', '4', '5', '6', '12'];
let timer = 10;
setInterval(() => {
    if (timer > 0) {
        timer--;
    } else {
        timer = 10;
    }
    if (timer === 0) {
        let random = Math.floor(Math.random() * arr.length);
        const betPoint = arr[random];
        const result = { betPoint }
        io.emit('broadcastbet', result);
    }

    const result = { timer }
    io.emit('broadcasttime', result);
}, 1000);