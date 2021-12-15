import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  
  const setDay = day => setState(prev => ({ ...prev, day }));

  
  const bookInterview = (id, interview) => {
    const appointment = {...state.appointments[id], interview: { ...interview }};
    const appointments = {...state.appointments, [id]: appointment };

    //makes a PUT request to update the database 
    return axios
    .put(`/api/appointments/${id}`, {interview})
    .then(res => {

      
      setState(prev => {
        const days = prev.days.map(day => {
          if(day.name === prev.day) {
            day.spots -- ;
          }
          return day;
        });
        return { ...prev, appointments, days };
      });
      
    })
  };

 
  const cancelInterview = (id) => {
    const appointment = {...state.appointments[id], interview: null};
    const appointments = {...state.appointments, [id]: appointment };
    
    return axios
    .delete(`/api/appointments/${id}`)
    .then(res => {
      

      //updates the spots remaining when delete the appointment
      setState(prev => {
        const days = prev.days.map(day => {
          if(day.name === prev.day) {
            day.spots ++;
          }
          return day;
        });
        return { ...prev, appointments, days };
      });
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