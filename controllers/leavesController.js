const leaveService = require('../services/leaveServices');

const applyLeave = async (req,res) => {
    const apply = await leaveService.applyLeave(req.body);
    res.send(apply);
};

const approveLeave = async (req,res) => {
    const approve = await leaveService.approveLeave(req.body);
    res.send(approve);
};

const leaveRequest = async (req,res) => {
    const leaveRequest = await leaveService.leaveRequest(req.body);
    //console.log(leaveRequest);
    res.send(leaveRequest);
}

module.exports = {
    applyLeave,
    approveLeave,
    leaveRequest
};