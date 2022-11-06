import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputVal, setInputVal] = useState("");
  const [inputArr, setInputArr] = useState([]);
  const [data, setData] = useState(true);
  const addItems = () => {
    if (!inputVal) {
      return <div>Tidak ada task..</div>;
    } else {
      setInputArr([...inputArr, inputVal]);
    }
    setInputVal("");
  };
  const deleteItem = (id) => {
    const newArr = inputArr.filter((val, ind) => {
      return id !== ind;
    });
    setInputArr(newArr);
  };
  const noData = "tidak ada data";
  useEffect(() => {
    if (inputArr.length === 0) {
      setData(true);
    } else {
      setData(false);
    }
  }, [inputArr]);
  return (
    <div  className="flex flex-col items-center justify-center bg-neutral-focus h-screen text-white">
        <h1 className="text-3xl font-medium mt-5 mb-5">Todolist</h1>
      <div className="flex">
        <input
          className="input input-bordered w-full max-w-xs mr-3 shadow-sm shadow-slate-700"
          placeholder="e.g Finish Exercise"
          type="text"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
        />
        <button className="btn btn-m" onClick={addItems}>
          Add Task
        </button>
      </div>
        <h3 className="text-xl text-center mt-3">Your task</h3>
      <div className="mt-4 w-4/5 m-auto border-t border-slate-300">
        {data && <div className="text-center font-medium mt-5">No Task In Here 🤔</div>}
        {inputArr.map((val, ind) => {
          return (
            <li key={ind} className="py-2 px-3 flex shadow-md mb-2 mt-1 rounded-md justify-between items-center mr-1">
              <h4 className="text-lg font-thin">{val}</h4>
              <button className="btn btn-sm" onClick={() => deleteItem(ind)}>
                delete
              </button>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default App;
