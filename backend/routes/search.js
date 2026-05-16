const express=require('express');
const router=express.Router();
const db =require('../config/db');
const auth=require('../middleware/auth');

router.get('/',auth,async (req,res,next)=>{
    try{
        const keyword = req.query.q || '';
        let sql='select * from help_articles where title like ? ';
        const queryText=`%${req.query.q}%`;

        const [rows]=await db.query(sql,[queryText]);
        res.json(rows);
    }catch(err){
        next(err);
    }
});

module.exports=router;