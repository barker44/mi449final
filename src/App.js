import 'bootstrap/dist/css/bootstrap.min.css';
import './theme.css';
import {Navbar, Container, Nav, Form, Row, Col, Button, Card} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import TaskCard from './taskCard'
import { supabase } from './client'

function App() {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [tasks, setTasks] = useState([])
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)
  const [activities, setActivities] = useState([])
  const [randomActivity, setRandomActivity] = useState(null)


  const handleSubmit = event => { // https://bobbyhadz.com/blog/react-get-input-value#get-the-value-of-an-input-field-using-a-ref-in-react
    event.preventDefault()

    const firstName = event.target.first_name.value

    setMessage(`Hi there, ${firstName}!`);
    localStorage.setItem("name_val4", firstName); //

    event.target.reset()
    setShow(!show)
  }

  useEffect(() => {
    getTasks();
  }, [])

  useEffect(() => {
    setMessage(`Hi there, ${localStorage.getItem("name_val4")}!`); // https://blog.logrocket.com/using-localstorage-react-hooks/
    setShow(!show)
  }, []);

  async function getActivities() { // https://stackoverflow.com/questions/62709706/how-do-i-get-a-random-element-from-an-array-when-a-button-is-clicked
    const { data, error} = await supabase
      .from('media')
      .select("*")
    setActivities(data)
    let randomItem = Math.floor(Math.random()*(data.length));
    setRandomActivity(data[randomItem]);
  }

  async function getTasks(){
    try {
      const { data, error } = await supabase
      .from("tasks")
      .select("*")
    if (error) throw error;
    if (data != null){
      setTasks(data);
    }
    } catch (error) {
      alert(error.message);
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

    if (error) throw error;
    window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }
// https://stackoverflow.com/questions/37239799/can-not-submit-form-react-bootstrap 
// https://stackoverflow.com/questions/60883868/how-to-replace-a-form-with-a-component-after-submit
  return (
    <>
    <Navbar>
      <Container>
        <Navbar.Brand>Personal Activity Dashboard</Navbar.Brand>
      </Container> 
    </Navbar>
    <Container>
      <Row>
        <Col md = {{ span: 4, offset: 4 }} lg = {{ span: 8, offset: 2 }}>
        <Card className = "col-md-6 mx-auto mb-2" >
          <Card.Body >
    {!show && (
    <form onSubmit = {handleSubmit} className = "col-md-10"> 
      <Form.Label>What's your name?</Form.Label>
      <Form.Control
      type = "text"
      id = "first_name"
      />
      <Button type = "submit">Enter</Button>
      </form>
      )}
      <h2 className = "text-center">{message}</h2>
      </Card.Body>
      </Card>
      </Col>
      </Row>
      {message && (
      <Row>
        <Col>
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
        <br></br>
        <Button onClick ={() => createTask()}>Create Task</Button>
        <h3>Current Tasks</h3>
        {tasks.map((task) => (
        <Col>
        <TaskCard task = {task}/>
        </Col>
        ))}
        </Card.Body>
        </Card>
      </Col>
      <Card className = "col-md-6">
        <Card.Body>
      <Col>
      <Button onClick = {getActivities} className = "d-block mx-auto">Want something to do? Click me!</Button>
        {randomActivity && 
        <>
            <img className = "d-block mx-auto"
            src = {randomActivity.img_url}
            alt = {randomActivity.alt_txt}
            style = {{
              width: '300px',
              height: '450px'
            }}/>
            <Button size = "sm" className = "d-block mx-auto"><a href = {randomActivity.source_link} target="_blank">Image Source</a></Button>
            <h1 className = "text-center">{randomActivity.title}</h1>
            <h2 className = "text-center">{randomActivity.media_type}</h2>
            </>
        }

        
        </Col>
        </Card.Body>
        </Card>
      </Row>
      )}
    </Container>
    
    </>
  );
}

export default App;