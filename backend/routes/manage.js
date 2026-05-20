const express=require('express');
const router=express.Router();
const db=require('../config/db');
const auth=require('../middleware/auth');
const sendEmail = require('../services/mailService');

router.get('/',auth,async (req,res,next)=>{
    try{
        const [rows]=await db.query('select * from users where user_id=?',
            [req.user.id]
        );
        res.json(rows[0]);
    }catch(err){
        next(err);
    }
})

router.put('/',auth,async (req,res,next)=>{
    try{
        const {name}=req.body;
        if(!name){
            const err=new Error('name should not be empty');
            err.status=404;
            return next(err);
        }
        const [existing]=await db.query('select * from users where user_id=?',
            [req.user.id]
        );
        const updatedName=req.body.name!==undefined?req.body.name:existing[0].name;
        /*const updatedEmail=req.body.email!==undefined?req.body.email:existing[0].email;
        const [rows]=await db.query('select * from users where email=?',
            [updatedEmail]
        );
        if(rows.length>0){
            const err=new Error('email already exists, try other email');
            err.status=404;
            return next(err);
        }*/
        const [result]=await db.query('update users set name=? where user_id=?',
            [updatedName,req.user.id]
        );
        res.json({message:'name updated successfully'});
        await sendEmail(
            req.user.email,
            'Profile updated Succesfully',
            `Hello user,
            Your name was updated to ${updatedName}.
            if it was not you please change your password.`
        );
    }catch(err){
        next(err);
    }
});

module.exports=router;