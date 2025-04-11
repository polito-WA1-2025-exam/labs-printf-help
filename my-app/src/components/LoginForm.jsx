import { useState } from "react"
import { Form, Button } from "react-bootstrap"

function LoginForm(props){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [valid, setValid] = useState(0)

    const updateEmail = (newEmail) => {
        setEmail(newEmail)
    }

    const updatePassword = (newPassword) => {
        setPassword(newPassword)
    }

    const submitLogin = (e) => {
        e.preventDefault()
        
        // login check e cambio in vaid
        if(props.users[email]==password){
            setValid(1)
            setEmail("")
            setPassword("")
        }
        else{
            setValid(-1)
        }
    }
    return <>
    <h3>Login Form</h3>
    <Form onSubmit={submitLogin}>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' name="email" value={email} onChange={(e) => { updateEmail(e.target.value) }} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type='text' name="text" value={password} onChange={(e) => { updatePassword(e.target.value) }} />
        </Form.Group>
        <Button variant="primary" type="submit">Log in</Button> <></>
    </Form>
    <h3>
        {valid == -1 && "Wrong password/email"}
        {valid == 0 && ""}
        {valid == 1 && "Valid Login"}
    </h3>
</>
}

export default LoginForm