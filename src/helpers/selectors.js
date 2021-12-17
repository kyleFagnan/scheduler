
export function getAppointmentsForDay(state, day) {
    let correctDay={};
    let appointments=[];
    for(let i=0; i<state.days.length; i++) {
      if(state.days[i].name === day) {
        correctDay=state.days[i]
      }
    }
   
    if(correctDay && correctDay.appointments) {
      for(let i=0; i < correctDay.appointments.length; i++) {
        let id = correctDay.appointments[i]
        appointments.push(state.appointments[`${id}`])
      }
    }
    return appointments
  }

export function getInterviewersForDay(state, day) {
  let correctDay={};
  let interviewers=[];
  for(let i=0; i<state.days.length; i++) {
    if(state.days[i].name === day) {
      correctDay=state.days[i]
    }
  }
 
  if(correctDay && correctDay.interviewers) {
    for(let i=0; i < correctDay.interviewers.length; i++) {
      let id = correctDay.interviewers[i]
      interviewers.push(state.interviewers[`${id}`])
      
    }
  }
  return interviewers
}


export function getInterview(state, interview) {
  let newInterview = {};
  if (interview === null) {
   
    return null;
  } else {
    newInterview.student = interview.student;
    let interviewerId = interview.interviewer;
    newInterview.interviewer = state.interviewers[interviewerId];
  
  }
  console.log(newInterview)
  return newInterview;
}