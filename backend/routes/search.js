const express=require('express');
const router=express.Router();
const db =require('../config/db');
const auth=require('../middleware/auth');

router.get('/',auth,async (req,res,next)=>{
    try{
        const rawQuery = (req.query.q || '').trim();
        if(!rawQuery){
            return res.status(400).json({ error: 'Search query is required.' });
        }

        const queryText = `%${rawQuery.toLowerCase()}%`;

        // Search help articles
        const articleSql = `
            SELECT article_id as id, title, content, category, created_at, 'article' as type
            FROM help_articles
            WHERE LOWER(title) LIKE ?
               OR LOWER(content) LIKE ?
               OR LOWER(category) LIKE ?
            LIMIT 10
        `;

        // Search departments
        const deptSql = `
            SELECT department_id as id, department_name as title, description as content, contact_email, phone, office_location, created_at, 'department' as type
            FROM departments
            WHERE LOWER(department_name) LIKE ?
               OR LOWER(description) LIKE ?
               OR LOWER(contact_email) LIKE ?
            LIMIT 10
        `;

        // Search notices
        const noticeSql = `
            SELECT notice_id as id, title, description as content, department_name as category, created_at, 'notice' as type
            FROM notices
            WHERE LOWER(title) LIKE ?
               OR LOWER(description) LIKE ?
               OR LOWER(department_name) LIKE ?
            ORDER BY created_at DESC
            LIMIT 10
        `;

        const [articles] = await db.query(articleSql, [queryText, queryText, queryText]);
        const [departments] = await db.query(deptSql, [queryText, queryText, queryText]);
        const [notices] = await db.query(noticeSql, [queryText, queryText, queryText]);

        const allResults = [...articles, ...departments, ...notices];
        res.json({ results: allResults, count: allResults.length, query: rawQuery });
    }catch(err){
        next(err);
    }
});

module.exports=router;