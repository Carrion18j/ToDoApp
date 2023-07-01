import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, sighInWithGoogle } from "../config/Auth";
import { auth } from "../config/firebaseConfig";

const Login = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const logInWithEmail = (e) => {
    e.preventDefault();
    createUser(gmail, password);
  };

  const gmailChangeHandler = (e) => {
    e.preventDefault();
    try {
      setGmail(e.target.value);
    } catch (err) {
      console.log(err);
    }
  };

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const googleLoginHandler = async (e) => {
    await sighInWithGoogle(e);
    navigate("/");
  };


  return (
    <section className="overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <form action="" className="h-[100vh] flex justify-center items-center">
        <div className="h-[60vh] min-h-[360px] w-[60%] min-w-[330px] max-w-[450px] bg-white rounded-[12px] flex flex-col justify-between p-[8px]">
          <div className="flex justify-between flex-col gap-[24px]">
            <h2 className="flex justify-center text-[2.4rem] font-[700]">
              Login
            </h2>
            <hr />
          </div>
          <div className=" flex justify-center items-center flex-col gap-[24px]">
            <div className="w-[80%]">
              <input
                type="text"
                id="username"
                className="border-0 text-[1.4rem]  w-full"
                placeholder="Username"
                onChange={gmailChangeHandler}
              />
              <hr className="bg-black h-[2px] w-full" />
            </div>
            <div className="w-[80%]">
              <input
                type="text"
                id="password"
                className="border-0 text-[1.4rem]  w-full"
                placeholder="Password"
                onChange={passwordChangeHandler}
              />
              <hr className="bg-black h-[2px] w-full" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-[24px]">
            <button
              className="bg-blue-500 w-[80%] p-[6px] text-[1.4rem] text-white font-[600] rounded-[28px]"
              onClick={logInWithEmail}
            >
              Login
            </button>
            <button
              className="text-black w-[36%] p-[6px] text-[1.4rem] font-[500] rounded-[28px] border-[1px] border-black"
              onClick={googleLoginHandler}
            >
              Google
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
