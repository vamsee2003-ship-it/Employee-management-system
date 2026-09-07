package com.example.employeemanagementapi.service;

import com.example.employeemanagementapi.dto.EmployeeRequest;
import com.example.employeemanagementapi.dto.EmployeeResponse;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse createEmployee(EmployeeRequest request);

    EmployeeResponse updateEmployee(Long id, EmployeeRequest request);

    List<EmployeeResponse> getAllEmployees();
}