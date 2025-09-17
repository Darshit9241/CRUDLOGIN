import { createSlice } from "@reduxjs/toolkit";

const loadEmployees = () => {
  const saved = localStorage.getItem("employees");
  return saved ? JSON.parse(saved) : [];
};

const saveEmployees = (employees) => {
  localStorage.setItem("employees", JSON.stringify(employees));
};

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: loadEmployees(),
  },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
      saveEmployees(state.list);
    },
    updateEmployee: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.list.findIndex((emp) => emp.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updatedData };
        saveEmployees(state.list);
      }
    },
    deleteEmployee: (state, action) => {
      state.list = state.list.filter((emp) => emp.id !== action.payload);
      saveEmployees(state.list);
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
