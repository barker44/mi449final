import {Card, Button, Form} from 'react-bootstrap'
import { useState } from 'react'
import { supabase } from './client'

function TaskCard(props){ // used this video as a tutorial and inspiration: https://www.youtube.com/watch?v=4yVSwHO5QHU
    const task = props.task;

    const [ editing, setEditing ] = useState(false)
    const [name, setName] = useState(task.name)
    const [description, setDescription] = useState(task.description)

    async function updateTask(){
        try {
            const { data, error } = await supabase
            .from("tasks")
            .update({
              name: name,
              description: description
            })
            .eq("id", task.id)
      
          if (error) throw error;
          window.location.reload();
          } catch (error) {
            alert(error.message);
          }
    }

    async function deleteTask(){
        try {
            const { data, error } = await supabase
            .from("tasks")
            .delete()
            .eq("id", task.id)
      
          if (error) throw error;
          window.location.reload();
          } catch (error) {
            alert(error.message);
          }
    }

    return (
        <Card style={{width:"18rem"}}> 
            <Card.Body>
                {editing == false ?
                <>
                <Card.Title>{task.name}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Button variant='outline-dark' size = "sm" onClick = {() => setEditing(true)}>Edit</Button>
                <Button variant='outline-danger' size = "sm" onClick = {() => deleteTask()}>Delete</Button>
                </>
            :
                <>
                <h4> Editing Task </h4>
                <Button size='m' onClick = {()=> setEditing(false)}>Go Back</Button>
                <br></br>
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
            <br></br>
            <Button onClick = {() => updateTask()}>Update Task</Button>
                </>
            }   
            </Card.Body>
        </Card>
    )
}

export default TaskCard;