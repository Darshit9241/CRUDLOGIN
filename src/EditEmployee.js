import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateEmployee } from "./slices/employeeSlice";

const EditEmployee = () => {
    const { id } = useParams();
    const numericId = useMemo(() => Number(id), [id]);
    const employee = useSelector((state) => state.employees.list.find((e) => e.id === numericId));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(() => ({
        name: employee?.name || "",
        email: employee?.email || "",
        age: employee?.age || "",
        position: employee?.position || "",
    }));

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!employee) return;
        dispatch(updateEmployee({ id: numericId, updatedData: formData }));
        navigate("/employees");
    };

    if (!employee) {
        return (
            <div className="p-6 max-w-xl mx-auto">
                <p className="text-red-600">Employee not found.</p>
                <button
                    className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition-colors"
                    onClick={() => navigate("/employees")}
                >
                    Back to Employees
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:border-blue-500"
                        required
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => navigate("/employees")}
                        className="px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEmployee;


