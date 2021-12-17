import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import "./styles.scss";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment (props) {
  //conditinally renders a mode within calling useVisualMode:
  //if props.interview contains a value, pass useVisualMode the SHOW mode, otherwise, pass EMPTY
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //updates mode to save the created interview
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props.bookInterview(props.id, interview)//returnes promise
    .then(() => transition(SHOW))
    .catch((err) => transition(ERROR_SAVE, true));   
  };

 //updates mode when deleting appointment
  const destroy = () => {
    transition(DELETING, true)

    props.cancelInterview(props.id)//returnes promise
    .then(() => transition(EMPTY))
    .catch((err) => transition(ERROR_DELETE, true)); 
  }
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={() => transition(EDIT, true)} onDelete={() => transition(CONFIRM, true)}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save}/>}
      {mode === EDIT && <Form student={props.interview.student} interviewers={props.interviewers} interviewer={props.interview.interviewer} onCancel={() => transition(SHOW)} onSave={save}/>}
      {mode === SAVING && <Status message="Saving..."/>}
      {mode === DELETING && <Status message="Deleting..."/>}
      {mode === CONFIRM && <Confirm onCancel={() => transition(SHOW)} onConfirm={destroy} message="Are you sure you want to delete?"/>}
      {mode === ERROR_SAVE && <Error message="Failed to save appointment" onClose={() => back(EDIT)}/>}
      {mode === ERROR_DELETE && <Error message="Failed to delete appointment" onClose={() => transition(SHOW)}/>}
    </article>
  
  );
}