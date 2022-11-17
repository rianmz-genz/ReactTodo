import { useEffect, useState } from "react";
import { RiDeleteBackLine } from "react-icons/ri";
import { RiEdit2Line } from "react-icons/ri";
import { RiAddCircleLine } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";
import { FaBullseye } from "react-icons/fa";

function App() {
  const [inputVal, setInputVal] = useState("");
  const [inputArr, setInputArr] = useState([]);
  const [edit, setEdit] = useState({});
  const [data, setData] = useState(true);
  const [message, setMessage] = useState("");

  function generateId() {
    return Date.now();
  }
  function saveItems(e) {
    e.preventDefault();

    if (!inputVal) {
      return setMessage("No items to add");
    }
    setMessage("");
    if (edit.id) {
      const updatedTodo = { ...edit, activity: inputVal, };
      const editTodoIndex = inputArr.findIndex(function (todos) {
        return todos.id == edit.id;
      });
      const updatedTodos = [...inputArr];
      updatedTodos[editTodoIndex] = updatedTodo;
      setInputArr(updatedTodos);
      return cancelEdit();
    }

    setInputArr([...inputArr, { id: generateId(), activity: inputVal, done: false, }]);

    setInputVal("");
  }
  function doneTodo(todo){
    const currentTodo = {
      ...todo, 
      done: todo.done ? false : true
    }
    const editTodoIndex = inputArr.findIndex(function (currentTodo) {
      return currentTodo.id == todo.id
    });
    const updatedTodos = [...inputArr];
    updatedTodos[editTodoIndex] = currentTodo;
    setInputArr(updatedTodos)  
  }
  function editItem(val){
    setInputVal(val.activity);
    setEdit(val);
  };
  function deleteItem(id){
    const newArr = inputArr.filter((val) => {
      return id !== val.id;
    });
    setInputArr(newArr);
    if (edit.id) cancelEdit();
  };
  function cancelEdit() {
    setEdit({});
    setInputVal("");
  }
  useEffect(() => {
    if (inputArr.length === 0) {
      setData(true);
    } else {
      setData(false);
    }
  }, [inputArr]);
  return (
    <div className="flex flex-col items-center justify-center md:bg-neutral-focus max-sm:bg-neutral-focus h-screen text-white">
      <h1 className="text-3xl font-medium mt-5 mb-5 flex items-center"><FaBullseye className="mr-3" />Todolist</h1>
      <form className="flex max-sm:w-11/12 md:w-2/5 justify-center items-center" onSubmit={saveItems}>
        <label className="flex justify-start items-center input input-bordered w-full max-w-xs mr-3 shadow-sm md:bg-neutral max-sm:bg-neutral shadow-slate-700">
        <input
          className=" w-full bg-transparent outline-none border-none max-sm:text-white"
          placeholder="e.g Finish Exercise"
          type="text"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
        />
        {edit.id && (
          <button  onClick={cancelEdit}>
            x
          </button>
        )}
        </label>
        <button className="btn btn-m text-xl" onClick={saveItems}>
          {edit.id ? <FaAngleDown/> : <RiAddCircleLine />}
        </button>
      </form>
      <h3 className="text-xl text-center mt-3">Your task</h3>
      <div className="mt-4 md:w-2/5 max-sm:w-11/12 m-auto border-t border-slate-300">
        {message && (
          <div className="text-center font-medium mt-5 text-red-500">
            {message}
          </div>
        )}
        {data && (
          <div className="text-center font-light mt-5">No Task In Here 🤔</div>
        )}
        {inputArr.map((val) => {
          return (
            <li
              key={val.id}
              className="py-2 px-3 flex shadow-md mb-2 mt-1 rounded-md justify-between items-center mr-1 max-sm:bg-neutral-focus md:bg-neutral-focus"
            >
              <input type="checkbox" onChange={doneTodo.bind(this,val)} className="checkbox checkbox-xs" /> 
              <h4 className={`text-lg font-thin ${val.done ? 'line-through opacity-50' : ''}`}>{val.activity}</h4>
              <div>
                <button
                  className="btn btn-sm mr-3"
                  onClick={editItem.bind(this, val)}
                >
                  <RiEdit2Line />
                </button>
                <button
                  className="btn btn-sm"
                  onClick={deleteItem.bind(this, val.id)}
                >
                  <RiDeleteBackLine />
                </button>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default App;
