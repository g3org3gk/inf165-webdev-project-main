const express = require('express')
const path = require('path')
const app = express()
const port = 8080

const user1 = {
    username: "host",
    password: "b22b33",
    isadmin: true
};

const user2 = {
    username: "host_2",
    password: "d22d33",
    isadmin: false
};

const user3 = {
    username: "host_3",
    password: "e22e33",
    isadmin: false
};

const users = [user1, user2, user3];

app.listen(port)

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.get('/', function (req, res) {

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('project1.html', options, function (err) {
        console.log(err)
    })
})

app.post('/login', function (req, res) {

    let username = req.body.username;
    let password = req.body.psw;
    let loggedin = false;
    for (let i = 0; i < users.length; i++) {
        if (username === users[i].username && password === users[i].password) {
            const send = {
                loggedin: true,
                username: username,
                isadmin: users[i].isadmin
            }
            res.status(200).send(JSON.stringify(send))
            loggedin = true;
            break;
        }
    }
    if (!loggedin) {
        let send = {
            loggedin: false
        }
        res.status(401).send(JSON.stringify(send));
    };
});