const express=require('express');
const router=express.Router();
const db=require('../config/db');
const auth=require('../middleware/auth');

router.post('/',auth,async (req,res,next)=>{
    try{
        const {mess}=req.body;
        if(!mess){
            const err=new Error('feedback cannot be empty');
            err.status=400;
            return next(err);
        }
        await db.query('insert into feedback (description) values (?)',
            [mess]
        );
        res.status(201).json({message:'feedback has completed successfully'});
    }catch(err){
        next(err);
    }
});

module.exports=router;