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
    <form className=" bg-gray-500 text-[28px] p-[28px] flex flex-col justify-around text-black rounded-[16px] opacity-100 max-w-[80vh] w-[60vw] aspect-[1] z-[100]">
      
    </form>
  );
};

export default FormWindow;
