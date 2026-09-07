import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box,
} from "@mui/material";

import { updateEmployee } from "../services/employeeService";
import type { Employee } from "../types/employee";

function EditEmployeePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const employee = location.state?.employee as Employee;

    const [formData, setFormData] = useState({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        designation: employee.designation,
        salary: employee.salary.toString(),
    });

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        try {
            await updateEmployee(employee.id, {
                ...formData,
                salary: Number(formData.salary),
            });

            alert("Employee updated successfully!");

            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Failed to update employee");
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Edit Employee
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Update employee details
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Salary"
                        name="salary"
                        type="number"
                        value={formData.salary}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <Box
                        sx={{
                            mt: 3,
                            display: "flex",
                            gap: 2,
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Update Employee
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default EditEmployeePage;