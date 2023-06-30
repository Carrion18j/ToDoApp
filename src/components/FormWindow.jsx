import React, { useState, useEffect } from "react";

const FormWindow = ({ data, formSubmitHandler }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [state, setState] = useState(false);

  const SubmitButtonHandler = (event) => {
    event.preventDefault();
    formSubmitHandler(false);
  };

  const debouncer = (e, value) => {
    e?.preventDefault();
    const timer = setTimeout(() => {
      value;
    }, 1000);

    return () => clearTimeout(timer);
  };

  class dataBlueprint {
    constructor(state, description, date, title) {
      this.state = state;
      this.description = description;
      this.date = date;
      this.title = title;
    }
  }

  useEffect(() => {
    const finalData = new dataBlueprint(state, description, date, title);
    data(finalData);
  }, [state, description, date, title]);

  const TitleHandler = (e) => {
    debouncer(e, setTitle(e.target.value));
  };
  const DescriptionHandler = (e) => {
    debouncer(e, setDescription(e.target.value));
  };
  const DateFormHandler = (e) => {
    debouncer(e, setDate(e.target.value));
  };
  const StatusHandler = (e) => {
    debouncer(e, setState(e.target.checked));
  };

  return (
    <form className=" bg-blue-400 text-[28px] p-[14px] flex flex-col justify-between text-black rounded-[16px] opacity-100 max-w-[80vh] w-[60vw] aspect-[1] z-[100]">
      <div className="">
        <h1 className="text-[3rem] font-semibold text-white">Add To-Do</h1>
      </div>
      <div className="flex flex-col gap-[10px] lg:gap-[40px]">
        <div className="flex justify-between">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            className="rounded-[6px] p-[6px] max-w-[60%]"
            value={title}
            onChange={TitleHandler}
          />
        </div>
        <div className="flex  justify-between">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            className="rounded-[6px] p-[6px] max-w-[60%]"
            onChange={DescriptionHandler}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="dateInput">Date: </label>
          <input
            type="date"
            id="dateInput"
            className="rounded-[6px] p-[6px]"
            onChange={DateFormHandler}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="statusInput">Status: </label>
          <input
            type="checkbox"
            id="statusInput"
            className="rounded-[6px] p-[6px]"
            onChange={StatusHandler}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="border-[1px] text-[2rem] border-black px-[8px] rounded-[4px]"
          onClick={SubmitButtonHandler}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormWindow;
