import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import '../styles/upload-data.css';

const validEmailRegex = RegExp(
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  );
const number = RegExp(/^\d+$/g);
const nameReg = RegExp(/^[a-z ,.'-]+$/i);
const float = RegExp(/[+-]?([0-9]*[.])?[0-9]+/i);

class UploadData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {
                firstName: '',
                lastName: '',
                DOB: '',
                email: '',
                phoneNumber: '',
                height: '',
                weight: '',
                address: '',
                description: '',
                doctorName: '',
                doctorSpeciality: '',
            }
        }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
        const { name, value } = e.target;
        const errors = {...this.state.errors};
        switch(name) {
            case 'firstName':
                errors.firstName = (nameReg.test(value))
                                ? ''
                                : 'Name can not contain a number or a symbol';
                break;
            case 'lastName':
                errors.lastName = (nameReg.test(value))
                                ? ''
                                : 'Name can not contain a number or a symbol';
                break;
            case 'DOB':
                errors.DOB = (new Date(value) < new Date(Date.now()))
                            ? ''
                            : 'Birth date can not be greater than current date';
                break;
            case 'email':
                errors.email = validEmailRegex.test(value)
                            ? ''
                            : 'Invalid e-mail address';  
                break; 
            case 'phoneNumber':
                errors.phoneNumber = !(number.test(value))
                            ? 'Invalid phone number'
                            : (value.length !== 11)
                            ? 'Number should be of exact 11 digits'
                            : '';
                break;
            case 'height':
                errors.height = (float.test(value))
                            ? ''
                            : 'Invalid height';
                break;
            case 'weight':
                errors.weight = (float.test(value))
                            ? ''
                            : 'Invalid weight';
                break;
            case 'doctorName':
                errors.doctorName = (nameReg.test(value))
                            ? ''
                            : 'Name can not contain a number or a symbol';
                break;
            case 'doctorSpeciality':
                errors.doctorSpeciality = (nameReg.test(value))
                            ? ''
                            : 'This field can not contain a number or a symbol';
                break;                                                                   
            default:
                break;        
        }
        this.setState({errors});
        this.props.handleChange(e.target.name, e.target.value);
    }

    render() {
        const errors = this.state.errors;
        const errorStyle = {borderColor: 'red'};
        return (
            <div className='container d-flex flex-column justify-content-center'>
                <form id='patientForm' className="row mb-5" onSubmit={this.props.handleSubmit}>
                    <div className="col-12 col-lg-6">
                        <div className="row g-3">
                            <h2>Patient Form</h2>
                            <div className="col-md-6">
                                <label htmlFor="inputFirstName" className="patientFormLabel form-label">First Name</label>
                                <input value={this.props.firstName} 
                                       required type="text" 
                                       className="patientFormInput form-control" 
                                       id="inputFirstName" 
                                       name='firstName' 
                                       onChange={this.handleChange} 
                                       style={(errors.firstName.length > 0) ? (errorStyle) : {}}/>
                                {errors.firstName.length > 0 && <span className='error'><i class="fas fa-exclamation me-1"></i>{errors.firstName}</span>}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputLastName" className="patientFormLabel form-label">Last Name</label>
                                <input value={this.props.lastName} 
                                       required type="text" 
                                       className="patientFormInput form-control" 
                                       id="inputLastName" 
                                       name='lastName' 
                                       onChange={this.handleChange} 
                                       style={(errors.lastName.length > 0) ? (errorStyle) : {}}/>
                                {errors.lastName.length > 0 && <span className='error'><i class="fas fa-exclamation me-1"></i>{errors.lastName}</span>}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputDOB" className="patientFormLabel form-label">Date Of Birth</label>
                                <input value={this.props.DOB} 
                                       required 
                                       type="date" 
                                       className="patientFormInput form-control" 
                                       id="inputDOB" 
                                       name='DOB' 
                                       onChange={this.handleChange}
                                       style={(errors.DOB.length > 0) ? (errorStyle) : {}}/>
                                {errors.DOB.length > 0 && <span className='error'><i class="fas fa-exclamation me-1"></i>{errors.DOB}</span>}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputSex" className="patientFormLabel form-label">Blood Group</label>
                                <select value={this.props.bloodGroup} required id="inputSex" className="patientFormSelect form-select" name='bloodGroup' onChange={this.handleChange}>
                                    <option value="A Positive" className='patientFormOption'>A Positive</option>
                                    <option value="A Negative" className='patientFormOption'>A Negative</option>
                                    <option value="A Unknown" className='patientFormOption'>A Unknown</option>
                                    <option value="B Positive" className='patientFormOption'>B Positive</option>
                                    <option value="B Negative" className='patientFormOption'>B Negative</option>
                                    <option value="B Unknown" className='patientFormOption'>B Unknown</option>
                                    <option value="AB Positive" className='patientFormOption'>AB Positive</option>
                                    <option value="AB Negative" className='patientFormOption'>AB Negative</option>
                                    <option value="AB Unknown" className='patientFormOption'>AB Unknown</option>
                                    <option value="O Positive" className='patientFormOption'>O Positive</option>
                                    <option value="O Negative" className='patientFormOption'>O Negative</option>
                                    <option value="O Unknown" className='patientFormOption'>O Unknown</option>
                                    <option value="Unknown" className='patientFormOption'>Unknown</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputSex" className="patientFormLabel form-label">Sex</label>
                                <select value={this.props.sex} required id="inputSex" className="patientFormSelect form-select" name='sex' onChange={this.handleChange}>
                                    <option value="Male" className='patientFormOption'>Male</option>
                                    <option value="Female" className='patientFormOption'>Female</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputMaritalStatus" className="patientFormLabel form-label">Marital Status</label>
                                <select value={this.props.maritalStatus} required id="inputMaritalStatus" className="patientFormSelect form-select" name='maritalStatus' onChange={this.handleChange}>
                                    <option value="Single" className='patientFormOption'>Single</option>
                                    <option value="Married" className='patientFormOption'>Married</option>
                                    <option value="Divorced" className='patientFormOption'>Divorced</option>
                                    <option value="Separated" className='patientFormOption'>Separated</option>
                                    <option value="Widowed" className='patientFormOption'>Widowed</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputEmail" className="patientFormLabel form-label">Email</label>
                                <input value={this.props.email} 
                                       required 
                                       type="text" 
                                       className="patientFormInput form-control" 
                                       id="inputEmail" 
                                       name='email' 
                                       onChange={this.handleChange} 
                                       style={(errors.email.length > 0) ? (errorStyle) : {}}/>
                                {errors.email.length > 0 && <span className='error'><i class="fas fa-exclamation me-1"></i>{errors.email}</span>}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPhone" className="patientFormLabel form-label">Phone Number</label>
                                <input value={this.props.phoneNumber} 
                                       required 
                                       type="text" 
                                       className="patientFormInput form-control" 
                                       id="inputPhone" 
                                       name='phoneNumber' 
                                       onChange={this.handleChange} 
                                       style={(errors.phoneNumber.length > 0) ? (errorStyle) : {}}/>
                                {errors.phoneNumber.length > 0 && <span className='error'><i class="fas fa-exclamation me-1"></i>{errors.phoneNumber}</span>}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputFirstName" className="patientFormLabel form-label">Height (meters)</label>
                                <input value={this.props.height} 
                                       required 
                                       type="text" 
                                       className="patientFormInput form-control" 
                                       id="inputFirstName" 
                                       placeholder='1.75 m' 
                                       name='height' 
                                       onChange={this.handleChange} 
                                       style={(errors.height.length > 0) ? (errorStyle) : {}}/>
                                {errors.height.length > 0 && <span className='error'><i class="fas fa-exclamation me-1"></i>{errors.height}</span>}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputLastName" className="patientFormLabel form-label">Weight (pounds)</label>
                                <input value={this.props.weight} 
                                       required 
                                       type="text" 
                                       className="patientFormInput form-control" 
                                       id="inputLastName" 
                                       placeholder='150 lbs' 
                                       name='weight' 
                                       onChange={this.handleChange}
                                       style={(errors.weight.length > 0) ? (errorStyle) : {}}/>
                                {errors.weight.length > 0 && <span className='error'><i class="fas fa-exclamation me-1"></i>{errors.weight}</span>}
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputAddress" className="patientFormLabel form-label">Address</label>
                                <input value={this.props.address} required type="text" className="patientFormInput form-control" id="inputAddress"
                                    placeholder="1234 Main St" name='address' onChange={this.handleChange} />
                            </div>
                            <div className="col-md-12">
                                <div className="">
                                    <label htmlFor="exampleFormControlTextarea1" className="patientFormLabel form-label">Patient's description (Optional)</label>
                                    <textarea value={this.props.description} className="patientFormInput form-control" id="exampleFormControlTextarea1" name='description' rows="2" onChange={this.handleChange} />
                                </div>
                            </div>
                            <h5 style={{ color: 'white' }}>Patient's doctor info.</h5>
                            <div className="col-md-6">
                                <label htmlFor="inputDoctorName" className="patientFormLabel form-label">Full Name</label>
                                <input value={this.props.doctorName} 
                                       required type="text" 
                                       className="patientFormInput form-control" 
                                       id="inputDoctorName" 
                                       name='doctorName' 
                                       onChange={this.handleChange} 
                                        style={(errors.doctorName.length > 0) ? (errorStyle) : {}}/>
                                {errors.doctorName.length > 0 && <span className='error'><i class="fas fa-exclamation me-1"></i>{errors.doctorName}</span>}
                           </div>
                            <div className="col-md-6">
                                <label htmlFor="inputDoctorSpec" className="patientFormLabel form-label">Speciality</label>
                                <input value={this.props.doctorSpeciality} 
                                       required type="text" 
                                       className="patientFormInput form-control" 
                                       id="inputDoctorSpec" 
                                       name='doctorSpeciality' 
                                       onChange={this.handleChange} 
                                       style={(errors.doctorSpeciality.length > 0) ? (errorStyle) : {}}/>
                                {errors.doctorSpeciality.length > 0 && <span className='error'><i class="fas fa-exclamation me-1"></i>{errors.doctorSpeciality}</span>}
                            </div>
                        </div>
                    </div>
                    <div id="imageColumn" className="col-12 col-lg-6">
                        <img src={this.props.imageUrl} style={{ width: '50%' }} className='d-block m-auto mt-5' alt="upload" />
                        <ImageUploader
                            buttonText='Choose CXR image'
                            onChange={this.props.onDrop}
                            imgExtension={['.jpg', '.dcm', '.jpeg']}
                            label='Max file size: 5mb. Accepted: jpg, jpeg, and dcm'
                            maxFileSize={5242880}
                            singleImage={true}
                            withIcon={false}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-outline-info d-block w-25 m-auto mt-5 p-2">Calculate Results</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UploadData;
