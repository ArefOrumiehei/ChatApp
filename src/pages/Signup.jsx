import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth , db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

import { useState } from "react";

//Styles
import '../scss/Register.scss'

//Icons
import { IconPhotoPlus } from "@tabler/icons-react";

const Signup = () => {

    const navigate = useNavigate()

    const [error , setError] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()

        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            //Create user
            const response = await createUserWithEmailAndPassword(auth, email, password)
            
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                        break;
                        case 'running':
                            console.log('Upload is running');
                        break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    setError(true)
                    console.log('Error upload file', error)
                },
                () => {
                    // Handle successful uploads on complete
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                        await updateProfile(response.user , {
                            displayName ,
                            photoURL : downloadURL,
                        })
                        await setDoc(doc(db , "users", response.user.uid), {
                            uid : response.user.uid,
                            displayName ,
                            email,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc (db , 'userChats' , response.user.uid) , {})
                        navigate('/')
                    });
                }
            );


        }catch (error) {
            setError(true)
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="wrapper">
                <span className="logo">Aref Chat</span>
                <span className="title">Sign Up</span>
                <form onSubmit={submitHandler}>
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
                {error && <span>Something went error!</span>}
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;


// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if false;
//     }
//   }
// }