import React, { Component } from 'react';
import axios from 'axios';
import '../styles/login.css';
import {NavLink} from "react-router-dom";

const API = '/api/auth/';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            login: false,
            store: null
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API}/login`, {
            email: this.state.email,
            password: this.state.password,
        }).then(res => {
            console.log(res.data);
            return res.data;
        }).then(data => {
            console.log(data);
            if (data.success) {
                localStorage.setItem('token', JSON.stringify(data.token));
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location = '/';
            } else {
                this.setState({ error: data.msg })
            }
        }).catch(err => {
            console.log(err);
        })
        this.setState({
            email: '',
            password: '',
        });
    }

    render() {
        const alert = (this.state.error)
            ? (<div id="alertMessage">
                <div className="alert alert-danger w-50 m-auto" role="alert">
                    {this.state.error}
                </div>
            </div>) : null;
        return (
            <div className='container-fluid p-0 m-0 d-flex align-items-center' style={{height: '100vh'}}>
                {alert}
                <form id="loginForm" className='w-25 m-auto' onSubmit={this.handleSubmit}>
                    <h1 className='text-center mb-4'>Sign In</h1>
                    <div className="mb-3">
                        <div className="loginInputGroup input-group flex-nowrap mb-4">
                            <span className="loginInputLogo input-group-text" id="addon-wrapping"><i className="fas fa-at"></i></span>
                            <input type="text"
                                   className="loginFormControl form-control"
                                   placeholder="Email Address"
                                   aria-label="Email"
                                   aria-describedby="addon-wrapping"
                                   name='email'
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="loginInputGroup input-group flex-nowrap mb-4">
                            <span className="loginInputLogo input-group-text" id="addon-wrapping"><i className="fas fa-lock"/></span>
                            <input type="password"
                                   className="loginFormControl form-control"
                                   id="exampleInputPassword1"
                                   placeholder='Password'
                                   name='password'
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-info w-100 d-block mb-4">Login</button>
                    <div className="row mb-4">
                        <div className="col-5">
                            <hr/>
                        </div>
                        <div className="col-2 text-center" style={{color: 'rgba(255,255,255,0.25)'}}>
                            <i>OR</i>
                        </div>
                        <div className="col-5">
                            <hr/>
                        </div>
                    </div>
                    <NavLink exact to="/register"><button type="button" className="btn btn-outline-secondary w-100 d-block mb-4">Register</button></NavLink>
                </form>
            </div>
        )
    }
}

export default Login;
