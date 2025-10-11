import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

const Home = () => {
  const API_BASE =
    import.meta.env.VITE_API_BASE || "http://localhost:8000/api/v1";
  const api = axios.create({ baseURL: API_BASE });

  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, assignmentsRes] = await Promise.all([
          getStudents(),
          getAssignments(),
        ]);

        setStudents(studentsRes.data.students);
        setAssignments(assignmentsRes.data.assignments);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  async function postStudent(e) {
    e.preventDefault();
    try {
      const student = await api.post("/students", {
        name: e.target.name.value,
        email: e.target.email.value,
        classLevel: e.target.classLevel.value,
      });

      const [studentsRes] = await Promise.all([getStudents()]);
      setStudents(studentsRes.data.students);
    } catch (error) {
      console.error(error);
    }
  }

  async function postAssignment(e) {
    e.preventDefault();
    try {
      const assignment = await api.post("/assignments", {
        title: e.target.title.value,
        description: e.target.description.value,
        dueDate: e.target.dueDate.value,
      });
      const [assignmentsRes] = await Promise.all([setAssignments()]);
      setAssignments(assignmentsRes.data.assignments);
    } catch (error) {
      console.error(error);
    }
  }

  async function getStudents() {
    return api.get("/students");
  }

  async function getAssignments() {
    return api.get("/assignments");
  }

  async function deleteStudent(id) {
    const deleteStudent = await api.delete(`/students/${id}`);
    const [studentsRes] = await Promise.all([getStudents()]);
    setStudents(studentsRes.data.students);
  }
  async function deleteAssignment(id) {
    const deleteAssignment = await api.delete(`/assignments/${id}`);
    const [assignmentsRes] = await Promise.all([getAssignments()]);
    setAssignments(assignmentsRes.data.assignments);
  }

  return (
    <>
      <div style={styles.container}>
        <div>
          <form onSubmit={postStudent}>
            <h1>Add Student</h1>
            <article style={styles.form}>
              <label htmlFor="name">Name</label>
              <input style={styles.input} type="text" name="name"></input>
              <label htmlFor="email">Email</label>
              <input style={styles.input} type="text" name="email"></input>
              <label htmlFor="classLevel">Class</label>
              <input style={styles.input} type="text" name="classLevel"></input>
              <button style={styles.button} type="submit">
                Add
              </button>
            </article>
          </form>
        </div>
        <div>
          <h1>My Students</h1>
          <table style={styles.table}>
            <thead>
              <tr>
                <td>Name</td>
                <td>email</td>
                <td>Class</td>
                <td>Delete</td>
              </tr>
            </thead>
            {students && (
              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.classLevel}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => deleteStudent(s._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      <div style={styles.container}>
        <div>
          <form onSubmit={postAssignment}>
            <h1>Add Assignment</h1>
            <article style={styles.form}>
              <label htmlFor="title">Name</label>
              <input style={styles.input} type="text" name="title"></input>
              <label htmlFor="description">Description</label>
              <input
                style={styles.input}
                type="text"
                name="description"
              ></input>
              <label htmlFor="dueDate">Due Date</label>
              <input style={styles.input} type="date" name="dueDate"></input>

              <button style={styles.button} type="submit">
                Add
              </button>
            </article>
          </form>
        </div>
        <div>
          <h1>My Assignments</h1>

          <table style={styles.table}>
            <thead>
              <tr>
                <td>Name</td>
                <td>Description</td>
                <td>Due Date</td>
                <td>Delete</td>
              </tr>
            </thead>
            {assignments && (
              <tbody>
                {assignments.map((s) => (
                  <tr key={s._id}>
                    <td>{s.title}</td>
                    <td>{s.description}</td>
                    <td>{s.dueDate}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => deleteAssignment(s._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;

const styles = {
  form: {
    backgroundColor: "#d1d1d1",
    boxShadow: "4px 4px 4px #363636",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "400px",
    textAlign: "left",
    fontSize: "18px",
    padding: "10px",
  },

  input: {
    width: "75%",
    fontSize: "1.2em",
  },

  container: {
    backgroundColor: "#ededed",
    width: "1200px",
    display: "flex",
    flexDirection: "row",
    padding: "12px",
    marginBottom: "24px",
    marginTop: "12px",
    alignItems: "flex-start",
  },

  table: {
    padding: "12px",
    margin: "12px",
    width: "776px",
    borderCollapse: "collapse",
  },

  button: {
    width: "25%",
    margin: "8px 8px 8px 0px",
  },
};
