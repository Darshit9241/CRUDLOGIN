import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee, updateEmployee, deleteEmployee } from "./slices/employeeSlice";
import { useNavigate } from "react-router-dom";

const Employee = () => {
    const employees = useSelector((state) => state.employees.list);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        position: "",
    });
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (editId) {
            dispatch(updateEmployee({ id: editId, updatedData: formData }));
        } else {
            dispatch(addEmployee({ id: Date.now(), ...formData }));
        }
        setFormData({ name: "", email: "", age: "", position: "" });
        setEditId(null);
        setShowModal(false);
    };

    const handleEdit = (emp) => {
        setFormData(emp);
        setEditId(emp.id);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteEmployee(id));
    };

    // Filter employees based on search
    const filteredEmployees = employees.filter((emp) => {
        const term = searchTerm.toLowerCase();
        return (
            emp.name.toLowerCase().includes(term) ||
            emp.email.toLowerCase().includes(term) ||
            emp.age.toString().includes(term)
        );
    });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Employee Management</h2>
                <button
                    className="bg-blue-500 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-600 transition-colors"
                    onClick={() => navigate("/employees/new")}
                // onClick={() => setShowModal(true)}
                >
                    ➕ Add Employee
                </button>
            </div>

            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Name, Email, or Age"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3 border p-2 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Employee List */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-xl">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Age</th>
                            <th className="py-3 px-4 text-left">Position</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">
                                    No Employees Found
                                </td>
                            </tr>
                        )}
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id} className="border-t hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4">{emp.name}</td>
                                <td className="py-3 px-4">{emp.email}</td>
                                <td className="py-3 px-4">{emp.age}</td>
                                <td className="py-3 px-4">{emp.position}</td>
                                <td className="py-3 px-4 flex gap-2">
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                                    // onClick={() => handleEdit(emp)}
                                    onClick={() => navigate(`/employees/${emp.id}/edit`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                                        onClick={() => handleDelete(emp.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-96 animate-fadeIn">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">
                            {editId ? "Edit Employee" : "Add Employee"}
                        </h3>

                        <div className="space-y-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Employee Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
                            />
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
                            />
                            <input
                                type="text"
                                name="position"
                                placeholder="Position"
                                value={formData.position}
                                onChange={handleChange}
                                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employee;
