const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    empID : {
        type : String,
        required : true
    },
    empName : {
        type : String,
        required : true
    },
    empManager : {
        type : String,
        required : true
    },
    empManagerID : {
        type : String,
        required : true
    },
    startDate : {
        type : String,
        required : true
    },
    endDate : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        required : true
    }
});

module.exports = new mongoose.model("Leaves", leaveSchema);