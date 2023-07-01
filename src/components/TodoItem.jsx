"use client";
import React, { useState } from "react";
import { db } from "../config/firebaseConfig";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";

const TodoItem = ({ data, getTasksList }) => {
  const { description, date: newDate, title, status, id } = data;

  const [newState, setNewState] = useState(!status);

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
      await updateDoc(taskDoc, { status: newState });
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
    <div className="mt-[20px] bg-blue-200 py-[18px] px-[8px] rounded-[18px] flex flex-wrap md:justify-around justify-between md:max-w-[68%]">
      <div className="flex flex-col flex-wrap ">
        <h2 className=" font-bold text-[2.6rem]">{title} :</h2>
        <p className=" font-medium max-w-[50%]">{description} </p>
      </div>
      <div className="flex flex-col flex-wrap sm:mt-0 mt-[30px]">
        <div className="flex mb-[10px]">
          <h4 className="mr-[10px] flex justify-center items-center text-[22px] font-medium">
            Date :
          </h4>
          <h4 className="bg-black text-white p-[6px] text-[20px] rounded-[14px]">
            {`${newDate}`}
          </h4>
        </div>
        <div className="flex mb-[10px]">
          <h4 className="mr-[10px] flex justify-center items-center text-[22px] font-medium">
            Status :
          </h4>
          <button
            onClick={doneHandler}
            className="bg-black text-white p-[6px] text-[20px] rounded-[14px]"
          >
            {!newState ? "Done" : "Not-Done"}
          </button>
        </div>
        <button
          className="border-[1px] border-black rounded-[16px] p-[8px] text-[22px] font-semibold inline-block min-w-[200px]"
          onClick={deleteTask}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
