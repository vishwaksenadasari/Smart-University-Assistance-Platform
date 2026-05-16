const express=require('express');
const router=express.Router();
const db=require('../config/db');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const sendEmail =require('../services/mailService');

router.post('/signup',async (req,res,next)=>{
    try{
        const {user_id, name,email,password}=req.body;
        if(!user_id || !name || !email || !password){
            const err=new Error('All fields are required');
            err.status=400;
            return next(err);
        }
        const [existing]=await db.query('select * from users where user_id=? OR email=?',
            [user_id,email]
        );
        if(existing.length>0){
            const err=new Error('User ID or email already exists');
            err.status=400;
            return next(err);
        }
        const otp= Math.floor(100000+Math.random()*90000);
        const hashedPassword=await bcrypt.hash(password,10);
        const [rows]=await db.query('insert into users (user_id,name,email,password,otp) values (?,?,?,?,?)',
            [user_id,name,email,hashedPassword,otp]
        );

        res.status(201).json({
            message:'otp sent to email'
        }); 
        //respond first let the backend do the work in backgorund

        await sendEmail(
            email,
            'Smart University Email Verification',
            `Your otp is ${otp}`
        );
    }catch(err){
        if(err.code === 'ER_DUP_ENTRY'){
            const error = new Error('User ID or email already exists');
            error.status = 400;
            return next(error);
        }
        next(err);
    }
});

router.post('/login',async (req,res,next)=>{
    try{
        const {user_id,email,password}=req.body;
        if(!user_id || !email || !password){
            const err=new Error('all fields are mandatory');
            err.status=400;
            return next(err);
        }
        const [rows]=await db.query('select * from users where user_id=?',
            [user_id]
        );
        if(rows.length==0){
            const err=new Error('Invalid credentials');
            err.status=401;
            return next(err);
        }
        const user=rows[0];
        if(!user.is_verified){
            return res.status(401).json({
                message: 'please verify email first.'
            });
        }
        const passwordMatch=await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            const err=new Error('Invalid Password');
            err.status(401);
            return next(err);
        }
        const token=jwt.sign(
            {id:user.user_id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        );
        res.json({
            message:'Login successful',
            token
        });
    }catch(err){
        next(err);
    }
});

router.post('/verify-otp',async (req,res,next)=>{
    try{
        const {email,otp}=req.body;
        if(!email || !otp){
            const err=new Error('please enter otp');
            err.status=400;
            return next(err);
        }
        const [result]=await db.query('select * from users where email=?',
            [email]
        );
        if(result.length===0){
            const err=new Error('No user found');
            err.status=400;
            return next(err);
        }
        const user=result[0];
        if(user.otp!==otp){
            const err=new Error('Invalid otp');
            err.status=400;
            return next(err);
        }
        await db.query('update users set is_verified=true, otp=null where email=?',
            [email]
        );
        res.json({ message: 'Email verified successfully' });
    }catch(err){
        next(err);
    }
});

router.post('/verify-email',async (req,res,next)=>{
    try{
        const {user_id,email}=req.body;
        const otp=Math.floor(100000+Math.random()*90000);
        await db.query('update users set otp=? where user_id=?',
            [otp,user_id]
        );
        res.json({message:'otp sent successfully to email. please verify'});
        await sendEmail(email,'smart university email verification',`Your otp is ${otp}`);
    }catch(err){
        next(err);
    }
})

module.exports=router;