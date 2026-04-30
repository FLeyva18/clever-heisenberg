import { API_BASE_URL } from "./config";
import type Employee from "../types/employee";

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(`${API_BASE_URL}/empleados`);
  if (!response.ok) {
    throw new Error("Error fetching employees");
  }
  return await response.json();
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const response = await fetch(`${API_BASE_URL}/empleados/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching employee with id ${id}`);
  }
  return await response.json();
};

export const createEmployee = async (
  newEmployee: Employee,
): Promise<Employee> => {
  const response = await fetch(`${API_BASE_URL}/empleados`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEmployee),
  });
  if (!response.ok) {
    throw new Error(`Error creating employee}`);
  }
  return await response.json();
};

export const updateEmployee = async (
  id: number,
  updatedEmployee: Employee,
): Promise<Employee> => {
  const response = await fetch(`${API_BASE_URL}/empleados/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEmployee),
  });
  if (!response.ok) {
    throw new Error(`Error updating employee with id ${id}`);
  }
  return await response.json();
};

export const deleteEmployee = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/empleados/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Error deleting employee with id ${id}`);
  }
};
