import React, { Component } from 'react';
import '../styles/register.css';

class Register extends Component {
    render() {
        return (
            <div className="container d-flex align-items-center" style={{height: '100vh'}}>
                <form className="row g-3 w-50 m-auto">
                    <h1 className='text-center mb-4'>Register</h1>
                    <div className="col-12 mb-4">
                        <input type="text" className="registerInput form-control" id="inputUsername" placeholder='Username'/>
                    </div>
                    <div className="col-md-6 mb-4">
                        <input type="email" className="registerInput form-control" id="inputEmail4" placeholder='Email Address'/>
                    </div>
                    <div className="col-md-6 mb-4">
                        <input type="number" className="registerInput form-control" id="inputPhone" placeholder='Phone Number'/>
                    </div>
                    <div className="col-md-6 mb-4">
                        <input type="password" className="registerInput form-control" id="inputPassword4" placeholder='Password'/>
                    </div>
                    <div className="col-md-6 mb-4">
                        <input type="password" className="registerInput form-control" id="inputRePassword" placeholder='Confirm Password'/>
                    </div>
                    <div className="col-12 mb-4">
                        <input type="text" className="registerInput form-control" id="inputAddress" placeholder="Address"/>
                    </div>
                    <div className="col-12 mb-4">
                        <input type="text" className="registerInput form-control" id="inputOccupation"
        placeholder="Occupation"/>
                    </div>
                    <div className="col-md-6 mb-4">
                        <input type="text" className="registerInput form-control" id="inputCity" placeholder='City'/>
                    </div>
                    <div className="col-md-6 mb-4">
                        <input type="text" className="registerInput form-control" id="inputCountry" placeholder='Country'/>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-outline-success w-100">Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;
