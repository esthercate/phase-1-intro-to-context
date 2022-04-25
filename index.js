// Your code here
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(array) {
  let newArr = []
  array.forEach(element => {
    newArr.push(createEmployeeRecord(element))
  })
  return newArr
}

function createTimeInEvent(employee, timeIn) {
  let hour = parseInt(timeIn.split(" ")[1])
  let date = timeIn.split(" ")[0]
  employee["timeInEvents"].push({
    type: "TimeIn",
    hour: hour,
    date: date
  })
  return employee;
}

function createTimeOutEvent(employee, timeOut) {
  let hour = parseInt(timeOut.split(" ")[1])
  let date = timeOut.split(" ")[0]
  employee["timeOutEvents"].push({
    type: "TimeOut",
    hour: hour,
    date: date
  })
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let inEvent = employee.timeInEvents.find(event => event.date === date)
  let outEvent = employee.timeOutEvents.find(event => event.date === date)
  return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
  let hoursWorked = hoursWorkedOnDate(employee, date)
  let rate = employee.payPerHour
  return hoursWorked * rate
}

function allWagesFor(employee) {
  let wages = []
  employee.timeInEvents.forEach(event => {
    let date = event.date
    let wage = wagesEarnedOnDate(employee, date)
    wages.push(wage)
  });

  let total = wages.reduce((a, b) => a + b)
  return total
}

function calculatePayroll(employeearr) {
  let total = 0
  for (let employee of employeearr) {
    console.log(employee)
    total += allWagesFor(employee)
  }
  return total

}