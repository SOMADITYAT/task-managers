import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Login from './pages//Login';
import Register from './pages//Register';
import TaskList from './components//TaskList';
import TaskForm from './components//TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Task Manager</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href="/tasks">Tasks</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="mt-5">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={
            <>
              <TaskForm onAdd={addTask} />
              <TaskList
                tasks={tasks}
                onDelete={deleteTask}
                onToggleComplete={toggleComplete}
                onUpdate={updateTask}
              />
            </>
          } />
          <Route path="/" element={<Login />} /> {/* Default route */}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
