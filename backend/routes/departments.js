const express=require('express');
const router=express.Router();
const db = require('../config/db');
const auth=require('../middleware/auth');

router.get('/',auth,async (req,res,next)=>{
    try{
        const {department_name}=req.query;
        let sql='select * from faculty where 1=1';
        const params=[];
        if(department_name){
            sql+=' and department_name=?';
            params.push(department_name);
        }
        const [rows]=await db.query(sql,params);
        res.json(rows);
    }catch(err){
        next(err);
    }
});

module.exports=router;