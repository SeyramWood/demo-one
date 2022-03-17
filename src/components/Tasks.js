import React from "react";
import Input from "./Input";
import Task from "./Task";

const uniqueId = () => {
  return Math.random().toString(36).substring(2, 12) + Date.now();
};

const storeTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const getTasks = (tasks) => {
  if (!localStorage.getItem("tasks")) {
    return localStorage.getItem("tasks");
  }
  return JSON.parse(localStorage.getItem("tasks"));
};

const Tasks = () => {
  const [task, setTask] = React.useState("");
  const [updateData, setUpdateData] = React.useState("");
  const [tasks, setTasks] = React.useState(getTasks());

  const handleChange = (e) => {
    setTask((state) => (state = e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateData) {
      const newTasks = [...tasks];
      newTasks.splice(
        tasks.findIndex((t) => t.id === updateData.id),
        1,
        { ...updateData, task: task }
      );
      setTasks((state) => (state = newTasks));
      setTask("");
      setUpdateData("");
      return;
    }
    if (!task) {
      return;
    }
    setTasks(
      (state) =>
        (state = [
          {
            id: uniqueId(),
            task,
            completed: false,
          },
          ...state,
        ])
    );
    setTask("");
    storeTasks(tasks);
  };
  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks((state) => (state = newTasks));
  };
  const updateTask = (id) => {
    const data = tasks[tasks.findIndex((t) => t.id === id)];
    setTask(data.task);
    setUpdateData(data);
  };
  const markCompletedTask = (id, completed) => {
    const data = tasks.map((t) => {
      if (t.id === id) {
        t.completed = completed;
      }
      return t;
    });
    setTasks((state) => (state = data));
  };

  React.useEffect(() => {
    storeTasks(tasks);
  }, [tasks]);

  return (
    <main className="wrapper">
      <Input
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        task={task}
        updateData={updateData}
      />
      <section className="tasks">
        {tasks.map((t) => (
          <Task
            task={t}
            updateTask={updateTask}
            deleteTask={deleteTask}
            markCompletedTask={markCompletedTask}
            key={t.id}
          />
        ))}
      </section>
    </main>
  );
};

export default Tasks;
