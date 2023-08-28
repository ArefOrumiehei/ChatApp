import { Link } from "react-router-dom";

//Styles
import '../scss/Register.scss'

//Icons
import { IconPhotoPlus } from "@tabler/icons-react";

const Signup = () => {
    return (
        <div className="container">
            <div className="wrapper">
                <span className="logo">Aref Chat</span>
                <span className="title">Sign Up</span>
                <form>
                    <input type="text" placeholder="username" name="username" id="username" />
                    <input type="email" placeholder="email" name="email" id="email" />
                    <input type="password" placeholder="password" name="password" id="password" />
                    <label htmlFor="file" className="fileLabel">
                        <input style={{display : 'none'}} type="file" name="file" id="file" />
                        <IconPhotoPlus size={32}/>
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign Up</button>
                </form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;