import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [isLead, setIsLead] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/employees');
      setEmployees(response.data);
      console.log("qqqqqqqqqqqqqqqqqqqqqqqq")
      console.log(response)
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const createEmployee = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/employees', {
        name,
        designation,
        email,
        is_lead: isLead,
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.designation} - {employee.email} - {employee.is_lead ? 'Lead' : 'Not Lead'}
          </li>
        ))}
      </ul>

      <h2>Create Employee</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        createEmployee();
      }}>
        <label>Name: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Designation: </label>
        <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} required />

        <label>Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Is Lead: </label>
        <input type="checkbox" checked={isLead} onChange={(e) => setIsLead(e.target.checked)} />

        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default EmployeeComponent;
