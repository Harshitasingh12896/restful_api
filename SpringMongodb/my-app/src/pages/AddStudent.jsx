import { useState } from "react";
import { saveStudent } from "../services/studentService";
import { toast } from "react-toastify";

function AddStudent() {

  const [formData, setFormData] = useState({
    studentname: "",
    studentaddress: "",
    mobile: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    saveStudent(formData)
      .then(() => {
        toast.success("Student Added ✅");
        setFormData({
          studentname: "",
          studentaddress: "",
          mobile: ""
        });
      })
      .catch(() => {
        toast.error("Error ❌");
      });
  };

  return (
    <div className="p-5">

      <h2 className="text-2xl mb-4">Add Student</h2>

      <input
        name="studentname"
        value={formData.studentname}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 mr-2"
      />

      <input
        name="studentaddress"
        value={formData.studentaddress}
        onChange={handleChange}
        placeholder="Address"
        className="border p-2 mr-2"
      />

      <input
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        placeholder="Mobile"
        className="border p-2 mr-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2"
      >
        Save
      </button>

    </div>
  );
}

export default AddStudent;