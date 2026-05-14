const express=require('express');
const router=express.Router();
const db=require('../config/db');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();

router.post('/signup',async (req,res,next)=>{
    try{
        const {user_id, name,email,password}=req.body;
        if(!user_id || !name || !email || !password){
            const err=new Error('All fields are required');
            err.status=400;
            return next(err);
        }
        const [existing]=await db.query('select * from users where user_id=? and email=?',
            [user_id,email]
        );
        if(existing.length>0){
            const err=new Error('user already exists');
            err.status=400;
            return next(err);
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const [rows]=await db.query('insert into users (user_id,name,email,password) values (?,?,?,?)',
            [user_id,name,email,hashedPassword]
        );
        res.status(201).json({
            message:'user created successfully'
        });
    }catch(err){
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
        const passwordMatch=await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            const err=new Error('Invalid Password');
            err.status(401);
            return next(err);
        }
        const token=jwt.sign(
            {id:user.user_id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        );
        res.json({
            message:'Login successful',
            token
        });
    }catch(err){
        next(err);
    }
});

module.exports=router;