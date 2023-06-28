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

  return (
    <form className=" bg-yellow-500 text-[28px] p-[28px] flex flex-col justify-around text-black rounded-[16px] opacity-100 max-w-[80vh] w-[60vw] aspect-[1] z-[100]">
      <div className="flex justify-center flex-col gap-[60px]">
        <div className="flex justify-center">
          <h2 className="text-[50px] font-semibold scale-125">+ To-Do Item</h2>
        </div>
        <div className="flex justify-center flex-col gap-[20px]">
          <div>
            <label htmlFor="status">Title: </label>
            <input
              type="text"
              id="status"
              className="bg-black text-white p-[10px] rounded-[18px] font-medium"
              placeholder="Title"
              onChange={TitleHandler}
            />
          </div>
          <div className="">
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              id="description"
              placeholder="Description"
              className="bg-black text-white p-[10px] rounded-[18px] font-medium"
              onChange={DescriptionHandler}
            />
          </div>
          <div className="flex">
            <div>
              <label htmlFor="date">Date: </label>
              <input
                type="date"
                id="date"
                className="bg-black text-white p-[10px] rounded-[18px] font-medium"
                onChange={DateFormHandler}
              />
            </div>
          </div>
          <div>
            <label htmlFor="status">Status: </label>
            <input
              type="checkbox"
              id="status"
              className="h-[24px] mt-[6px] aspect-square "
              onChange={StatusHandler}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="border-black border-[1px] px-[10px] rounded-[8px]"
          onClick={SubmitButtonHandler}
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default FormWindow;
