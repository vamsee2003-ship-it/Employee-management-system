import axios from "axios";
import type { Employee } from "../types/employee";

const API_URL = "http://localhost:8080/api/employees";

export const getAllEmployees = async (): Promise<Employee[]> => {
    const response = await axios.get<Employee[]>(API_URL);
    return response.data;
};

export const createEmployee = async (
    employee: Omit<Employee, "id">
): Promise<Employee> => {
    const response = await axios.post<Employee>(API_URL, employee);
    return response.data;
};

export const updateEmployee = async (
    id: number,
    employee: Omit<Employee, "id">
): Promise<Employee> => {
    const response = await axios.put<Employee>(
        `${API_URL}/${id}`,
        employee
);

    return response.data;

};