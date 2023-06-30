import React, { useState } from "react";
import { FormWindow } from "../components";

const Button = ({ title, data, style }) => {
  const [formView, setFormViwe] = useState(false);

  const ButtonOnClickHandler = () => setFormViwe(true);
  const DivClickHandler = () => setFormViwe(false);
  const FormSubmitHandler = () => {
    setFormViwe(false);
  };
  const FormData = (e) => {
    data(e);
  };

  return (
    <div>
      <button
        className={`${style} text-[24px] bg-black text-white p-[16px] rounded-[14px] font-semibold`}
        onClick={ButtonOnClickHandler}
      >
        {title}
      </button>
      {formView && (
        <div className="flex justify-center w-[100vw] h-[100%] items-center absolute top-0 right-0">
          <div
            className="w-[100vw] h-[100%] opacity-25 bg-black absolute top-0 right-0"
            onClick={DivClickHandler}
          />
          <FormWindow data={FormData} formSubmiter={FormSubmitHandler} />
        </div>
      )}
    </div>
  );
};

export default Button;
