const express=require('express');
const router=express.Router();
const db=require('../config/db');
const auth =require('../middleware/auth')
router.get('/',auth,async (req,res,next)=>{
    try{
        const [rows]=await db.query('select * from complaints where student_id=?',
            [req.user.id] //jwt payload has id not anyother 
        );
        res.json(rows);
    }catch(err){
        next(err);
    }
});

router.get('/:id',auth, async (req,res,next)=>{
    try{
        const [rows]=await db.query('select * from complaints where student_id=? and complaint_id=?',
            [req.user.id,req.params.id]
        );
        if(rows.length==0){
            const err=new Error('complaint not found');
            err.status=404;
            return next(err);
        }
        res.json(rows[0]);
    }catch(err){
        next(err);
    }
});

router.post('/',auth, async (req,res,next)=>{
    try{
        const {title,description}=req.body;
        if(!title || !description){
            const err=new Error('All fileds are mandatory');
            err.status=400;
            return next(err);
        }
        const [results]=await db.query('insert into complaints (student_id,title,description) values (?,?,?)',
            [req.user.id,title,description]
        );
        const [rows]=await db.query('select * from complaints where complaint_id=?',
            [results.insertId]
        );
        res.status(201).json(rows[0]);
    }catch(err){
        next(err);
    }
});

module.exports=router;