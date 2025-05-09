import dayjs from "dayjs";

export class User {
    constructor(username, email, password, creationDate) {
        this.username = username; // Username of the user
        this.email = email; // Email of the user
        this.password = password; // Password of the user
        this.creationDate = creationDate ? creationDate : dayjs().format('YYYY-MM-DD'); // Date of the user creation if not passed is automaticcally assigne as current daye
    }

    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getCreationDate() {
        return this.creationDate;
    }

    setUsername(username) {
        this.username = username;
    }

    setEmail(email) {
        this.email = email;
    }

    setPassword(password) {
        this.password = password;
    }

    setCreationDate(creationDate) {
        this.creationDate = creationDate;
    }

    displayInfo () {
        console.log("Hello :D: ");
        console.log('Username: ' + this.username);
        console.log('Email: ' + this.email);
        console.log('Password ' + this.password);
        console.log('Creation Date: ' + this.creationDate);
    }
}