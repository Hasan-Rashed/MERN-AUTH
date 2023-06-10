import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // initialize navigate hook and dispatch hook
    const navigate = useNavigate();
    const dispatch = useDispatch();

/* `const [login, { isLoading }] = useLoginMutation();` is using the `useLoginMutation` hook from the `usersApiSlice` to create a `login` function and a `isLoading` boolean variable. The `login` function can be used to make a
POST request to the server to log in the user with the provided email and password. The `isLoading` variable is used to track whether the login request is currently in progress. */
    const [login, { isLoading }] = useLoginMutation(); // we can call the function anything instead of login.

    // get the user data or the `userInfo` state from the Redux store. if userInfo is not null, then the user is already logged in and we can redirect them to the home page.
    const { userInfo } = useSelector((state) => state.auth); // auth is the part of our state we want, auth is the  slice. it consists userInfo.

    useEffect(() => {
        // if the user is already logged in, redirect to the home page
        if(userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]); //  useEffect will run when navigate or userInfo changes. navigate and userInfo are the dependencies of useEffect hook.

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            // res is the response which is user,  we get from the server after logging in the user. we can use the response to get the user data and save it in the Redux store.
            const res = await login({ email, password }).unwrap(); // email and pass are data coming from the form

            // set the res data to the local storage into our state using setCredentails action
            dispatch(setCredentials({...res})) // ...res is the spread operator which will spread the res data into the object. setting user data to local storage into our state.
            navigate('/');
        } catch (err) {
            console.log(err?.data?.message || err.error);
            alert(err?.data?.message || err.error); // ? after err is optional chaining. if err.data is not there then it will not throw error.
        }
    }
    
  return (
    <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler} >
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

            <Button type='submit' variant='primary' className="mt-3" >
                Sign In
            </Button>

            <Row className="py-3">
                <Col>
                    New Customer? <Link to='/register' >Register</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default LoginScreen