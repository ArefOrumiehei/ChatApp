import { Link } from "react-router-dom";

//Styles
import '../scss/Register.scss'


const Login = () => {
    return (
        <div className="container">
            <div className="wrapper">
                <span className="logo">Aref Chat</span>
                <span className="title">Login</span>
                <form>
                    <input type="email" placeholder="email" name="email" id="email" />
                    <input type="password" placeholder="password" name="password" id="password" />
                    <button>Login</button>
                </form>
                <p>Already have not an account? <Link to='/signup'>Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;