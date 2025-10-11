import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

const Grades = () => {
  const API_BASE =
    import.meta.env.VITE_API_BASE || "http://localhost:8000/api/v1";
  const api = axios.create({ baseURL: API_BASE });
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("1");
        const [studentsRes, assignmentsRes, gradesRes] = await Promise.all([
          getStudents(),
          getAssignments(),
          getGrades(),
        ]);
        console.log("2");
        setStudents(studentsRes.data.students);
        setAssignments(assignmentsRes.data.assignments);
        setGrades(gradesRes.data.grades);
        console.log("3");
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  async function getStudents() {
    return api.get("/students");
  }

  async function getAssignments() {
    return api.get("/assignments");
  }

  async function getGrades() {
    return api.get("/grades");
  }

  async function postGrades(e) {
    e.preventDefault();
    try {
      const grades = await api.post("/grades", {
        assignment: e.target.assignment.value,
        student: e.target.student.value,
        score: e.target.score.value,
      });
      const [gradesRes] = await Promise.all([getGrades()]);
      setGrades(gradesRes.data.grades);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteGrade(id) {
    const deleteGrade = await api.delete(`/grades/${id}`);
    const [gradesRes] = await Promise.all([getGrades()]);
    setGrades(gradesRes.data.grades);
  }

  return (
    <>
      <form style={styles.container} onSubmit={postGrades}>
        <div>
          <h2>My Assignments</h2>
          <select
            style={styles.input}
            id="select"
            type="text"
            name="assignment"
          >
            <option></option>
            {assignments && (
              <>
                {assignments.map((d) => (
                  <option value={d._id} key={d._id}>
                    {d.title}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <div>
          <h2>My Sudents</h2>
          <select style={styles.input} id="select" type="text" name="student">
            <option></option>
            {students && (
              <>
                {students.map((d) => (
                  <option value={d._id} key={d._id}>
                    {d.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <div>
          <h2>Add Grade</h2>
          <input stye={styles.input} type="number" name="score"></input>
          <button style={styles.button} type="submit">
            Add
          </button>
        </div>
      </form>
      <h2>All Grades</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <td>Assignment</td>
            <td>Student</td>
            <td>Grade</td>
          </tr>
        </thead>
        {grades && (
          <tbody>
            {grades.map((s) => {
              return (
                <tr key={s._id}>
                  <td>{s.assignment.title}</td>
                  <td>{s.student.name}</td>
                  <td>{s.score}</td>
                  <td>
                    <button type="button" onClick={() => deleteGrade(s._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </>
  );
};

export default Grades;

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
    display: "flex",
    justifyContent: "space-between",
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
