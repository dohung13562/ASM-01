import dateFormat from "dateformat";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle, Button, Row, Label, Input, Col, FormFeedback, Modal, ModalBody, ModalHeader, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { LocalForm, Control, Errors} from "react-redux-form";
import { FadeTransform, Fade, Stagger } from "react-animation-components"
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

const required = (value) => value && value.length;
const maxLength = (len) => (value) => !(value) || (value.length <= len);
const minLength = (len) => (value) => value && (value.length >= len);

function RenderStaff ({ staff }) {
    return(
        <div className="col-12 col-md-5 m-1">
            <FadeTransform in
                transformProps = {{
                    exitTransform: "scale(0.5) translateY(-50%)"
            }}>    
                <Card>
                    <CardImg src={baseUrl + staff.image} alt={baseUrl + staff.name} />
                    <CardBody>
                        <CardTitle>{staff.name}</CardTitle>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
        
    )
}

            
    
class StaffsInfomation extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

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
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit = (values) => {
            this.props.onUpdateStaff(
                values.name,
                this.props.departmentId,
                this.props.salaryScale,
                this.props.doB,
                this.props.startDate,
                this.props.annualLeave,
                this.props.overTime
                );
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
    
    validate(name, departmentId, salaryScale, doB, startDate, annualLeave, overTime) {
        const errors = {
            name: "",
            doB: "",
            startDate: "",
            departmentId: "",
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
        if (this.state.touched.departmentId && departmentId.length < 1)
            errors.departmentId = "Yêu cầu nhập"; 
        if (this.state.touched.salaryScale && salaryScale.length < 1)
            errors.salaryScale = "Yêu cầu nhập"; 
        if (this.state.touched.annualLeave && annualLeave.length < 1)
            errors.annualLeave = "Yêu cầu nhập"; 
        if (this.state.touched.overTime && overTime.length < 1)
            errors.overTime  = "Yêu cầu nhập"; 
        return errors;
    }


    render() {
        console.log(this.props)
        const errors = this.validate(
            this.state.name,
            this.state.departmentId,
            this.state.salaryScale,
            this.state.doB,
            this.state.startDate,
            this.state.annualLeave,
            this.state.overTime
            ); 

        const staff = this.props.staff;
        const dept = this.props.dept;
        console.log(dept)
            if (staff) {
                return (
                    <div className="col-lg-6" style={{ margin: "15px" }}>
                        <p className='mt-2' style={{ color: "#C0C0C0" }}><Link to='/'>Nhân viên</Link> / {staff.name}</p>
                            <div className="container-flui row">
                                <div className="col-sm-6">
                                    <CardImg src={staff.image} />
                                </div>
                                <div className="col-sm-6">
                                    <Card style={{ background: "#ADD8E6", marginTop: "85px" }}>
                                        <h4><span className="fa fa-user-circle" /> Họ và tên : {staff.name}</h4>
                                        <p><span className="fa fa-birthday-cake" /> Ngày sinh : {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                                        <p><span className="fa fa-calendar" /> Ngày vào công ty : {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
                                        <p><span className="fa fa-sitemap" /> Phòng ban : {dept[0].name}</p>
                                        <p><span className="fa fa-user-times" /> Số ngày nghỉ còn lại : {staff.annualLeave}</p>
                                        <p><span className="fa fa-user-plus" /> Số ngày đã làm thêm : {staff.overTime}</p>
                                    </Card>
                                </div>
                            </div>
                            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2 col-md-4 col-sm-6">
                        <Button outline onClick={this.toggleModal}>Update</Button>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>Update</ModalHeader>
                    <ModalBody>
                      <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
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
                        <Row className="form-group">
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
                        <Row className="form-group">
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
                        <Row className="form-group">
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
                        <Row className="form-group">
                          <Label htmlFor="departmentId" md={4}>Phòng ban</Label>
                            <Col md={8}>
                              <Input type="select" id="departmentId" name="departmentId"
                              value={this.state.departmentId}
                              valid={errors.departmentId === ""}
                              invalid={errors.departmentId !== ""}
                              onBlur={this.handleBlur("departmentId")}
                              onChange={this.handleInputChange}>
                              <option>Sale</option>
                              <option>HR</option>
                              <option>Marketing</option>
                              <option>IT</option>
                              <option>Finance</option>
                              </Input>
                              <FormFeedback>{errors.departmentId}</FormFeedback>
                            </Col>
                        </Row>
                        <Row className="form-group">
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
                        <Row className="form-group">
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
                        <Row className="form-group">
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
                        <Row className="form-group">
                            <Col md={{size: 10, offset: 2}}>
                              <Button type="submit" color="success">Update</Button>
                            </Col>
                        </Row> 
                      </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
                    </div>
                );
            } else {
                return (
                    <div></div>
                );        
        }   
    }
}

export default StaffsInfomation;

