import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function CreateRunForm() {
  // Define state variables for distance and duration
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');
  
      // Make a POST request with the user input and token in the headers
      const response = await axios.post(
        'http://localhost:3001/exercise/newrun',
        {
          distance: parseFloat(distance),
          duration: parseInt(duration),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
  
      if (response.status === 200) {
        console.log(response.status);
        setDistance('');
        setDuration('');
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here if needed
    }
  };

  return (
    <div className="container flex justify-center align-center vh-100 bg-dark text-light">
      <div className="w-50 p-4 rounded">
        <h2 className="text-center mb-4">Create Run</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Distance (in meters)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter distance"
              value={distance} // Bind to the state variable
              onChange={(e) => setDistance(e.target.value)} // Update the state on change
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duration (in minutes)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter duration"
              value={duration} // Bind to the state variable
              onChange={(e) => setDuration(e.target.value)} // Update the state on change
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateRunForm;
