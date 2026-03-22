import React, { useState, useEffect } from "react";
import StudentService from "../services/StudentService";

function StudentCrud() {

  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    studentname: "",
    studentaddress: "",
    mobile: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    StudentService.getStudents()
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveStudent = () => {
    StudentService.saveStudent(formData)
      .then(() => {
        loadStudents();
        resetForm();
      });
  };

  const editStudent = (student) => {

    setFormData({
      id: student.id,
      studentname: student.studentname,
      studentaddress: student.studentaddress,
      mobile: student.mobile
    });

    setIsEditing(true);
  };

  const updateStudent = () => {

    StudentService.updateStudent(formData.id, formData)
      .then(() => {
        loadStudents();
        resetForm();
      });
  };

  const deleteStudent = (id) => {

    StudentService.deleteStudent(id)
      .then(() => loadStudents());
  };

  const resetForm = () => {

    setFormData({
      id: "",
      studentname: "",
      studentaddress: "",
      mobile: ""
    });

    setIsEditing(false);
  };

  return (

    <div style={{ width: "800px", margin: "auto", paddingTop: "30px" }}>

      <h2>Student Management</h2>

      <input
        type="text"
        name="studentname"
        placeholder="Name"
        value={formData.studentname}
        onChange={handleChange}
      />

      <input
        type="text"
        name="studentaddress"
        placeholder="Address"
        value={formData.studentaddress}
        onChange={handleChange}
      />

      <input
        type="text"
        name="mobile"
        placeholder="Mobile"
        value={formData.mobile}
        onChange={handleChange}
      />

      {isEditing ? (
        <button onClick={updateStudent}>Update</button>
      ) : (
        <button onClick={saveStudent}>Save</button>
      )}

      <hr/>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (

            <tr key={student.id}>

              <td>{student.id}</td>
              <td>{student.studentname}</td>
              <td>{student.studentaddress}</td>
              <td>{student.mobile}</td>

              <td>

                <button onClick={() => editStudent(student)}>
                  Edit
                </button>

                <button onClick={() => deleteStudent(student.id)}>
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>
      </table>

    </div>
  );
}

export default StudentCrud;