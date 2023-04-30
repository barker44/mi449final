import {Form, Row, Col, Button, Card} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import TaskCard from '../taskCard'
import { supabase } from '../client'

export function Tasks() {

	const [name, setName] = useState("")
	const [description, setDescription] = useState("")

	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		getTasks();
	}, [])

	async function getTasks(){
		const { data, error } = await supabase
		.from("tasks")
		.select("*")

		if (error) {
			throw error;
		} else {
			if(data) setTasks(data);
		}
	}

	async function createTask(){
		try {
			const { data, error } = await supabase
			.from("tasks")
			.insert({
				name: name,
				description: description
			})
			.single()

			if (error) throw error
				getTasks()
		} catch (error) {
			alert(error.message)
		}
	}
// https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y <- used this to figure out scrolling
return (
	<>
		<Card className = "col-md-12">
			<Card.Body>
				<h3>Create Task</h3>
				<Form.Label>Task Name</Form.Label>
				<Form.Control
					type ="text"
					id = "name"
					onChange={(e) => setName(e.target.value)}
				/>
				<Form.Label>Description</Form.Label>
				<Form.Control
					type ="text"
					id = "description"
					onChange={(e) => setDescription(e.target.value)}
				/>

				<Button onClick ={() => createTask()}>Create Task</Button>
				<h3>Current Tasks</h3>
				<Row style={{maxHeight: '50vh',
			overflowY: "auto"}}> 
<Col>
                {tasks.map((task, index) => (
                    <TaskCard key={index} task = {task} update={getTasks}/>
                ))}
 </Col>
 </Row>
			</Card.Body>
		</Card>
	</>
	)
}