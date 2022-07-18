if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv').config({path : `${__dirname}/../.env`});
}
const LeaveModel = require('../models/leave');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const req = require('express/lib/request');
const { resolve, reject } = require('promise');

const client = new MongoClient(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true 
});

const applyLeave = async(body) => {
    const leave = new LeaveModel(body);
    console.log(body, "leave Repo", leave);
    return new Promise((resolve,reject) => {
        client.connect(async err => {
            const leaveCollection = client.db("leaves").collection("leaves");
            try{
                await leaveCollection.insertOne(leave).then((res) => {
                    console.log(res);
                    if(res.acknowledged){
                        resolve("Leave Applied Successfully.");
                    }else{
                        resolve("Cannot apply Leave. Please try later.");
                    }
                });
            }catch{
                reject("Error in promise")
            }
        });
    });
};

const approveLeave = async(body) => {
    const leaveObj = new LeaveModel(body);
    let searchOptions = {};
    let leaveStatus = {};
    if(body.empID != null && body.empID !== ""){
        searchOptions.empID = body.empID;
    }
    if(body.empManagerID != null && body.empManagerID !== ""){
        searchOptions.empManagerID = body.empManagerID;
    }
    if(body.startDate != null && body.startDate !== ""){
        searchOptions.startDate = body.startDate; 
    }
    if(body.endDate != null && body.endDate !== ""){
        searchOptions.endDate = body.endDate; 
    }
    if(body.duration != null && body.duration !== ""){
        searchOptions.duration = body.duration;
    }
    if(body.status != null && body.status !== ""){
        leaveStatus.status = body.status;
    } 
    console.log(searchOptions, leaveObj);
    return new Promise((resolve,reject) => {
        client.connect(async err => {
            const leaveCollection = client.db("leaves").collection("leaves");
            try{
                    await leaveCollection.findOneAndUpdate(searchOptions, {$set : {status : body.status}} , {new: true, upsert: true}).then((res) => {
                        resolve("Updated Status Successfully");
                    })
            }catch{
                    reject("Error in promise")
            }
        });
    });
};

const leaveRequest = async (body) => {
    let searchOptions = {};
    if(body.empManagerID != null && body.empManagerID !== ""){
        searchOptions.empManagerID = body.empManagerID;
    }
    if(body.empID != null && body.empID !== ""){
        searchOptions.empID = body.empID;
    }
    return new Promise((resolve,reject) => {
        client.connect(async err => {
            const leaveCollection = client.db("leaves").collection("leaves");
            try{
                    const request = await leaveCollection.find(searchOptions).toArray();
                    console.log(request);
                    resolve(request);
                }
            catch{
                    reject("Error in promise")
            }
        });
    });
};

const deleteEmployeeLeaves = async (body) => {
    const searchOptions = {};
    if(body.empID != null && body.empID !== ""){
        searchOptions.empID = body.empID;
    }
    const leave = new LeaveModel(body);
    console.log(body,searchOptions);
    return new Promise((resolve,reject) => {
        client.connect(async err => {
            const leaveCollection = client.db("leaves").collection("leaves");
            try{
                await updateManager(leave);
                await leaveCollection.deleteMany(searchOptions).then((res) => {
                    console.log(res);
                    if(res.acknowledged){
                        if(res.deletedCount > 0){
                            resolve("Deleted Employee Leaves from Leave Database.");
                        }else{
                            resolve("No such Employee in Leave Database.");
                        }
                    }else{
                        reject("Unable to deleted Employee Leaves from Leave Database.");
                    }
                });
            }
            catch{
                reject("Error in Promise");
            }
        });
    });
};

const updateManager = async (payroll) => {
    let searchOptions = {};
    if(payroll.empID != null && payroll.empID !== ""){
        searchOptions.empManagerID = payroll.empID;
    }
    return new Promise((resolve,reject) => {
        client.connect(async err => {
            const leaveCollection = client.db("leaves").collection("leaves");
            try{
                await leaveCollection.updateMany(searchOptions, 
                    {$set : {empManagerID : payroll.empManagerID, empManager : payroll.empManager }}).then((res) => {
                        console.log(res);
                        resolve("Updated the Manager in Payroll Database");
                })
            }
            catch{
                reject("Error in Promise");
            }
        });
    });
};

module.exports = {
    applyLeave,
    approveLeave,
    leaveRequest,
    deleteEmployeeLeaves
};