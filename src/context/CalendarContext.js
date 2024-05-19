import React, { createContext, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';

const SET_DATE = "SET_DATE";
const SET_TASK = "SET_TASK";
const SAVE_TASK = "SAVE_TASK";
const DELETE_TASK = "DELETE_TASK";


const getAllRecords = async () => {
  const res = await fetch("/lovelog", { method: "get" })
  let data = await res.json();
  data = data["results"];
  data.map(task => task.date = new Date(task.date));
  // console.log('data :', data);
  return data;
}

const insertRecord = async (record) => {
  const headers = new Headers();
  headers.append('content-type', 'application/json')
  return fetch('/lovelog', {
    method: 'post',
    headers,
    body: JSON.stringify(record)
  })
}

const updateRecord = async (record) => {
  const headers = new Headers();
  headers.append('content-type', 'application/json')
  return fetch('/lovelog', {
    method: 'put',
    headers,
    body: JSON.stringify(record)
  })
}

const deleteRecord = async (id) => {
  const headers = new Headers();
  headers.append('content-type', 'application/json')
  return fetch('/lovelog', {
    method: 'delete',
    headers,
    body: JSON.stringify({ id })
  })
}


export const CalendarContext = createContext();

export const sameDay = (a, b) => {
  return a.getDate() === b.getDate()
    && a.getMonth() === b.getMonth()
    && a.getFullYear() === b.getFullYear();
}

function CalendarState(props) {

  const initDate = new Date();
  // Calendar Start Day
  const d1 = new Date(initDate.getFullYear(), initDate.getMonth(), 1);
  d1.setDate(d1.getDate() - (d1.getDay() === 0 ? 7 : d1.getDay()));
  // Calendart End Day
  const d2 = new Date(initDate.getFullYear(), initDate.getMonth() + 1, 0);
  if (d2.getDay() !== 0) d2.setDate(d2.getDate() + (7 - d2.getDay()));

  const initDays = [];
  do { // Obtain tasks
    d1.setDate(d1.getDate() + 1); // iterate            
    initDays.push({
      date: new Date(d1.getTime()),
      tasks: []
    });
  } while (!sameDay(d1, d2));

  const initialState = {
    date: new Date(),
    days: initDays,
    task: null
  };

  // Dispatch 
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_DATE: // Set current date

        const { date, db } = action.payload;
        // Calendar Start Day
        const d1 = new Date(date.getFullYear(), date.getMonth(), 1);
        d1.setDate(d1.getDate() - (d1.getDay() === 0 ? 7 : d1.getDay()));
        // Calendart End Day
        const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        if (d2.getDay() !== 0) d2.setDate(d2.getDate() + (7 - d2.getDay()));

        const days = [];
        do { // Obtain tasks
          d1.setDate(d1.getDate() + 1); // iterate            
          days.push({
            date: new Date(d1.getTime()),
            tasks: db.filter((task) => sameDay(d1, task.date))
          });
        } while (!sameDay(d1, d2));

        return { // Update state
          ...state,
          date: date,
          days: days
        }
      case SET_TASK:
        return {
          ...state,
          task: action.payload
        }
      default:
        break;
    }
  }, initialState);

  // CRUD
  const setDate = (date) => {
    getAllRecords().then((db) => {
      dispatch({
        type: SET_DATE,
        payload: { date, db }
      });
    })
  }

  const setTask = (task) => {
    dispatch({
      type: SET_TASK,
      payload: task
    });
  }

  const saveTask = (task) => {
    console.log('task :', task);
    if (!task.id) { // new Task
      task.id = uuidv4();
      insertRecord(task).then(res => {
        setDate(state.date);
      });
    } else {
      updateRecord(task).then((res) => {
        setDate(state.date);
      });
    }
  }

  const deleteTask = (taskId) => {
    deleteRecord(taskId).then(res => {
      setDate(state.date);
    })
  }

  return (
    <CalendarContext.Provider
      value={{

        date: state.date,
        days: state.days,
        task: state.task,

        setDate,
        setTask,
        saveTask,
        deleteTask
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
}

export default CalendarState;