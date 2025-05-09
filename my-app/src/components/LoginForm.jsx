import { useState } from "react"
import { Form, Button } from "react-bootstrap"

const users = {
    "me@gmail.com":"1234",
    "you@gmail.com":"666"
}

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
        if(users[email]==password){
            setValid(1)
            setEmail("")
            setPassword("")
            props.handleLoginClick()
        }
        else{
            setValid(-1)
        }
    }
    return <>
    <Form className="login-form" onSubmit={submitLogin}>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' name="email" value={email} onChange={(e) => { updateEmail(e.target.value) }} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' name="text" value={password} onChange={(e) => { updatePassword(e.target.value) }} />
        </Form.Group>
        <Button className="btn-login" type="submit">Log in</Button> <></>
    </Form>
    <h3>
        {valid == -1 && "Wrong password/email"}
        {valid == 0 && ""}
        {valid == 1 && "Valid Login"}
    </h3>
</>
}

export default LoginForm