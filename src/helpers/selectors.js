//Selectors as helpers accept state as an argument and return data that is derived from that state

//returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  let newAppointments = [];

  state.days.forEach(aday => {
    if (aday.name === day) {
      //console.log('aday.appointments', aday.appointments);
      aday.appointments.forEach(appointment => {
        //console.log('appointment', appointment)
        for (let app in state.appointments) {
          //console.log("app", app)
          if (app == appointment) {
            newAppointments.push(state.appointments[app])
            //console.log('state.appointments[app]', state.appointments[app]);
            //console.log('newAppointments', newAppointments)
          }
        }
      })
    }
  })
  //console.log('newAppointments', newAppointments);
  return newAppointments;
}

//returns an object with interview data when there is an interviewer in state object; otherwise, returns null
export function getInterview(state, interview) {
  //console.log('interview', interview)
  let newInterview = {};
  
  if (interview === null) {
    //console.log('[appointment].interview', [appointment].interview);
    return null;
  } else {
    newInterview.student = interview.student;
    //console.log('newInterview.student', newInterview.student);

    let interviewerId = interview.interviewer;
    //console.log('interviewerId', interviewerId);

    for (let interviewer in state.interviewers) {
      //console.log('interviewer', interviewer);  
      if (interviewer == interviewerId) {
        newInterview.interviewer = state.interviewers[interviewer];
        //console.log('newInterview.interviewer', newInterview.interviewer);
      }  
    }
  }
  //console.log(newInterview)
  return newInterview;
}