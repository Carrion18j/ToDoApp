import React, { useState } from "react";
import { FormWindow } from "../components";

const Button = ({ title, data, style }) => {
  const [newFormWindow, setNewFormWindow] = useState(false);
  const [newFormData, setNewFormData] = useState([]);

  const ButtonOnClickHandler = () => setNewFormWindow(true);
  const DivClickHandler = () => setNewFormWindow(false);
  const FormSubmitHandler = (e) => {
    data(newFormData);
    setNewFormWindow(e);
  };
  const FormData = (e) => {
    setNewFormData({ ...e });
  };

  return (
    <div>
      <button
        className={`${style} text-[24px] bg-black text-white p-[16px] rounded-[14px] font-semibold`}
        onClick={ButtonOnClickHandler}
      >
        {title}
      </button>
      {newFormWindow && (
        <div className="flex justify-center w-[100vw] h-[100%] items-center absolute top-0 right-0">
          <div
            className="w-[100vw] h-[100%] opacity-25 bg-black absolute top-0 right-0"
            onClick={DivClickHandler}
          />
          <FormWindow data={FormData} formSubmitHandler={FormSubmitHandler} />
        </div>
      )}
    </div>
  );
};

export default Button;
