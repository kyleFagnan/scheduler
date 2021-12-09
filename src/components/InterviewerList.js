import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

export default  function InterviewerList(props) {
  
  const interviewerItems = props.interviewers.map((interviewer) => {
    return(
      <InterviewerListItem 
        selected={interviewer.id === props.interviewer}
        setInterviewer={(e) => props.setInterviewer(interviewer.id)}
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
      />
    )
  });



  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {interviewerItems}
  </ul>
</section>
  )
}