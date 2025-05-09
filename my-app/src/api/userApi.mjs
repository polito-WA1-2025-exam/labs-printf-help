const URI = "http://localhost:3000/api/user"

async function authenticateUser (identifier, password) {
    const response = await fetch(`${URI}/authenticate?identifier=${identifier}&password=${password}`)
    if (response.status == 200)
        return true
    else
        return false
}

export {authenticateUser}