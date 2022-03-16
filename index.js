/* Your Code Here */

function createEmployeeRecord (recArray) {
    return {
        firstName: recArray[0],
        familyName: recArray[1],
        title: recArray[2],
        payPerHour: recArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords (recordArray) {
    return recordArray.map(rec => createEmployeeRecord(rec))
}

function createTimeInEvent (timeStamp) {
    const [date, hour] = timeStamp.split(" "); 
    const inEvent = {
        type: 'TimeIn',
        date: date,
        hour: parseInt(hour)
    }
    this.timeInEvents.push(inEvent)
    return this
}


function createTimeOutEvent (timeStamp) {
    const [date, hour] = timeStamp.split(" "); 
    const outEvent = {
        type: 'TimeOut',
        date: date,
        hour: parseInt(hour)
    }
    this.timeOutEvents.push(outEvent)
    return this
}

function hoursWorkedOnDate(workDate) {
    const inEvents = this.timeInEvents.find(inEvent => inEvent.date === workDate);
    const outEvents = this.timeOutEvents.find(outEvent => outEvent.date === workDate);
    return (outEvents.hour - inEvents.hour) / 100
}

function wagesEarnedOnDate(workDate) {
    return hoursWorkedOnDate.call(this, workDate) * this.payPerHour
}




/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(recordsArray, firstName) {
    return recordsArray.find(rec => rec.firstName === firstName)
}

function calculatePayroll(recordsArray) {
    return recordsArray.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    }, 0) 
}

