import React, { useEffect, useState } from "react";
import { Button, TodoItem } from "../components";
import { db } from "../config/firebaseConfig";
import { auth } from "../config/firebaseConfig";
import { signOutFromGoogle } from "../config/Auth";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [tasktitle, setTasktitle] = useState("");
  const [taskDec, setTaskDec] = useState("");
  const [date, setDate] = useState(0);
  const [doneOrNot, setDoneOrNot] = useState(false);

  const tasksCollectionRef = collection(db, "tasks");

  console.log(auth?.currentUser?.email);

  const getTasksList = async () => {
    try {
      const data = await getDocs(tasksCollectionRef);
      const filteredData = data.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));

      setTasks(() => [...filteredData]);
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
        state: doneOrNot,
        date: date,
      });
      getTasksList();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (tasktitle && date && taskDec && doneOrNot) onSubmitTask();
  }, [tasktitle, date, taskDec, doneOrNot]);

  const ButtonFormData = ({ date, description, state, title }) => {
    setTasktitle(title);
    setTaskDec(description);
    setDate(date);
    setDoneOrNot(state);
  };

  return (
    <section className="bg-yellow-400  flex justify-center min-h-[100vh]">
      <div className="border-black bg-white border-[10px] rounded-[16px] m-[4px] w-full flex justify-center">
        <div className="mt-[8%] flex items-center flex-col">
          <h2 className=" text-[36px] font-bold scale-150">
            To-Do App <sub className="text-[12px]">By Sanidhya</sub>
          </h2>
          <div className="flex -mb-[50px] mt-[10px]">
            <button
              className="m-[20px] font-semibold bg-yellow-500 p-[8px] h-[40px] rounded-[14px]"
              onClick={signOutFromGoogle}
            >
              Logout
            </button>
            <Link to="/login">
              <button className="m-[20px] font-semibold bg-yellow-500 p-[8px] h-[40px] rounded-[14px]">
                Login
              </button>
            </Link>
            <div className="m-[20px] font-semibold bg-yellow-500 p-[8px] h-[40px] rounded-[14px]">{`${auth?.currentUser?.email ? auth?.currentUser?.email : "No One "} Is Loggined In`}</div>
          </div>
          <div className="mt-[20%] p-[28px]">
            <div>
              <Button title={"+ To-Do Item "} data={ButtonFormData} />
            </div>
            <div className="mt-[48px]">
              {tasks.map((item, key) => {
                return (
                  <div key={key}>
                    <TodoItem data={item} getTasksList={getTasksList} />
                  </div>
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
