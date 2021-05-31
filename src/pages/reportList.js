import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/reportList.css';
import axios from 'axios';

const API = '/api';

class ReportList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0,
            pageSize: 0,
            rowCount: 0,
            pageCount: 0,
            results: [],
            filter: {},
            showFilterForm: false,
        }
    }

    handleChange = (e) => {
        const filter = { ...this.state.filter };
        filter[e.target.name] = e.target.value;
        this.setState({
            filter
        })
    }

    showFilter = () => {
        this.setState({ showFilterForm: true });
    }

    closeFilters = () => {
        this.setState({ showFilterForm: false });
    }

    resetFilter = () => {
        if (localStorage.getItem('token') && localStorage.getItem('user')) {
            axios({
                method: 'get',
                url: `${API}/report/`,
                params: {
                    userId: JSON.parse(localStorage.getItem('user'))._id,
                }
            })
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    this.setState({
                        ...data,
                        filter: {}
                    })
                });
            }
        }

        applyFilters = () => {
            const filterBtn = document.querySelector('#filterBtn');
            filterBtn.innerHTML = '<div class="spinner-border text-dark" role="status"><span class="visually-hidden">Loading...</span></div>';
            if (localStorage.getItem('token') && localStorage.getItem('user')) {
                axios({
                    method: 'get',
                    url: `${API}/report/`,
                    params: {
                        ...this.state.filter,
                        userId: JSON.parse(localStorage.getItem('user'))._id,
                    }
                })
                    .then(res => {
                        return res.data;
                    })
                    .then(data => {
                        filterBtn.innerHTML = 'Apply Filters';
                        this.setState({
                            ...data,
                            showFilterForm: false,
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        filterBtn.innerHTML = 'Apply Filters';
                        this.setState({
                            showFilterForm: false,
                        })
                    });
            }
        }

        componentDidMount = () => {
            if (localStorage.getItem('token') && localStorage.getItem('user')) {
                axios({
                    method: 'get',
                    url: `${API}/report/`,
                    params: {
                        userId: JSON.parse(localStorage.getItem('user'))._id,
                    }
                })
                    .then(res => {
                        return res.data;
                    })
                    .then(data => {
                        this.setState({
                            ...data
                        })
                    });
            }
        }

        render() {
            const filter = (this.state.showFilterForm) ? (
                <div id="filterDiv" className="d-flex flex-column justify-content-center align-items-center">
                    <div id="filterBox" className="w-50 d-flex flex-column justify-content-around">
                        <div>
                            <label className="form-label filterLabel">Patient's Name</label>
                            <input type="text"
                                name="s"
                                onChange={this.handleChange}
                                id="patientSearchBar"
                                className="filterInput form-control w-75 m-auto"
                                placeholder="Enter Patient's Name" />
                        </div>
                        <div>
                            <label className="form-label filterLabel">Doctor's Name</label>
                            <input type="text"
                                name="doctorName"
                                onChange={this.handleChange}
                                id="doctorSearchBar"
                                className="filterInput form-control w-75 m-auto"
                                placeholder="Enter Doctor's Name" />
                        </div>
                        <div>
                            <label className="form-label filterLabel">Pneumothorax</label>
                            <select id="inputState"
                                name="pneumothorax"
                                defaultValue=""
                                className="filterInput form-select w-75 m-auto"
                                onChange={this.handleChange}>
                                <option value="">Choose...</option>
                                <option value={true}>Positive</option>
                                <option value={false}>Negative</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label filterLabel">Diagnosis</label>
                            <select id="inputState"
                                name="diagnosis"
                                defaultValue=""
                                className="filterInput form-select w-75 m-auto"
                                onChange={this.handleChange}>
                                <option value="">Choose...</option>
                                <option value="none">None</option>
                                <option value="COVID">Covid</option>
                            </select>
                        </div>
                        <button type="button"
                            id="filterBtn"
                            className="btn btn-info w-75 mx-auto"
                            onClick={this.applyFilters}>Apply Filters</button>
                        <button type="button"
                            className="btn btn-outline-light w-75 mx-auto"
                            onClick={this.closeFilters}>Close</button>
                    </div>
                </div>
            ) : null;

            const list = this.state.results.map((res, idx) => {
                const i = idx + 1;
                const style = (res.pneumothorax) ? 'red' : 'green';
                const pneumothorax = (res.pneumothorax) ? 'Detected' : 'Not Detected';
                return (
                    <tr key={i}>
                        <td>{(i < 10) ? `0${i}` : i}</td>
                        <td>{res.firstName}</td>
                        <td>{res.lastName}</td>
                        <td>Dr.{res.doctorName}</td>
                        <td className={style}>{pneumothorax.toUpperCase()}</td>
                        <td>{res.diagnosis.toLowerCase()}</td>
                        <td><NavLink to={`/report-list/${res._id}`} className="reportView">view <i className="far fa-eye ms-2"></i></NavLink></td>
                    </tr>
                )
            })
            const count = list.length;
            const prev = (this.state.currentPage > 1) ? (
                <li className="page-item">
                    <span className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </span>
                </li>
            ) : null;
            const next = (this.state.currentPage !== this.state.pageCount) ? (
                <li className="page-item">
                    <span className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </span>
                </li>
            ) : null;
            const leftNum = (this.state.currentPage > 1) ? (
                <li className="page-item"><span className="page-link">{this.state.currentPage - 1}</span></li>
            ) : null;
            const rightNum = (this.state.currentPage !== this.state.pageCount) ? (
                <li className="page-item"><span className="page-link">{this.state.currentPage + 1}</span></li>
            ) : null;

            return (
                <div className="container">
                    { filter}
                    <div className="d-flex justify-content-between">
                        <div>
                            <button type="button" className="btn reportListBtn" onClick={this.showFilter}>Filter<i className="fas fa-filter ms-2"></i></button>
                            <button type="button" className="btn reportListBtn ms-3" onClick={this.resetFilter}>Reset Filter</button>
                        </div>
                        <nav id="reportListNav" aria-label="Page navigation example">
                            <ul className="pagination m-0">
                                {prev}
                                {leftNum}
                                <li className="page-item"><span className="page-link">{this.state.currentPage}</span></li>
                                {rightNum}
                                {next}
                            </ul>
                        </nav>
                    </div>
                    <table className="table table-dark table-striped mt-3">
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>First Name</th>
                                <th>last Name</th>
                                <th>Doctor's Name</th>
                                <th>Pneumothorax</th>
                                <th>Diagnosis</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
                    <p style={{ color: 'white' }} className="text-center">Showing {count} out of {this.state.rowCount}</p>
                </div>
            )
        }
    }

    export default ReportList;