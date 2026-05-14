const express=require('express');
const app=express();
require('dotenv').config();
const cors=require('cors');

const logger=require('./middleware/logger');
const errorHandler=require('./middleware/errorHandler');
const authRouter=require('./routes/auth');
const complaintRouter=require('./routes/complaints');
const departmentsRouter=require('./routes/departments');
const noticesRouter=require('./routes/notices');
app.use(cors({origin:'http://localhost:5173'}));

app.use(express.json());
app.use(logger);
app.use('/auth',authRouter);
app.use('/complaints',complaintRouter);
app.use('/departments',departmentsRouter);
app.use('/notices',noticesRouter);
app.use((req,res)=>{
    res.status(404).json({error: 'route not found' });
});

app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`);
});
