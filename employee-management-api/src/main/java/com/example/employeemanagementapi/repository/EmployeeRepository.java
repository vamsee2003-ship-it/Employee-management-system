package com.example.employeemanagementapi.repository;

import com.example.employeemanagementapi.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}