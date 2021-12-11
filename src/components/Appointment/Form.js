import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import { useState } from "react";


export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }
  const cancel = () => {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={e => e.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value = {student}
            onChange = {(e) => {setStudent(e.target.value)}}
          />
        </form>
        <InterviewerList 
          interviewer = {interviewer}
          value = {interviewer}
          onChange={setInterviewer}
          interviewers={props.interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)} >Save</Button>
        </section>
      </section>
    </main>
  );
}