import 'bootstrap/dist/css/bootstrap.min.css'
import './theme.css'
import {Navbar, Container, Nav, Form, Row, Col, Button, Card} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import { Tasks } from './components/tasks';
import { supabase } from './client'

function App() { // https://www.svgbackgrounds.com/ used this for my background

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [tasks, setTasks] = useState([])
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)
  const [activities, setActivities] = useState([])
  const [randomActivity, setRandomActivity] = useState(null)


  const handleSubmit = event => { // https://bobbyhadz.com/blog/react-get-input-value#get-the-value-of-an-input-field-using-a-ref-in-react used this to input name and relay as message
    event.preventDefault()

    const firstName = event.target.first_name.value

    setMessage(`Hi there, ${firstName}!`)

    event.target.reset()
    setShow(!show)
  }

  async function getActivities() { // https://stackoverflow.com/questions/62709706/how-do-i-get-a-random-element-from-an-array-when-a-button-is-clicked used this for randomized button
    const { data, error} = await supabase
      .from('media')
      .select("*")
    setActivities(data)
    let randomItem = Math.floor(Math.random()*(data.length))
    setRandomActivity(data[randomItem])
  }

// https://stackoverflow.com/questions/37239799/can-not-submit-form-react-bootstrap used this for form submission
// https://stackoverflow.com/questions/60883868/how-to-replace-a-form-with-a-component-after-submit used this for making the rest of the webiste pop up after form submission
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
          <Tasks/>
        </Col>
        <Card className = "col-md-6">
          <Card.Body>
            <Col>
              <Button onClick = {getActivities} className = "d-block mx-auto">Want something to do? Click me!</Button>
              {randomActivity && 
                <>
                <img className = "d-block mx-auto my-5" 
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
  )
}
export default App