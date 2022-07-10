const leaveRepository = require('../repository/leaveRepository');

const applyLeave = (body) => {
    let applyLeave = leaveRepository.applyLeave(body);
    return applyLeave;
};

const approveLeave = (body) => {
    let approveLeave = leaveRepository.approveLeave(body);
    return approveLeave;
};

const leaveRequest = (body) => {
    let leaveRequest = leaveRepository.leaveRequest(body);
    return leaveRequest;
}

module.exports = {
    applyLeave,
    approveLeave,
    leaveRequest
};