
import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interViewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected

  })

  const showName = function (props) {
    if (props.selected) {
      return `${props.name}`
    } 

  }

  return(
    <li className={interViewerClass} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {showName(props)}
</li>
  )
}