import React, { useEffect, useState } from "react";
import { Button, TodoItem } from "../components";
import { db } from "../config/firebaseConfig";
import { signOutFromGoogle } from "../config/Auth";
import { auth } from "../config/firebaseConfig";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

//Icons
import { CiLogout } from "react-icons/ci";
import { AiOutlineLogin } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { RiCalendarTodoFill } from "react-icons/ri";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const [tasktitle, setTasktitle] = useState("");
  const [taskDec, setTaskDec] = useState("");
  const [date, setDate] = useState(0);
  const [doneOrNot, setDoneOrNot] = useState(false);

  //user email view
  const [userEmailVisible, setUserEmailVisible] = useState(false);

  const tasksCollectionRef = collection(db, "tasks");

  const getTasksList = async () => {
    try {
      const data = await getDocs(tasksCollectionRef);
      const filteredData = data.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));

      setTasks([...filteredData]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTasksList();
  }, []);

  const onSubmitTask = async () => {
    try {
      await addDoc(tasksCollectionRef, {
        title: tasktitle,
        description: taskDec,
        status: doneOrNot,
        date: date,
      });
      getTasksList();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (tasktitle && date && taskDec) onSubmitTask();
  }, [tasktitle, date, taskDec, doneOrNot]);

  const ButtonFormData = ({ date, description, state, title }) => {
    setTasktitle(title);
    setTaskDec(description);
    setDate(date);
    setDoneOrNot(state);
  };

  return (
    <section className="bg-gray-500 overflow-hidden flex justify-center min-h-[100vh]">
      <div className=" border-black bg-black border-[10px] rounded-[16px] m-[4px] w-full flex justify-between ">
        <div className="bg-black flex flex-col justify-between text-white p-[8px]">
          <div className="h-[90vh] flex flex-col justify-between">
            <div className="bg-white object-contain rounded-[12px] w-full aspect-[1] text-black flex items-center justify-center">
              <RiCalendarTodoFill className="w-ful h-full w-[24px]  " />
            </div>
            <div className="flex flex-col gap-[10px] ">
              <button className=" p-[10px] bg-white text-black rounded-[12px]">
                <Link to="/login">
                  <AiOutlineLogin className=" w-ful h-full w-[24px] " />
                </Link>
              </button>
              <div
                className="bg-white text-black rounded-[12px]  flex justify-center items-center aspect-square "
                onMouseEnter={() => setUserEmailVisible(true)}
                onMouseLeave={() => setUserEmailVisible(false)}
              >
                <BiUserCircle className=" w-ful h-full w-[24px] " />
                {userEmailVisible && (
                  <div className=" absolute left-[80px] bg-gray-600 p-[8px] text-white text-[20px] rounded-[12px]">
                    {auth?.currentUser?.email
                      ? auth?.currentUser?.email
                      : "No one"}{" "}
                    <br /> is currently logged In
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center flex-col gap-[10px] ">
              <button onClick={signOutFromGoogle}>
                <CiLogout className=" w-ful h-full w-[24px] " />
              </button>
              <hr />
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-[24px] p-[10px] flex flex-col flex-wrap">
          <div className="mb-[10%]">
            <h2 className="text-[2rem] font-semibold">To-Do App</h2>
          </div>
          <div className="flex flex-col">
            <Button title={"+ To-Do Item "} data={ButtonFormData} />
            <div className="flex flex-col">
              {tasks.map((task, key) => {
                return (
                  <TodoItem data={task} key={key} getTasksList={getTasksList} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
tasktitle, date, taskDec, doneOrNot