import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const TaskEdit = ({ tasks, onUpdate }) => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((task) => task.id === Number(taskId));

  const [updatedTask, setUpdatedTask] = useState({
    title: '',
    description: '',
    category: ''
  });

  useEffect(() => {
    if (task) {
      setUpdatedTask({
        title: task.title,
        description: task.description,
        category: task.category
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ id: task.id, ...updatedTask });
    navigate('/tasks');
  };

  if (!task) {
    return <p>Task not found</p>;
  }

  return (
    <Container>
      <h2>Edit Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTaskTitle">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter task title"
            value={updatedTask.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTaskDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            placeholder="Enter task description"
            value={updatedTask.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formTaskCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            placeholder="Enter task category"
            value={updatedTask.category}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Task
        </Button>
      </Form>
    </Container>
  );
};

export default TaskEdit;
