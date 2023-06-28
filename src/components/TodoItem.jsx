"use client";
import React, { useState } from "react";
import { db } from "../config/firebaseConfig";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";

const TodoItem = ({ data, getTasksList }) => {
  const { description, date: newDate, title, state, id } = data;

  const [newState, setNewState] = useState(!state);

  const deleteTask = async () => {
    try {
      const taskDoc = doc(db, "tasks", id);
      await deleteDoc(taskDoc);
      getTasksList();
    } catch (err) {
      console.log(err);
    }
  };

  const updateState = async () => {
    try {
      const taskDoc = doc(db, "tasks", id);
      await updateDoc(taskDoc, { state: newState });
      getTasksList();
    } catch (err) {
      console.log(err);
    }
  };

  const doneHandler = () => {
    setNewState((e) => !e);
    updateState();
  };

  return (
    <div className="mt-[20px] bg-yellow-300 py-[18px] px-[8px] rounded-[18px] flex w-[70vw] justify-between ">
      <div className="ml-[28px]">
        <h2 className=" font-semibold text-[28px]">{title}</h2>
        <p className=" font-medium max-w-[50%]">{description} </p>
      </div>
      <div className=" mr-[28px]">
        <div className="flex mb-[10px]">
          <h4 className="mr-[10px] flex justify-center items-center text-[22px] font-medium">
            Date :
          </h4>
          <h4 className="bg-black text-white p-[6px] text-[20px] rounded-[14px]">
            {newDate}
          </h4>
        </div>
        <div className="flex mb-[10px]">
          <h4 className="mr-[10px] flex justify-center items-center text-[22px] font-medium">
            Status :
          </h4>
          <button
            onClick={doneHandler}
            className="bg-black text-white p-[6px] text-[20px] rounded-[14px]"
          >
            Done : &nbsp; {!newState ? "Yes" : "No"}
          </button>
        </div>
        <button
          className="bg-red-400 rounded-[16px] p-[8px] text-[22px] font-semibold inline-block min-w-[200px]"
          onClick={deleteTask}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
