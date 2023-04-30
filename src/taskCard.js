import {Row, Col, Card, Button, Form} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { supabase } from './client'
import getTasks from './App'

function TaskCard(props){ // used this video as a tutorial and inspiration for tasks/taskcard: https://www.youtube.com/watch?v=4yVSwHO5QHU

    const task = props.task;

    const [ editing, setEditing ] = useState(false)
    const [name, setName] = useState(task.name)
    const [description, setDescription] = useState(task.description)

    async function updateTask() {
        const { data, error } = await supabase
        .from("tasks")
        .update({
            name: name,
            description: description
        })
        .eq("id", task.id);

        setEditing(false);
        props.update();
    }

    async function deleteTask(){

        const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", task.id);

        props.update();
    }

    return (
        <>
            <Card className="mb-2"> 
                <Card.Body>
                    {!editing &&
                        <>
                            <Card.Title>{task.name}</Card.Title>
                            <Card.Text>{task.description}</Card.Text>
                        </>
                    }
                    {editing && 
                        <>
                            <h4> Editing Task </h4>
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                                type ="text"
                                id = "name"
                                defaultValue = {task.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type ="text"
                                id = "description"
                                defaultValue = {task.description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </>
                    }
                </Card.Body>
                <Card.Footer>
                {!editing &&
                    <Row>
                        <Col>
                            <Button variant='outline-dark' className="w-100" size = "sm" onClick = {() => setEditing(true)}>Edit</Button>
                        </Col>
                        <Col>
                            <Button variant='outline-danger' className="w-100" size = "sm" onClick = {() => deleteTask()}>Delete</Button>
                        </Col>
                    </Row>
                }
                {editing &&
                    <Row>
                        <Col>
                            <Button variant='danger' className="w-100" size = "sm" onClick = {()=> setEditing(false)}>Cancel</Button>
                        </Col>
                        <Col>
                            <Button variant='primary' className="w-100" size = "sm" onClick = {() => updateTask()}>Update Task</Button>
                        </Col>
                    </Row>
                }
                </Card.Footer>
            </Card>
        </>
    )
}

export default TaskCard;