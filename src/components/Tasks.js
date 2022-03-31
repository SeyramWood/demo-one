import React from "react";
import Filter from "./Filter";
import Input from "./Input";
import Search from "./Search";
import Task from "./Task";

const uniqueId = () => {
  return Math.random().toString(36).substring(2, 12) + Date.now();
};

const storeTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const getTasks = (tasks) => {
  if (!localStorage.getItem("tasks")) {
    return [];
  }
  return JSON.parse(localStorage.getItem("tasks"));
};

const Tasks = () => {
  const [task, setTask] = React.useState("");
  const [updateData, setUpdateData] = React.useState("");
  const [tasks, setTasks] = React.useState(getTasks());
  const [completedTasks, setCompletedTasks] = React.useState(0);
  const [filteredStatus, setFilteredStatus] = React.useState("all");
  const [filteredTasks, setFilteredTasks] = React.useState([]);
  const [searchKey, setSearchKey] = React.useState("");
  const [searchedTasks, setSearchedTasks] = React.useState([]);

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
            createdAt: new Date(),
          },
          ...state,
        ])
    );
    setTask("");
    storeTasks(tasks);
  };
  const deleteTask = (id) => {
    const newTasks = [...tasks];
    newTasks.splice(
      newTasks.findIndex((t) => t.id === id),
      1
    );
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

  const handleFilter = (e) => {
    setFilteredStatus(e.target.value);
  };
  const handleSearch = (e) => {
    setSearchKey(e.target.value);
    setSearchedTasks((state) => {
      return tasks.filter((t) => t.task.includes(searchKey.toLowerCase()));
    });
  };

  React.useEffect(() => {
    storeTasks(tasks);
  }, [tasks]);

  React.useEffect(() => {
    setCompletedTasks((state) => {
      return tasks.filter((t) => t.completed === true).length;
    });
  }, [tasks]);
  React.useEffect(() => {
    setFilteredTasks((state) => {
      if (filteredStatus === "completed") {
        return tasks.filter((t) => t.completed === true);
      } else if (filteredStatus === "uncompleted") {
        return tasks.filter((t) => t.completed === false);
      } else {
        return [...tasks];
      }
    });
  }, [tasks, filteredStatus]);

  return (
    <main className="wrapper">
      <aside className="taskBoard">
        <h3>Progress Monitor</h3>
        <div className="taskStats">
          <div className="taskStat">
            <span>Total Tasks</span>
            <span>{tasks.length}</span>
          </div>
          <div className="taskStat">
            <span>Completed Tasks</span>
            <span>{completedTasks}</span>
          </div>
          <div className="taskStat">
            <span>Uncompleted Tasks</span>
            <span>{tasks.length - completedTasks}</span>
          </div>
        </div>
      </aside>
      <div className="taskWrapper">
        <Input
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          task={task}
          updateData={updateData}
        />
        <div className="filterSearch">
          <Search searchKey={searchKey} handleSearch={handleSearch} />
          <Filter handleFilter={handleFilter} />
        </div>
        <section className="tasks">
          {filteredTasks.length > 0
            ? filteredTasks.map((t) => (
                <Task
                  task={t}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  markCompletedTask={markCompletedTask}
                  key={t.id}
                />
              ))
            : searchedTasks.length > 0
            ? searchedTasks.map((t) => (
                <Task
                  task={t}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  markCompletedTask={markCompletedTask}
                  key={t.id}
                />
              ))
            : searchedTasks.length === 0 && searchKey !== ""
            ? tasks.map((t) => (
                <Task
                  task={t}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  markCompletedTask={markCompletedTask}
                  key={t.id}
                />
              ))
            : "No task found"}
        </section>
      </div>
    </main>
  );
};

export default Tasks;
