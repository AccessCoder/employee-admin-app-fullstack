package de.mpagels.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Data
@Service
@AllArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final IdService idService;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee addEmployee(Employee employee)  {
       return employeeRepository.save(employee.withId(idService.generateId()));
    }

    public Employee removeEmployee(String id) throws EmployeeDoesNotExistException {
        if (!employeeRepository.existsById(id)) {
            throw new EmployeeDoesNotExistException("Employee does not exists");
        }
        Employee removedEmployee = employeeRepository.findById(id).orElseThrow(
                () -> new EmployeeDoesNotExistException("No User with ID: " + id + " found. Please try again"));
        employeeRepository.deleteById(id);
        return removedEmployee;
    }

    public Employee updateEmployee(String id, Employee employee) throws EmployeeDoesNotExistException, EmployeeAlreadyExistException {
        boolean containsNotEmployee = !employeeRepository.existsById(id);
        if (containsNotEmployee) {
            throw new EmployeeDoesNotExistException("Employee does not exists");
        }
        Employee updatedEmployee = employeeRepository.save(employee);
        return updatedEmployee;
    }

    public Employee getEmployeeById(String id) throws EmployeeDoesNotExistException {
        return employeeRepository.findById(id).orElseThrow(
                () -> new EmployeeDoesNotExistException("Employee does not exists"));
    }
}
