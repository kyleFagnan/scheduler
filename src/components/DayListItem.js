import React from "react";
import classNames from "classnames"; //utility to join classNames together
import "components/DayListItem.scss";

export default function DayListItem(props) {
  //appends a class to the item if a prop's value is true, using classNames utility
  const dayClass = classNames(
    'day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': (props.spots===0)
    });

  //formats the props.spots
  const formatSpots = () => {
    let text = '';
    if(props.spots === 0) {
      text = 'no spots remaining';
    } else if(props.spots === 1) {
      text = '1 spot remaining';
    }
    else {
      text = `${props.spots} spots remaining`;
    }
    return text;
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}

