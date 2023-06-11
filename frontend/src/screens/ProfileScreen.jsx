import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap'
import FormContainer from "../components/FormContainer";
import { toast } from 'react-toastify';
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from '../slices/usersApiSlice'



const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // initialize navigate hook and dispatch hook
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // checking state has changed or not
    console.table([name, email, password, confirmPassword])


    // get the user data or the `userInfo` state from the Redux store. if userInfo is not null, then the user is already logged in and we can redirect them to the home page.
    const { userInfo } = useSelector((state) => state.auth); // auth is the part of our state we want, auth is the  slice. it consists userInfo.


    const [updateProfile, { isLoading }] = useUpdateUserMutation(); // updateProfile is the function that will be used to make the POST request to the server to update the user profile. isLoading is a boolean that will be true when the request is being made and false when the request is complete.


    // checking state has changed or not after getting data from redux store
    console.table([name, email, password, confirmPassword])
    
    useEffect(() => {
        setName(userInfo.name); // userInfo is the user data we get from the server after logging in the user. we can use the response to get the user data and save it in the Redux store.
        setEmail(userInfo.email); // userInfo is the user data we get from the server after logging in the user. we can use the response to get the user data and save it in the Redux store.
    }, [userInfo.name, userInfo.email]);

    
    // `submitHandler` is an async function that will be called when the form is submitted. It will make a POST request to the server to register the user with the provided name, email, and password.
    const submitHandler = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            toast.error('Passwords does not match');
        }else{
            try {
                const res = await updateProfile({
                    _id: userInfo._id, // userInfo is the user data we get from the server after logging in the user.
                    name, // name is the local state we have created above
                    email, // name is the local state we have created above
                    password // name is the local state we have created above
                }).unwrap(); 

                dispatch(setCredentials({...res})); // dispatch the action to save the user data in the Redux store.
                toast.success('Profile Updated Successfully');
                
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    
  return (
    <FormContainer>
        <h1>Update Profile</h1>

        <Form onSubmit={submitHandler} >
            <Form.Group className="my-2" controlId="name" >
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email" >
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            
            <Form.Group className="my-2" controlId="password" >
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            
            <Form.Group className="my-2" controlId="confirmPassword" >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            {isLoading && <Loader />}

            <Button type='submit' variant='primary' className="mt-3" >
                Update
            </Button>

        </Form>
    </FormContainer>
  )
}

export default ProfileScreen;