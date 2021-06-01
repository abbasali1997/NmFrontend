import React, { Component } from 'react';
import Loader from "react-loader-spinner";
import UploadData from '../components/upload-data';
import Report from '../components/report';
import axios from 'axios';

class ReportGeneration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: '',
            imageUrl: 'https://icons-for-free.com/iconfiles/png/512/upload+icon+upload+line+icon+icon-1320073121636456908.png',
            firstName: '',
            lastName: '',
            DOB: '',
            bloodGroup: 'A Positive',
            sex: 'Male',
            maritalStatus: 'Single',
            email: '',
            phoneNumber: '',
            height: '',
            weight: '',
            address: '',
            description: '',
            doctorName: '',
            doctorSpeciality: '',
            showComponent: 'upload-data',
            loader: false,
            result: {},
        };
        this.onDrop = this.onDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedo = this.handleRedo.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const defaultImage = 'https://icons-for-free.com/iconfiles/png/512/upload+icon+upload+line+icon+icon-1320073121636456908.png'
        if (this.state.imageUrl !== defaultImage) {
            const formData = new FormData();
            this.setState({ loader: true });
            formData.append("file", this.state.picture);
            axios.post('/uploader', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                return res.data;
            }).then(data => {
                this.setState({
                    showComponent: 'report',
                    loader: false,
                    result: {
                        pneumothorax: (data.result !== "Normal") ? true : false,
                        diagnosis: data.result
                    }
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }

    handleRedo() {
        this.setState({
            showComponent: 'upload-data',
            loader: false,
            result: {}
        }, () => {

        });
    }

    handleChange(name, value) {
        this.setState({ [name]: value });
    }

    onDrop(picture) {
        this.setState({
            picture: picture[0],
        });
        console.log(picture[0]);
        try {
            const image = URL.createObjectURL(picture[0]);
            this.setState({
                imageUrl: image,
            })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const page = (this.state.showComponent === 'upload-data')
            ? (<UploadData handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                onDrop={this.onDrop}
                {...this.state} />)
            : (<Report {...this.state} onRedoClick={this.handleRedo} />);
        const loader = (this.state.loader)
            ? (<div id="loaderContainer"
                className="d-flex flex-column justify-content-center align-items-center w-100"
                style={{ position: 'fixed', top: '0', left: '0', height: '100vh', background: 'rgb(0 0 0 / 90%)' }}>
                <Loader type="Circles" color="#00BFFF" height={80} width={80} />
                <h4 className="text-center mt-4" style={{ color: "#00BFFF", fontWeight: 'bold' }}>Calculating Results</h4>
            </div>) : null;
        return (
            <div>
                {loader}
                {page}
            </div>
        )
    }
}

export default ReportGeneration;
