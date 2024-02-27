import mysql from 'mysql2';

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dynaS5M",
    database: "employeers"
})

con.connect(function(err) {
    if(err) {
        console.log(err)
        console.log("connection error")
    } else {
        console.log("Connected")
    }
})

export default con;