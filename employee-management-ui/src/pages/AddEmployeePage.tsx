import { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box,
    Alert,
} from "@mui/material";
import { createEmployee } from "../services/employeeService";

function AddEmployeePage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        // Remove error when user starts correcting the field
        setErrors({
            ...errors,
            [name]: "",
        });

        setSuccessMessage("");
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone =
                "Phone number must contain exactly 10 digits";
        }

        if (!formData.department.trim()) {
            newErrors.department = "Department is required";
        }

        if (!formData.designation.trim()) {
            newErrors.designation = "Designation is required";
        }

        if (!formData.salary) {
            newErrors.salary = "Salary is required";
        } else if (Number(formData.salary) <= 0) {
            newErrors.salary = "Salary must be greater than zero";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        setSuccessMessage("");

        if (!validateForm()) {
            return;
        }

        try {
            await createEmployee({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                department: formData.department,
                designation: formData.designation,
                salary: Number(formData.salary),
            });

            setSuccessMessage(
                "Employee created successfully!"
            );

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                department: "",
                designation: "",
                salary: "",
            });

            setErrors({});
        } catch (error) {
            console.error(error);
            setErrors({
                submit: "Failed to create employee. Please try again.",
            });
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Add Employee
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Enter employee details below
                </Typography>

                {successMessage && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {successMessage}
                    </Alert>
                )}

                {errors.submit && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errors.submit}
                    </Alert>
                )}

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                    />

                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />

                    <TextField
                        fullWidth
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.department}
                        helperText={errors.department}
                    />

                    <TextField
                        fullWidth
                        label="Designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.designation}
                        helperText={errors.designation}
                    />

                    <TextField
                        fullWidth
                        label="Salary"
                        name="salary"
                        type="number"
                        value={formData.salary}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.salary}
                        helperText={errors.salary}
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
                            Add Employee
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default AddEmployeePage;