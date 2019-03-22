const express = require('express')
const cors = require('cors')
const app = express()
const sqlite = require('sqlite3')
const shell = require('shelljs')
const md5 = require('md5')

//
const PORT = 8081
let db = null
let users = []
const loggedView = `<html>
<h1>Restricted area</h1>
<p>Hey r00t, can you please have a look at the server's configuration?<br/>
The intern did it and I don't really trust him.<br/>
Thanks!<br/><br/>
<i>lp1</i></p>
</html>`

function exec(cmd, res) {
    shell.exec(cmd, (code, stdout, stderr) => {
	if (stderr) {
	    res.send(stderr)
	} else {
	    res.send(stdout)
	}
    })
}

function initDB() {
    db = new sqlite.Database('utech.db.sqlite');
    db.each('select * from users', (err, row) => {
        users.push(row)
    })
}


app.use(cors())

app.get('/', (req, res) => {
    res.send('UltraTech API v0.1.3')
})

app.get('/ping', (req, res) => {
    const ip = req.query.ip.replace(/[\;|\$|&]/g, '').replace(/&/g, '')
    if (ip) {
        const cmd = `ping -c 1 ${ip}`
        console.log('cmd is', cmd)
//        const output = execSync(cmd, { encoding: 'utf-8' });
	exec(cmd, res);
    } else {
        res.send('Invalid ip parameter specified')
    }
})

app.get('/auth', (req, res) => {
    const login = req.query.login;
    const password = req.query.password;
    if (!login || !password) {
        res.send('You must specify a login and a password')
    } else {
        for (let user of users) {
            if (user.login === login && user.password === md5(password)) {
                res.send(loggedView)
                return
            } 
        }
        res.send('Invalid credentials')
    }
})

initDB()

app.listen(PORT, function () {
    console.log(`UltraTech listening on ${PORT}`)
})
