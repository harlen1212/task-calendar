
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import CalendarState from "./context/CalendarContext";
import TaskForm from "./components/TaskForm";
import { InputNumber, Space, message } from 'antd';
import { useEffect, useState } from "react";
function App() {
  const [nums,setNums] = useState(1);
  const getNums = async () => {
    const res = await fetch("/condition", { method: "get" })
    let data = await res.json();
    data = data["nums"] || 1;
    setNums(data)
  }

  const updateNums = async (value) => {
    const headers = new Headers();
    headers.append('content-type', 'application/json')
    return fetch('/condition', {
      method: 'put',
      headers,
      body: JSON.stringify({
        nums:value
      })
    })
  }
  useEffect(()=>{
    getNums();
  },[])
  const onChange = (value) => {
    // console.log('changed', value);
    setNums(value);
    updateNums(value).then((res)=>{
      message.success("修改成功");
    });
  };
  return (
    <div className="container">
      <CalendarState>
        <Header />
        <Calendar />
        <TaskForm />
      </CalendarState>

      <Space>
        条件还剩
        <InputNumber min={1} max={10} value={nums} onChange={onChange} />
        个哦
      </Space>


    </div>
  );
}

export default App;
