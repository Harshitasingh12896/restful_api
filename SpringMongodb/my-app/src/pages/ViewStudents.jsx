import { useState, useEffect } from "react";
import {
  getAllStudents,
  deleteStudent,
  updateStudent
} from "../services/studentService";

import { toast } from "react-toastify";

function ViewStudents() {

  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  useEffect(() => {
    loadStudents();
  }, []);

  // Reset page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Load students
  const loadStudents = () => {
    setLoading(true);
    getAllStudents()
      .then(res => setStudents(res.data))
      .catch(() => toast.error("Failed to load students ❌"))
      .finally(() => setLoading(false));
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteStudent(id)
        .then(() => {
          toast.success("Deleted successfully ✅");
          loadStudents();
        })
        .catch(() => toast.error("Delete failed ❌"));
    }
  };

  // Start edit
  const startEdit = (student) => {
    setEditData(student);
    setShowModal(true);
  };

  // Input change
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  // Update
  const handleUpdate = () => {
    updateStudent(editData.id, editData)
      .then(() => {
        toast.success("Updated successfully ✅");
        setEditData(null);
        setShowModal(false);
        loadStudents();
      })
      .catch(() => toast.error("Update failed ❌"));
  };

  // 🔍 Filter (SAFE)
  const filteredStudents = students.filter((s) =>
    (s.studentname ?? "").toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination Logic
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-5">

      <h2 className="text-2xl mb-4 font-bold">Students List</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="🔍 Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full rounded shadow"
      />

      {/* 🟡 MODAL */}
      {showModal && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

          <div className="bg-white p-6 rounded shadow w-96">

            <h3 className="text-lg font-bold mb-4">Edit Student</h3>

            <input
              name="studentname"
              value={editData.studentname}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              placeholder="Name"
            />

            <input
              name="studentaddress"
              value={editData.studentaddress}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              placeholder="Address"
            />

            <input
              name="mobile"
              value={editData.mobile}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
              placeholder="Mobile"
            />

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-orange-500 text-white px-3 py-1 rounded"
              >
                Update
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ⏳ LOADING */}
      {loading ? (
        <p>Loading students...</p>
      ) : (

        <>
          <table className="w-full border text-center shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Address</th>
                <th className="p-2">Mobile</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentStudents.length > 0 ? (
                currentStudents.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="p-2">{s.id}</td>
                    <td className="p-2">{s.studentname}</td>
                    <td className="p-2">{s.studentaddress}</td>
                    <td className="p-2">{s.mobile}</td>

                    <td className="p-2">
                      <button
                        onClick={() => startEdit(s)}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(s.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3">
                    No matching students 🔍
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* 📄 PAGINATION */}
          <div className="flex justify-center mt-4 gap-2">

            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded"
            >
              Prev
            </button>

            <span className="px-3 py-1">
              Page {currentPage}
            </span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLast >= filteredStudents.length}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default ViewStudents;