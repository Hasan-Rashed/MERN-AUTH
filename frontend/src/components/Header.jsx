import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice'

const Header = () => {
    // get the user data or the `userInfo` state from the Redux store. if userInfo is not null, then the user is already logged in and we can redirect them to the home page.
    const { userInfo } = useSelector(state => state.auth);

    // initialize the `useDispatch` hook and useNavigate hook
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // logoutApiCall is the logout mutation function that we can call to logout the user
    const [logoutApiCall] = useLogoutMutation(); // useLogoutMutation is a hook that returns an array of functions. The first function is the logout mutation function that we can call to logout the user.
    
    // logout handler
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap(); // make request and destroy the cookie
            dispatch(logout()); // dispatch the logout action to clear the local storage
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    
return (
    <header>
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
        <LinkContainer to='/' >
            <Navbar.Brand>MERN App</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
            {/* if userInfo exists, which is logged in show something other show something else */}
            { userInfo ? (
                <>
                    <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                            <NavDropdown.Item>
                                Profile
                            </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
                    </NavDropdown>
                </>
            ) : (
                <>
                    <LinkContainer to='/login'>
                    <Nav.Link>
                        <FaSignInAlt /> Sign In
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/register'>
                    <Nav.Link>
                        <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                </LinkContainer>
                </>
            ) }
            
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    </header>
);
};

export default Header;