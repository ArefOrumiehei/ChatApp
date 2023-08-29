import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

//Styles
import '../scss/Register.scss'
import { useState } from "react";
import { auth } from "../firebase";


const Login = () => {

    const navigate = useNavigate()

    const [error , setError] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()

        const email = e.target[0].value
        const password = e.target[1].value

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        }catch (error) {
            setError(true)
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="wrapper">
                <span className="logo">Aref Chat</span>
                <span className="title">Login</span>
                <form onSubmit={submitHandler}>
                    <input type="email" placeholder="email" name="email" id="email" />
                    <input type="password" placeholder="password" name="password" id="password" />
                    <button>Login</button>
                </form>
                {error && <span>Something went error!</span>}
                <p>Already have not an account? <Link to='/signup'>Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;