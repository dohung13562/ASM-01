import React, { Component } from "react";
import { Card, CardImg, Button, Row, Label, Input, Col, FormFeedback, Modal, ModalBody, ModalHeader, CardBody, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";
import { FadeTransform } from 'react-animation-components'
import { LocalForm, Control, Errors } from "react-redux-form";


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

const RenderStaffItem = ({ staff, onDeleteStaff }) => {
    return (
        <FadeTransform in
            transformProps={{
                exitTransform: "scale(0.5) translateY(-50%)"
            }}>
            <div>
                <Link to={`/staff/${staff.id}`}>
                    <Card>
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                        <CardBody>
                            <CardSubtitle style={{textAlign: "center"}}>{staff.name}</CardSubtitle>
                        </CardBody>
                    </Card>
                </Link>
                <Button color="danger" onClick={() => onDeleteStaff(staff.id)}>Delete</Button>
            </div>
        </FadeTransform>
    )
}

class StaffList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nameK: ""
        };
        this.searchModal = this.searchModal.bind(this);
    }

    searchModal(event) {
        event.preventDefault();
        const name = event.target.name.value;
        this.setState({ nameK: name })
    }

    render() {
        const list = this.props.staffs.filter((val) => {
            if (this.state.nameK === "") return val
            else if (
                val.name.toLowerCase().includes(this.state.nameK.toLowerCase())
            )
                return val
            return 0
        }).map((val) => {
            return (
                <div key={val.id} className="col-lg-2 col-md-4 col-sm-6">
                    <RenderStaffItem staff={val} onDeleteStaff={this.props.onDeleteStaff} />
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 mt-3">
                        <div className="row">
                            <div className="text text-white m-2">
                                <h4>Nhân Viên</h4>
                            </div>
                            <AddStaffFrom onAdd={this.props.onAddStaff} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                        <form onSubmit={this.searchModal} className="form-group row">
                            <div className="col-8 col-md-8">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="tìm kiếm nhân viên ..." />
                            </div>
                            <div className="col-4 col-md-4">
                                <button className="btn btn-success" type="submit">tìm kiếm</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-12">
                    <hr />
                    <div className="row row-shadow mb-2 mt-2">{list}</div>
                </div>
            </div>
        )
    }
}

class AddStaffFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            doB: "",
            startDate: "",
            departmentId: "",
            image: "/assets/images/alberto.png",
            touched: {
                doB: false,
                startDate: false,
                departmentId: false
            },
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    toggleModal(e) {
        e.preventDefault();
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit = (value) => {
        if (!this.state.doB || !this.state.startDate)
            this.setState({
                touched: { doB: true, startDate: true }
            })
        else {
        const newStaff = {
            name: value.name,
            doB: this.state.doB,
            startDate: this.state.startDate,
            departmentId: this.state.departmentId,
            salaryScale: parseInt(value.salaryScale, 10),
            annualLeave: parseInt(value.annualLeave, 10),
            overTime: parseInt(value.overTime, 10),
            image: "/assets/images/alberto.png"
        }
            this.props.onAdd(newStaff);
        }
    }

    handleBlur = (field) => () => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const departmentId = target.departmentId;

        this.setState({
            [name]: value,
            [departmentId]: value
        });
    }

    validate(doB, startDate) {
        const errors = {
            doB: "",
            startDate: "",
        };
        if (this.state.touched.doB && doB.length < 1)
            errors.doB = "Yêu cầu nhập";
        if (this.state.touched.startDate && startDate.length < 1)
            errors.startDate = "Yêu cầu nhập";
        return errors;
    }

    render() {
        const errors = this.validate(
            this.state.doB,
            this.state.startDate,
        );
        console.log(this.props)
        return (
            <div className="container-fluid">
                    <div className="col-lg-2 col-md-4 col-sm-6">
                        <Button outline onClick={this.toggleModal}><span className="fa fa-plus fa-lg"></span></Button>
                    </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                            <Row className="control-group">
                                <Label htmlFor="name" md={4}>Tên</Label>
                                <Col md={8}>
                                    <Control.text model=".name" className="form-control" id="name" name="name"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(30)
                                        }} />
                                    <Errors
                                        model=".name"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: "Yêu cầu  ",
                                            minLength: "Nhập nhiều hơn 3 ký tự",
                                            maxLength: "Yêu cầu nhập ít hơn 30 ký tự"
                                        }} />
                                </Col>
                            </Row>
                            <Row className="control-group">
                                <Label htmlFor="doB" md={4}>Ngày Sinh</Label>
                                <Col md={8}>
                                    <Input type="date" id="doB" name="doB"
                                        valid={errors.doB === ""}
                                        invalid={errors.doB !== ""}
                                        onBlur={this.handleBlur("doB")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.doB}</FormFeedback>
                                </Col>
                            </Row>
                            <Row className="control-group">
                                <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                <Col md={8}>
                                    <Input type="date" id="startDate" name="startDate"
                                        valid={errors.startDate === ""}
                                        invalid={errors.startDate !== ""}
                                        onBlur={this.handleBlur("startDate")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.startDate}</FormFeedback>
                                </Col>
                            </Row>
                            <Row className="control-group">
                                <Label htmlFor="department" md={4}>Phòng ban</Label>
                                <Col md={8}>
                                    <select id="department" name="departmentId" className="form-control"
                                        value={this.state.departmentId}
                                        onChange={this.handleInputChange}>
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                        <option>Finance</option>
                                    </select>
                                </Col>
                            </Row>
                            <Row className="control-group">
                                <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                <Col md={8}>
                                <Control.text model=".salaryScale" id="salaryScale" name="salaryScale" defaultValue="0" className="form-control"
                                        validators={{
                                            required,
                                            isNumber
                                        }}/>
                                    <Errors
                                        model=".salaryScale"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: "Yêu cầu nhập",
                                            isNumber: "Phải là chữ số"
                                        }}/>
                                </Col>
                            </Row>
                            <Row className="control-group">
                                <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                <Col md={8}>
                                    <Control.text model=".annualLeave" id="annualLeave" name="annualLeave" defaultValue="0" className="form-control"
                                        validators={{
                                            required,
                                            isNumber
                                        }}/>
                                    <Errors
                                        model=".annualLeave"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: "Yêu cầu nhập",
                                            isNumber: "Phải là chữ số"
                                        }}/>
                                </Col>
                            </Row>
                            <Row className="control-group">
                                <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                <Col md={8}>
                                    <Control.text model=".overTime" id="overTime" name="overTime" defaultValue="0" className="form-control"
                                        validators={{
                                            required,
                                            isNumber
                                        }}/>
                                    <Errors
                                        model=".overTime"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: "Yêu cầu nhập",
                                            isNumber: "Phải là chữ số"
                                        }}/>
                                </Col>
                            </Row>
                            <Row className="control-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="success"><span className="fa fa-plus fa-lg"></span></Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>


            </div>
        );
    }
}

export default StaffList;
