import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerms] = useState("");
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    date: "",
    status: "To Do",
  });
  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSave = () => {
    if (editId) {
      const updatedTasks = tasks.map((task) =>
        task.id === editId ? { ...taskData, id: editId } : task,
      );
      setTasks(updatedTasks);
      setEditId(null);
    } else {
      const newTask = {
        ...taskData,
        id: Date.now(),
      };
      setTasks([...tasks, newTask]);
    }
    setTaskData({
      title: "",
      description: "",
      date: "",
      status: "To Do",
    });
  };
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };
  const handleEdit = (task) => {
    const { id, ...rest } = task;
    setTaskData(rest);
    setEditId(task.id);
  };
  const handleDrop = (e, newStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) =>
      task.id === Number(taskId) ? { ...task, status: newStatus } : task,
    );
    setTasks(updatedTasks);
  };
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);
  const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  task.status.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div
      className={`p-2 ${
        darkMode
          ? "bg-dark text-white min-vh-100"
          : "bg-light text-dark min-vh-100"
      }`}
    >
      <nav
        className={`navbar navbar-expand-md ${darkMode ? "bg-dark navbar-dark" : "bg-body-tertiary"}`}
      >
        <div className="container-fluid">
          <button className="btn btn-danger" type="button">
              <i className="fa-solid fa-bars-progress"></i>
            </button>
          <span className="navbar-brand fw-bold px-2">TaskFlow</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarContent"
          >
            <div className="d-flex flex-column flex-md-row gap-2 align-items-stretch align-items-md-center">
              <form className="d-flex w-100 w-md-auto" role="search">
                <input
                  className={`form-control ${darkMode ? "bg-dark-subtle text-white" : ""}`}
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerms(e.target.value)}
                />
              </form>

              <button
                type="button"
                className="btn btn-danger w-100 w-md-auto"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="fa-solid fa-plus fa-xs"></i> Add Task
              </button>

              <button
                className="btn w-100 w-md-auto"
                type="button"
                onClick={toggleTheme}
              >
                <i
                  className={`fa-regular ${darkMode ? "fa-sun text-white" : "fa-moon"}`}
                ></i>
              </button>

              <Link
                to="/SignInPage"
                className={`btn w-100 w-md-auto text-decoration-none ${darkMode ? "bg-dark text-white" : "bg-body-tertiary text-dark"}`}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-3">
        <div className="fw-bold fs-5">
          <q>Hey, Welcome back</q>
        </div>
        <small className="text-secondary">
          Organize your work across boards
        </small>
      </div>

      <div className="container-fluid p-4">
        <div className="row g-3 justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div
              className={`card px-3 pb-5 pt-2 ${darkMode ? "bg-dark-subtle text-white" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "To Do")}
            >
              <div className="d-flex flex-row justify-content-between">
                <small className="text-secondary">
                  <i className="fa-solid fa-circle fa-xs text-secondary px-1"></i>
                  To Do
                </small>
                <div>
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                  >
                    <i className="fa-solid fa-plus fa-xs"></i>
                  </button>
                </div>
              </div>
              {filteredTasks
                .filter((task) => task.status === "To Do")
                .map((task) => (
                  <div
                    key={task.id}
                    className="card p-2 mt-2"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("taskId", task.id);
                      e.currentTarget.style.opacity = "0.5";
                    }}
                    onDragEnd={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <h6>{task.title}</h6>
                      <div>
                        <button
                          className="btn btn-sm mt-2"
                          onClick={() => handleDelete(task.id)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                        <button
                          className="btn btn-sm mt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => handleEdit(task)}
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                      </div>
                    </div>
                    <small>{task.description}</small>
                    <div className="text-muted">{task.date}</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div
              className={`card px-3 pb-5 pt-2 ${darkMode ? "bg-dark-subtle text-white" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "In Progress")}
            >
              <div className="d-flex flex-row justify-content-between">
                <small className="text-secondary">
                  <i className="fa-solid fa-circle fa-xs text-danger px-1"></i>{" "}
                  In Progress
                </small>
                <div>
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@fat"
                  >
                    <i className="fa-solid fa-plus fa-xs"></i>
                  </button>
                </div>
              </div>
              {filteredTasks
                .filter((task) => task.status === "In Progress")
                .map((task) => (
                  <div
                    key={task.id}
                    className="card p-2 mt-2"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("taskId", task.id);
                      e.currentTarget.style.opacity = "0.5";
                    }}
                    onDragEnd={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <h6>{task.title}</h6>
                      <div>
                        <button
                          className="btn btn-sm mt-2"
                          onClick={() => handleDelete(task.id)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                        <button
                          className="btn btn-sm mt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => handleEdit(task)}
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                      </div>
                    </div>
                    <small>{task.description}</small>
                    <div className="text-muted">{task.date}</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div
              className={`card px-3 pb-5 pt-2 ${darkMode ? "bg-dark-subtle text-white" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "Done")}
            >
              <div className="d-flex flex-row justify-content-between">
                <small className="text-secondary">
                  <i className="fa-solid fa-circle fa-xs text-success px-1"></i>
                  Done
                </small>
                <div>
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@getbootstrap"
                  >
                    <i className="fa-solid fa-plus fa-xs"></i>
                  </button>
                </div>
              </div>
              {filteredTasks
                .filter((task) => task.status === "Done")
                .map((task) => (
                  <div
                    key={task.id}
                    className="card p-2 mt-2"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("taskId", task.id);
                      e.currentTarget.style.opacity = "0.5";
                    }}
                    onDragEnd={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <h6>{task.title}</h6>
                      <div>
                        <button
                          className="btn btn-sm mt-2"
                          onClick={() => handleDelete(task.id)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                        <button
                          className="btn btn-sm mt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => handleEdit(task)}
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                      </div>
                    </div>
                    <small>{task.description}</small>
                    <div className="text-muted">{task.date}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className={`modal-content ${darkMode ? "bg-dark text-white" : "bg-body-tertiary"}`}
          >
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-secondary"
                id="exampleModalLabel"
              >
                {editId ? "Edit Task" : "New Task"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={taskData.title}
                    onChange={handleChange}
                    className="form-control"
                    id="recipient-name"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={taskData.description}
                    onChange={handleChange}
                    className="form-control"
                    id="message-text"
                    placeholder="Description"
                  ></textarea>
                </div>
              </form>
              <div className="d-flex justify-content-between">
                <label htmlFor="message-text" className="col-form-label">
                  Due Date
                </label>
                <label htmlFor="message-text" className="col-form-label">
                  Column
                </label>
              </div>
              <div className="d-flex justify-content-between gap-5">
                <input
                  type="date"
                  name="date"
                  value={taskData.date}
                  onChange={handleChange}
                  className="form-control"
                  id="date"
                />

                <select
                  name="status"
                  value={taskData.status}
                  onChange={handleChange}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light border border-2 text-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleSave}
              >
                {editId ? "update" : "create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
