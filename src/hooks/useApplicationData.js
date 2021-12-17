import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //updates the spots remaining when book/edit/cancel appointment
  const updateSpots = (requestType) => {
    const days = state.days.map(day => {
      if(day.name === state.day) {
        if (requestType === 'bookInterview') {
          return { ...day, spots: day.spots - 1 }
        }else {
          return { ...day, spots: day.spots + 1 }
        }
      }
      return { ...day };
    });
    return days;
  }

  //updates the dayList
  const setDay = day => setState(prev => ({ ...prev, day }));

  
  const bookInterview = (id, interview) => {
  
    const appointment = { ...state.appointments[id] };
    
    const bookOrEdit = appointment.interview ? 'edit' : 'book';
    appointment.interview = { ...interview };
    const appointments = { ...state.appointments, [id]: appointment };
    
    let days = state.days;
    if (bookOrEdit === 'book') {
      days = updateSpots('bookInterview');
    } 

    return axios
      .put(`/api/appointments/${id}`, {interview})
      .then(() => {
        setState({ ...state, appointments, days });  
    })
  };

 //makes a HTTP request to delete interview data from database and sets its state to null when delete an interview
  const cancelInterview = (id) => {
    const appointment = {...state.appointments[id], interview: null};
    const appointments = {...state.appointments, [id]: appointment };
    const days = updateSpots();
    
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days });
      })
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data}));
    });
  }, []);
  

  return { state, setDay, bookInterview, cancelInterview }
};