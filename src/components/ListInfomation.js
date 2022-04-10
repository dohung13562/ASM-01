import React, { Component } from "react";
import { Card, CardImg, Button, Row, Label, Input, Col, FormFeedback, Modal, ModalBody, ModalHeader, CardBody, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";
import { FadeTransform } from 'react-animation-components'
import { LocalForm, Control, Errors} from "react-redux-form";


const required = (value) => value && value.length;
const maxLength = (len) => (value) => !(value) || (value.length <= len);
const minLength = (len) => (value) => value && (value.length >= len);

const RenderStaffItem = ({ staff, onDeleteStaff}) => {
    return (
        <FadeTransform in
                transformProps = {{
                    exitTransform: "scale(0.5) translateY(-50%)"
            }}> 
            <div>
                <Link to = {`/staff/${staff.id}`}>
                  <Card>
                    <CardImg width="100%" src={staff.image} alt={staff.name} />
                      <CardBody>
                        <CardSubtitle>{staff.name}</CardSubtitle>
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
                        <AddStaffFrom onAdd = {this.props.onAddStaff} />
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
                <hr/>
                <div className="row row-shadow mb-2 mt-2">{list}</div>
        </div>
    </div>    
    )}
}

class AddStaffFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            doB: "",
            startDate: "",
            departmentId: "Dept02",
            salaryScale: 1,
            annualLeave: 0,
            overTime: 0,
            image: "/assets/images/alberto.png",
            touched: {
                doB: false,
                startDate: false,
                departmentId: false,
                salaryScale: false,
                annualLeave: false,
                overTime: false
            }
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    handleSubmit = (value) => {
        if (!this.state.doB || !this.state.startDate)
            this.setState ({
                touched: {doB: true, startDate: true}
            })
        else {
            const newStaff = {
                name: value.name,
                doB: this.state.doB,
                startDate: this.state.startDate,
                department: this.state.departmentId,
                salaryScale: this.state.salaryScale,
                annualLeave: this.state.annualLeave,
                overTime: this.state.overTime,
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
        
            this.setState({
            [name]: value
        });
    }
    
    validate(name, department, salaryScale, doB, startDate, annualLeave, overTime) {
        const errors = {
            name: "",
            doB: "",
            startDate: "",
            department: "",
            salaryScale: "",
            annualLeave: "",
            overTime: ""
        };
        if (this.state.touched.name && name < 3)
            errors.name = "name should be >= 3 characters";
        else if (this.state.touched.name && name.length > 50)
            errors.name =  "name should be <= 10 characters";
        if (this.state.touched.doB && doB.length < 1)
            errors.doB = "Yêu cầu nhập"; 
        if (this.state.touched.startDate && startDate.length < 1)
            errors.startDate = "Yêu cầu nhập"; 
        if (this.state.touched.department && department.length < 1)
            errors.department = "Yêu cầu nhập"; 
        if (this.state.touched.salaryScale && salaryScale.length < 1)
            errors.salaryScale = "Yêu cầu nhập"; 
        if (this.state.touched.annualLeave && annualLeave.length < 1)
            errors.annualLeave = "Yêu cầu nhập"; 
        if (this.state.touched.overTime && overTime.length < 1)
            errors.overTime  = "Yêu cầu nhập"; 
        return errors;
    }

    render() {
        const errors = this.validate(
            this.state.name,
            this.state.departmentId,
            this.state.salaryScale,
            this.state.doB,
            this.state.startDate,
            this.state.annualLeave,
            this.state.overTime
            );

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-md-4 col-sm-6">
                    <Button outline onClick={this.toggleModal}><span className="fa fa-plus fa-lg"></span></Button>
                </div>
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
                <ModalBody>
                  <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                    <Row className="control-group">
                      <Label htmlFor="name" md={4}>Tên</Label>
                        <Col md={8}>
                          <Control.text model=".name" className="form-control" id="name" name="name" 
                            validators = {{
                            required,
                            minLength: minLength(3),
                            maxLength: maxLength(30)
                            }}/>
                          <Errors
                            model=".name"
                            className="text-danger"
                            show="touched"
                            messages={{
                                required: "Yêu cầu  ",
                                minLength: "Nhập nhiều hơn 3 ký tự",
                                maxLength: "Yêu cầu nhập ít hơn 30 ký tự"
                            }}/>
                        </Col>
                    </Row>
                    <Row className="control-group">
                      <Label htmlFor="image" md={4}>Hình Ảnh</Label>
                        <Col md={8}>
                          <Input type="url" id="image" name="image"
                          value={this.state.image}
                          valid={errors.image === ""}
                          invalid={errors.image !== ""}
                          onBlur={this.handleBlur("image")}
                          onChange={this.handleInputChange} />
                          <FormFeedback>{errors.image}</FormFeedback>
                        </Col>
                    </Row>
                    <Row className="control-group">
                      <Label htmlFor="doB" md={4}>Ngày Sinh</Label>
                        <Col md={8}>
                          <Input type="date" id="doB" name="doB"
                          value={this.state.doB}
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
                          value={this.state.startDate}
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
                          <Input type="select" id="department" name="department"
                          value={this.state.department}
                          valid={errors.department === ""}
                          invalid={errors.department !== ""}
                          onBlur={this.handleBlur("department")}
                          onChange={this.handleInputChange}>
                          <option>Sale</option>
                          <option>HR</option>
                          <option>Marketing</option>
                          <option>IT</option>
                          <option>Finance</option>
                          </Input>
                          <FormFeedback>{errors.department}</FormFeedback>
                        </Col>
                    </Row>
                    <Row className="control-group">
                      <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                        <Col md={8}>
                          <Input type="number" id="salaryScale" name="salaryScale"
                          value={this.state.salaryScale}
                          valid={errors.salaryScale === ""}
                          invalid={errors.salaryScale !== ""}
                          onBlur={this.handleBlur("salaryScale")}
                          onChange={this.handleInputChange} />
                          <FormFeedback>{errors.salaryScale}</FormFeedback>
                        </Col>
                    </Row>
                    <Row className="control-group">
                      <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                        <Col md={8}>
                          <Input type="number" id="annualLeave" name="annualLeave"
                          value={this.state.annualLeave}
                          valid={errors.annualLeave === ""}
                          invalid={errors.annualLeave !== ""}
                          onBlur={this.handleBlur("annualLeave")}
                          onChange={this.handleInputChange} />
                          <FormFeedback>{errors.annualLeave}</FormFeedback>
                        </Col>
                    </Row>
                    <Row className="control-group">
                      <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                        <Col md={8}>
                          <Input type="number" id="overTime" name="overTime"
                          value={this.state.overTime}
                          valid={errors.overTime === ""}
                          invalid={errors.overTime !== ""}
                          onBlur={this.handleBlur("overTime")}
                          onChange={this.handleInputChange} />
                          <FormFeedback>{errors.overTime}</FormFeedback>
                        </Col>
                    </Row>
                    <Row className="control-group">
                        <Col md={{size: 10, offset: 2}}>
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
