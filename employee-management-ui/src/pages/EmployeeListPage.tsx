import { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Alert,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { getAllEmployees } from "../services/employeeService";
import type { Employee } from "../types/employee";

function EmployeeListPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                const data = await getAllEmployees();
                setEmployees(data);
            } catch (error) {
                console.error(error);
                setError("Failed to load employees");
            } finally {
                setLoading(false);
            }
        };

        loadEmployees();
    }, []);

    return (
        <>
            {/* Header */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Employee Management Portal
                    </Typography>

                    <Button
                        color="inherit"
                        variant="outlined"
                        onClick={() => navigate("/employees/add")}
                    >
                        + Add Employee
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Employees
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Manage your employees
                </Typography>

                {/* Loading */}
                {loading && <CircularProgress />}

                {/* Error */}
                {error && <Alert severity="error">{error}</Alert>}

                {/* Employee Table */}
                {!loading && !error && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Department</TableCell>
                                    <TableCell>Designation</TableCell>
                                    <TableCell>Salary</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {employees.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center">
                                            No employees found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    employees.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell>{employee.id}</TableCell>

                                            <TableCell>
                                                {employee.firstName} {employee.lastName}
                                            </TableCell>

                                            <TableCell>{employee.email}</TableCell>

                                            <TableCell>{employee.phone}</TableCell>

                                            <TableCell>{employee.department}</TableCell>

                                            <TableCell>{employee.designation}</TableCell>

                                            <TableCell>₹{employee.salary}</TableCell>

                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() =>
                                                        navigate(`/employees/edit/${employee.id}`, {state:{employee}})

                                                    }
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
        </>
    );
}

export default EmployeeListPage;