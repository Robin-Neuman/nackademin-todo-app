module.exports = function getNewUtcDate() {    
    let currDate = new Date()
    let parsedDate = Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), currDate.getHours(), currDate.getMinutes())
    return parsedDate
}