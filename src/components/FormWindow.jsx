import React, { useState, useEffect } from "react";

const FormWindow = ({ data, formSubmiter }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [state, setState] = useState(false);
  const [finalData, setFinalData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const SubmitButtonHandler = (event) => {
    event.preventDefault();
    if (!title) {
      return setErrorMessage("Title Is Missing");
    }
    if (!description) {
      return setErrorMessage("Description Is Missing");
    }
    if (!date) {
      return setErrorMessage("Date Is Missing");
    }
    if (!(description && date && title)) return;
    formSubmiter();
    data(finalData);
  };

  const debouncer = (e, value) => {
    e.preventDefault();
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
    const data = new dataBlueprint(state, description, date, title);
    setFinalData({ ...data });
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
    <form className=" bg-blue-400 text-[28px] p-[14px] flex flex-col justify-between text-black rounded-[16px]  m-[58px] opacity-100 max-w-[80vh] aspect-[1] z-[100]">
      <h1 className=" sm:text-[3rem] text-[34px] font-semibold text-white">
        Add To-Do
      </h1>
      <div className="flex flex-col gap-[18px] wad:gap-[40px]">
        <div className="flex justify-between flex-wrap">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            className="rounded-[6px] p-[6px] md:max-w-[60%]  w-[100%]"
            value={title}
            onChange={TitleHandler}
          />
        </div>
        <div className="flex justify-between flex-wrap">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            className="rounded-[6px] p-[6px] md:max-w-[60%] w-[100%]"
            onChange={DescriptionHandler}
          />
        </div>
        <div className="flex justify-between flex-wrap">
          <label htmlFor="dateInput">Date: </label>
          <input
            type="date"
            id="dateInput"
            className="rounded-[6px] p-[6px]"
            onChange={DateFormHandler}
          />
        </div>
        {/* <div className="flex justify-between flex-wrap">
          <label htmlFor="statusInput">Status: </label>
          <input
            type="checkbox"
            id="statusInput"
            className="rounded-[12px] p-[6px] w-[40px]"
            onChange={StatusHandler}
          />
        </div> */}
      </div>
      <div className="flex justify-between overflow-hidden md:mt-0 mt-[16px]">
        <div></div>
        {errorMessage && (
          <h3 className="max-w-[70%] bg-blue-500 px-[4px] flex justify-center font-semibold items-center rounded-[8px]">
            {errorMessage}
          </h3>
        )}
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
