const express=require('express');
const cors=require('cors');
const connectDB = require('./utils/db');
const route=require('./routes/user.routes');
const cookieParser=require('cookie-parser');

const app=express();
const PORT=process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/api/users',route);


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})