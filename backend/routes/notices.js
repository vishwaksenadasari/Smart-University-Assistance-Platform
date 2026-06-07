const express=require('express');
const router=express.Router();
const db=require('../config/db');
const sendEmail=require('../services/mailService');
const auth =require('../middleware/auth');
router.get('/',auth, async (req,res,next)=>{
    try{
        const {department_name}=req.query;
        let sql='select * from notices where 1=1 ';
        const params=[];
        if(department_name){
            sql+='and department_name=?';
            params.push(department_name);
        }
        const [rows]=await db.query(sql,params);
        res.json(rows);
    }catch(err){
        next(err);
    }
});

router.post('/',auth, async (req,res,next)=>{
    try{
        const {title,description}=req.body;
        if(!title || !description){
            const err=new Error('All fields are mandatory');
            err.status=400;
            return next(err);
        }
        const [userRows]=await db.query('select department_id from users where user_id=?',
            [req.user.id]
        );
        const department_id=userRows[0]?.department_id; //db.query returns array
        if(!department_id){
            const err=new Error('failed to extract department id');
            err.status=404;
            return next(err);
        }
        const [departmentRows]=await db.query('select department_name from faculty where department_id=?',
            [department_id]
        );
        const department_name=departmentRows[0]?.department_name;
        if(!department_name){
            const err=new Error('failed to extract department name');
            err.status=404;
            return next(err);
        }
        await db.query('insert into notices (title,description,department_id,created_by,department_name) values (?,?,?,?,?)',
            [title,description,department_id,req.user.id,department_name]
        );

        const [EmailUserRows] = await db.query('select email from users where email is not null');
        const recipientEmails = EmailUserRows.map(user => user.email).filter(Boolean);

        res.status(201).json({message:'Notice created successfully'});

        if (recipientEmails.length > 0) {
            sendEmail(
                process.env.EMAIL_USER,
                `New Notice from ${department_name}`,
                `A new notice has been posted:\n\nTitle: ${title}\n\n${description}\n\nDepartment: ${department_name}`,
                recipientEmails
            ).catch(err => console.error('Failed to send notice email to users:', err));
        }
    }catch(err){
        next(err);
    }
});

module.exports=router;