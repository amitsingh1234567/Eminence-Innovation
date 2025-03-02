const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Login = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user)
            return res.status(400).json({msg: 'Email not exist'});

        const pwd = await bcrypt.compare(req.body.password, user.password);
        if(!pwd)
            return res.status(400).json({msg: 'Password Incorrect'});

        const token = jwt.sign({ email: user.email, userId: user._id, role: user.role},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN});
        return res.status(200).json({msg: "Login successfully", token, expiresIn: 36000, userId: user._id, role: user.role});
    }catch(err){
        res.status(400).json({msg: 'Something went wrong.'});
    }
}

const Signup = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(user)
            return res.status(400).json({msg: 'Email already exist.'});
        
        const encPwd = await bcrypt.hash(req.body.password, 10);
        req.body.password = encPwd;

        const newUser = await  User.create(req.body);
        res.status(200).json({msg: 'User registred successfully', data: newUser._id});
    }catch(err){
        res.status(400).json({msg: 'Something went wrong.'});
    }
}

const users = async (req, res, next) => {
    try{
        var roles = [];
        if(req.user.role == 'Manager'){
            roles = ['Manager', 'Team Lead', 'Employee'];
        }

        if(req.user.role == 'Team Lead'){
            roles = ['Team Lead', 'Employee'];
        }

        if(req.user.role == 'Employee'){
            roles = ['Employee'];
        }

        const userData = await User.find({role: { $in: roles }});
        res.status(200).json({msg: 'Success', data: userData});
    }catch(err){
        res.status(400).json({msg: 'Something went wrong.'});
    }
}

const getAllUser = async (req, res, next) => {
    try{
        const userData = await User.find({});
        res.status(200).json({msg: 'Success', data: userData});
    }catch(err){
        res.status(400).json({msg: 'Something went wrong.'});
    }
}

const assignUserRole = async (req, res, next) => {
    try{
        const user = await User.findByIdAndUpdate(req.body._id, {role: req.body.role}, {new: true});
        res.status(200).json({msg: 'Role assigned successfully', data: user});
    }catch(err){
        console.log(err)
        res.status(400).json({msg: 'Something went wrong.'});
    }
}

module.exports = {
    Login,
    Signup,
    users,
    assignUserRole,
    getAllUser
}