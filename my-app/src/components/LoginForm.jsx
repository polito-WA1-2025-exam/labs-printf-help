import { useState } from "react"

function LoginForm(props){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [valid, setValid] = useState(false)

    const updateEmail = (newEmail) => {
        setEmail(newEmail)
    }

    const updatePassword = (newPassword) => {
        setPassword(newPassword)
    }

    const submitLogin = (e) => {
        e.preventDefault()
        
        
    }
}

export default LoginForm