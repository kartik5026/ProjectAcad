require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const courseModel = require('./Models/CourseModel');
const userModel = require('./Models/UserModel');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const key = process.env.Key;

const uri = process.env.URI;
mongoose.connect(uri).then(()=>{
    console.log('Connected to mongodb');
}).catch((err)=>{
    console.log(err);
})
app.use(cors({
    origin:'https://project-acad.vercel.app',
    credentials:true,
}))
app.use(express.json());
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send('This is Home route');
})


app.get("/admin/getCourses",async (req,res)=>{
    const token = req.cookies.myToken;
    if(token){
        const decode = jwt.verify(token,key);
        if(decode.role!='admin'){
            res.send('Access Denied');
        }
        else{
            const data = await courseModel.find();
            res.send(data);
        }
    }
    else{
        res.send('Login first');
    }
    
})
app.get("/user/getCourses",async (req,res)=>{
    const token = req.cookies.myToken;
    if(token){
        const decode = jwt.verify(token,key);
        if(decode.role!='user'){
            res.send('Access Denied');
        }
        else{
            const data = await courseModel.find();
            res.send(data);
        }
    }
    else{
        res.send('Login first');
    }
})
app.put("/updateCourse/:id",async (req,res)=>{
    const {title,description,duration,instructor} = req.body;
    const id = req.params.id;
    const data = await courseModel.findOneAndUpdate({_id:id},{title:title,description:description,duration:duration,instructor:instructor});
    res.send('Updated');
    
})
app.delete("/deleteCourse/:id", async (req,res)=>{
    const id = req.params.id;
    const data = await courseModel.findOneAndDelete({_id:id});
    res.send('Deleted');
})
app.post("/login", async (req,res)=>{
    const {name,password,role} = req.body;

    if(password==='admin'){
        const token = jwt.sign({role}, key, {expiresIn:'1h'});
        res.cookie('myToken', token, {maxAge:60*60*1000, httpOnly:true, secure: true, sameSite: 'None'});
        res.json({msg:{name,role}});
    }
    else{
        res.json({msg:'Invalid'});
    }

})
app.post("/enroll", async (req,res)=>{
    const {name,id} = req.body;
    const data = await userModel.findOne({user:name});
    console.log(data);
    
    if(data==null){
        
        const addData = await userModel.create({user:name,enrolledCourses:[id]});
        console.log(addData);
    }
    else{
         data.enrolledCourses.push(id);
         await data.save();
    }
    res.send('Enrolled')

})
// Example Express endpoint (adjust according to your setup)
app.post('/getUserEnrollments', async (req, res) => {
    const { name } = req.body; // Get username or user identifier
    console.log(req.body);
    
    try {
        // Fetch the list of courses the user is enrolled in from your database
        const user = await userModel.findOne({ user:name });
        console.log(user);
        if (!user) {
            return res.send('Not found yet');
        }

        // Assuming you store enrolled courses in an array or reference field in the user model
        const enrolledCourses = user.enrolledCourses;  // This is the array of course IDs
        res.json(enrolledCourses);
    } catch (err) {
        res.status(500).send('Error fetching enrollments');
    }
});

app.post("/addCourse",async (req,res)=>{
    const {title,description,duration,instructor} = req.body;
    const data = await courseModel.create({title:title,description:description,duration:duration,instructor:instructor});
    res.send('Added');
})
app.listen(5000,()=>{
    console.log("Server running on 5000");
})
