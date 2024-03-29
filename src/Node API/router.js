const express= require("express");
const Router= express.Router();
const dbconnected= require("./dbconnection");

Router.get("/api/records/:id",(req, res)=>{
    dbconnected.query("select * from employeers.records where id='"+req.params.id +"' ", (err, rows)=>{     
        if(!err)
        {
        res.send(rows);
        } else{
            console.log(err);
        }
    });
});

Router.post("/api/records/:id", (req, res)=>{
    const first_name= req.body.first_name;
    const last_name= req.body.last_name;
    const midd_lename= req.body.middle_name;
    const birthday= req.body.birthday;
    const gender= req.body.gender;
    const address= req.body.address;
    const mobile_number= req.body.mobile_number;
    const job_title= req.body.job_title;
    var sql= `INSERT INTO employeers.records(firstname, lastname, middlename, birthday, gender, address, mobilenumber, jobtitle) 
    VALUES("${username}", "${email}","${phone}", "${address}", "${status}" )`;
    dbconnected.query(sql, (err, result)=>{
        if(!err)
        {
        res.status(200).json({success:"User Record Inserted Successfully"});
        } else{
            console.log(err);
        }
    });
});
Router.get("/api/edituser/:id", (req, res)=>{
    dbconnected.query("select * from tbl_user where userid='"+ req.params.id+"' ",(err, rows)=>{
      if(!err)
      {
         res.send(rows[0]);
      } else{
        console.log(err);
      }
    });
});
Router.put("/api/updateuser/:id", (req, res)=>{
    const userdata=[req.body.username, req.body.email, req.body.phone, req.body.address, req.body.status];
    var sql= "UPDATE tbl_user SET username=?, email=?, phone=?, address=?, status=? where userid='"+ req.params.id+"' ";
    dbconnected.query(sql, userdata,(err, result)=>{
        if(!err)
        {
        res.status(200).json({success:"User Record Updated successfully"});
        } else{
            console.log(err);
        }
    });
});


module.exports= Router;