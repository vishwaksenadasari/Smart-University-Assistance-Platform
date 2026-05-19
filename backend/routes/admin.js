const express=require('express');
const router=express.Router();
const db=require('../config/db');
const auth=require('../middleware/auth');

router.get('/complaints',auth,async (req,res,next)=>{
    try{
        const [results]=await db.query('select * from complaints');
        if(results.length===0){
            const err=new Error('No complaints found. click create complaints to create new');
            err.status=400;
            return next(err);
        }
        res.json(results);
    }catch(err){
        next(err);
    }
});

router.get('/notices',auth,async (req,res,next)=>{
    try{
        const [results]=await db.query('select * from notices where created_by=?',
            [req.user.id]
        );
        if(results.length===0){
            const err=new Error('notices not found. click create notices to create a new notice');
            err.status=400;
            return next(err);
        }
        res.json(results);
    }catch(err){
        next(err);
    }
});


module.exports=router;