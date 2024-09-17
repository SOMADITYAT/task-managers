import React, { useState } from 'react';
import { Table, Container, Button, Form, Modal, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const TaskList = ({ tasks, onDelete, onToggleComplete, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const location = useLocation();
  const message = location.state?.message;

  const handleShowModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...selectedTask,
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
    };
    onUpdate(updatedTask);
    handleCloseModal();
  };

  return (
    <Container className="mt-5 px-3">
      <h2 className="text-center mb-4">Task List</h2>
      
     
      {message && <Alert variant="success">{message}</Alert>}
      
      {tasks.length === 0 ? (
        <Alert variant="info">No data found</Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Completed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.category}</td>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggleComplete(task.id)}
                    />
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      className="me-2 mb-1 mb-sm-0"
                      onClick={() => handleShowModal(task)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => onDelete(task.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

   
      {selectedTask && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateTask}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  defaultValue={selectedTask.title}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  defaultValue={selectedTask.description}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  defaultValue={selectedTask.category}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Update Task
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default TaskList;
