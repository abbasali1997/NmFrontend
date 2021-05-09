import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import auth from '../Auth';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    
    logout = () => {
        localStorage.clear();
        auth.logout(() => {
            window.location.reload(false);
        });
        this.setState( {
            username: ''
        });
    }

    componentDidMount() {
        if(localStorage.getItem('token') && localStorage.getItem('user')) {
            const token = JSON.parse(localStorage.getItem('token'));
            if (token) {
                this.setState({
                    username: JSON.parse(localStorage.getItem('user')).username
                })
            }
        }
    }

    render() {
        const profile = (this.state.username)
            ? (<li className="nav-item dropdown">
                <a className="nav-link p-0" href="#" id="navbarDropdown" role="button"
                   data-bs-toggle="dropdown" aria-expanded="false">
                    <h5 id='profileLink' className='m-0'><i className="fas fa-user"></i> {this.state.username}</h5>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li onClick={this.logout} style={{cursor: 'pointer'}}>
                        <div className="dropdown-item d-flex justify-content-between"><div>Sign Out</div><div><i className="fas fa-sign-out-alt"></i></div></div>
                    </li>
                </ul>
            </li>)
            : (<NavLink exact to="/login"><h5 id='profileLink' className='m-0'><i className="fas fa-user"></i> Sign In</h5></NavLink>)
        return (
            <div id='topPanel' className='container mx-0 mb-5'>
                <div id='brand'>
                    <NavLink exact to="/">NeuroMonia</NavLink>
                </div>
                <nav className="navbar navbar-light">
                    <div className="container justify-content-start">
                        { profile }
                        <form className="d-flex ms-5">
                            <input id = 'searchBar' className="form-control me-2" type="search" placeholder="Search Record" aria-label="Search"></input>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;