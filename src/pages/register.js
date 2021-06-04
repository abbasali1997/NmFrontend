import React, { Component } from 'react';
import '../styles/register.css';
import axios from 'axios';
import auth from '../Auth';

const validEmailRegex = RegExp(
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
);
const number = RegExp(/^[0-9]*$/i);
const nameReg = RegExp(/^[a-z ,.'-]+$/i);
const usernameReg = RegExp(/^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i);

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: '',
            error: '',
            errors: {
                username: '',
                city: '',
                country: '',
                email: '',
                rePassword: '',
                phoneNumber: '',
            },
            username: '',
            address: '',
            city: '',
            country: '',
            email: '',
            password: '',
            rePassword: '',
            phoneNumber: '',
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const errors = { ...this.state.errors };
        switch (name) {
            case 'username':
                errors.username = (usernameReg.test(value))
                    ? ''
                    : 'Username should be alpha-numeric';
                break;
            case 'city':
                errors.city = (nameReg.test(value))
                    ? ''
                    : 'City can not contain a number or a symbol';
                break;
            case 'country':
                errors.country = (nameReg.test(value))
                    ? ''
                    : 'Country can not contain a number or a symbol';
                break;
            case 'email':
                errors.email = validEmailRegex.test(value)
                    ? ''
                    : 'Invalid e-mail address';
                break;
            case 'rePassword':
                errors.rePassword = (this.state.password === value)
                    ? ''
                    : 'Passwords do not match';
                break;
            case 'phoneNumber':
                errors.phoneNumber = !(number.test(value))
                    ? 'Invalid phone number'
                    : (value.length !== 11)
                        ? 'Number should be of exact 11 digits'
                        : '';
                break;
            default:
                break;
        }
        this.setState({ errors, [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const signUpBtn = document.querySelector('#signUpBtn');
        signUpBtn.innerHTML = '<div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span></div>';
        const input = {
            username: this.state.username,
            password: this.state.password,
            address: this.state.address,
            city: this.state.city,
            country: this.state.country,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,

        }
        axios.post('/api/auth/register', input)
        .then(res => res.data)
        .then(data => {
            if (data.success) {
                const { userData } = data;
                auth.login(() => {               
                    localStorage.setItem('token', JSON.stringify(userData.token));
                    localStorage.setItem('user', JSON.stringify(userData.user));
                });
                this.setState({ success: 'Successfully registered a new user' });
                setTimeout(() => {
                    this.props.history.push('/');
                }, 1500);
            } else {
                this.setState({ error: 'Could not register user!' });
            }
        })
    }

    render() {
        const error = (this.state.error)
            ? (<div id="alertMessage">
                <div className="alert alert-danger w-50 m-auto" role="alert">
                    {this.state.error}
                </div>
            </div>) : null;
        const success = (this.state.success)
            ? (<div id="alertMessage">
                <div className="alert alert-success w-50 m-auto" role="alert">
                    {this.state.success}
                </div>
            </div>) : null;
        const errors = this.state.errors;
        const errorStyle = { borderColor: 'red' };
        return (
            <div className="container d-flex align-items-center" style={{ height: '100vh' }}>
                {error}
                {success}
                <form className="row g-3 w-50 m-auto" onSubmit={this.handleSubmit}>
                    <h1 className='text-center mb-4'>Register</h1>
                    <div className="col-12 mb-4">
                        <input type="text"
                            required
                            name='username'
                            className="registerInput form-control"
                            id="inputUsername"
                            placeholder='Username'
                            onChange={this.handleChange}
                            style={(errors.username.length > 0) ? (errorStyle) : {}} />
                        {errors.username.length > 0 && <span className='error'><i class="fas fa-exclamation me-1"></i>{errors.username}</span>}
                    </div>
                    <div className="col-md-6 mb-4">
                        <input type="email"
                            required
                            name='email'
                            className="registerInput form-control"
                            id="inputEmail4"
                            placeholder='Email Address'
                            onChange={this.handleChange}
                            style={(errors.email.length > 0) ? (errorStyle) : {}} />
                        {errors.email.length > 0 && <span className='error'><i class="fas fa-exclamation me-1"></i>{errors.email}</span>}
                    </div>
                    <div className="col-md-6 mb-4">
                        <input type="text"
                            required
                            name='phoneNumber'
                            className="registerInput form-control"
                            id="inputPhone"
                            placeholder='Phone Number'
                            onChange={this.handleChange}
                            style={(errors.phoneNumber.length > 0) ? (errorStyle) : {}} />
                        {errors.phoneNumber.length > 0 && <span className='error'><i class="fas fa-exclamation me-1"></i>{errors.phoneNumber}</span>}
                    </div>
                    <div className="col-md-6 mb-4">
                        <input type="password"
                            required
                            name='password'
                            className="registerInput form-control"
                            id="inputPassword4"
                            placeholder='Password'
                            onChange={this.handleChange} />
                    </div>
                    <div className="col-md-6 mb-4">
                        <input type="password"
                            required
                            name='rePassword'
                            className="registerInput form-control"
                            id="inputRePassword"
                            placeholder='Confirm Password'
                            onChange={this.handleChange}
                            style={(errors.username.length > 0) ? (errorStyle) : {}} />
                        {errors.rePassword.length > 0 && <span className='error'><i class="fas fa-exclamation me-1"></i>{errors.rePassword}</span>}
                    </div>
                    <div className="col-12 mb-4">
                        <input type="text"
                            required
                            name='address'
                            className="registerInput form-control"
                            id="inputAddress"
                            placeholder="Address"
                            onChange={this.handleChange} />
                    </div>
                    <div className="col-md-6 mb-4">
                        <input type="text"
                            required
                            name='city'
                            className="registerInput form-control"
                            id="inputCity"
                            placeholder='City'
                            onChange={this.handleChange}
                            style={(errors.city.length > 0) ? (errorStyle) : {}} />
                        {errors.city.length > 0 && <span className='error'><i class="fas fa-exclamation me-1"></i>{errors.city}</span>}
                    </div>
                    <div className="col-md-6 mb-4">
                        <input type="text"
                            required
                            name='country'
                            className="registerInput form-control"
                            id="inputCountry"
                            placeholder='Country'
                            onChange={this.handleChange}
                            style={(errors.country.length > 0) ? (errorStyle) : {}} />
                        {errors.country.length > 0 && <span className='error'><i class="fas fa-exclamation me-1"></i>{errors.country}</span>}
                    </div>
                    <div className="col-12">
                        <button type="submit" id="signUpBtn" className="btn btn-outline-success w-100">Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;
