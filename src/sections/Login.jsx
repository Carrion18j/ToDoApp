import React, { useState } from "react";
import {
  createUser,
  sighInWithGoogle,
  signOutFromGoogle,
} from "../config/Auth";
import { auth } from "../config/firebaseConfig";
import { Link } from "react-router-dom";

const Login = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

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

  console.log(auth?.currentUser?.email);

  return (
    <section className="overflow-hidden bg-yellow-400 p-[20px]">
      <div className="h-[100vh] rounded-[16px] flex justify-center items-center bg-white">
        <form
          action=""
          className="h-[46%] aspect-[1.4/1] bg-yellow-400 rounded-[16px] flex flex-col justify-around"
        >
          <div className="mx-[24px] flex justify-center gap-[18px] flex-col">
            <input
              type="text"
              id="gmail"
              onChange={gmailChangeHandler}
              placeholder="Gmail"
              className="p-[8px] text-white bg-black text-[20px] w-full rounded-[10px]"
            />
            <input
              type="password"
              onChange={passwordChangeHandler}
              placeholder="Password"
              className="p-[8px] text-white bg-black text-[20px] w-full rounded-[10px]"
            />
            <div className="flex gap-[24px]">
              <button
                className="bg-[black] text-[1.1rem]font-semibold text-white p-[12px] rounded-[18px]"
                onClick={logInWithEmail}
              >
                Sign In
              </button>
              <button
                className="bg-[black] text-[1.1rem]font-semibold text-white p-[12px] rounded-[18px]"
                onClick={signOutFromGoogle}
              >
                Sign Out
              </button>
              <Link
                className="bg-[black] text-[1.1rem]font-semibold text-white p-[12px] rounded-[18px]"
                to="/"
              >
                Go To Home
              </Link>
            </div>
          </div>
          <div>
            <button
              className="bg-[black] text-[1.1rem] font-semibold mx-[24px] text-white p-[12px]  rounded-[18px]"
              onClick={sighInWithGoogle}
            >
              Sign In With google
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
