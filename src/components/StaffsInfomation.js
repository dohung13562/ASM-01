import dateFormat from "dateformat";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle, Button, Row, Label, Input, Col, FormFeedback, Modal, ModalBody, ModalHeader, } from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

class StaffsInfomation extends Component {

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      isModalOpen: false,
      id: this.props.staffId,
      doB: "",
      startDate: "",
      departmentId: "Dept01",
      image: "/assets/images/alberto.png",
      touched: {
        doB: false,
        startDate: false,
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

  handleSubmit = (values) => {
    if (!this.state.doB || !this.state.startDate)
      this.setState({
        touched: { doB: true, startDate: true }
      })
    else {
      const onUpdateStaff = {
        id: this.state.id,
        name: values.name,
        departmentId: this.state.departmentId,
        doB: this.state.doB,
        startDate: this.state.startDate,
        salaryScale: parseInt(values.salaryScale, 10),
        annualLeave: parseInt(values.annualLeave, 10),
        overTime: parseInt(values.overTime, 10),
        image: "/assets/images/alberto.png"
      }
      console.log("acb :", onUpdateStaff)
      this.props.onUpdateStaff(onUpdateStaff)
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
      [name]: value,
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

    const staff = this.props.staff;
    const dept = this.props.dept;
    return (
      <div className="col-12">
        <CardTitle className='m-2' style={{ color: "#C0C0C0" }}><Link to='/staff'>Nhân viên</Link> / {staff.name}</CardTitle>
        <Button outline onClick={this.toggleModal} type="submit" color="primary" className="m-2">Update</Button>
        <Card className="container-fluid">
          <div className="row">
            <div className="col-3">
              <CardImg src={staff.image} alt={staff.name} style={{ width: "100%" }} />
            </div>
            <div className="col-9">
              <CardBody className="m-2">
                <h1><span className="fa fa-user-circle" /> Họ và tên : {staff.name}</h1>
                <p><span className="fa fa-birthday-cake" /> Ngày sinh : {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                <p><span className="fa fa-calendar" /> Ngày vào công ty : {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
                <p><span className="fa fa-sitemap" /> Phòng ban : {dept[0].name}</p>
                <p><span className="fa fa-user-times" /> Số ngày nghỉ còn lại : {staff.annualLeave}</p>
                <p><span className="fa fa-user-plus" /> Số ngày đã làm thêm : {staff.overTime}</p>
              </CardBody>
            </div>
          </div>
        </Card>
        <div className="container-fluid">
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
            <ModalHeader toggle={this.toggleModal}>Update</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)} initialState={staff}>
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
                      onChange={(e) => this.handleInputChange(e)}>
                      <option value={"Dept01"}>Sale</option>
                      <option value={"Dept02"}>HR</option>
                      <option value={"Dept03"}>Marketing</option>
                      <option value={"Dept04"}>IT</option>
                      <option value={"Dept05"}>Finance</option>
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
                      }} />
                    <Errors
                      model=".salaryScale"
                      className="text-danger"
                      show="touched"
                      messages={{
                        required: "Yêu cầu nhập",
                        isNumber: "Phải là chữ số"
                      }} />
                  </Col>
                </Row>
                <Row className="control-group">
                  <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                  <Col md={8}>
                    <Control.text model=".annualLeave" id="annualLeave" name="annualLeave" defaultValue="0" className="form-control"
                      validators={{
                        required,
                        isNumber
                      }} />
                    <Errors
                      model=".annualLeave"
                      className="text-danger"
                      show="touched"
                      messages={{
                        required: "Yêu cầu nhập",
                        isNumber: "Phải là chữ số"
                      }} />
                  </Col>
                </Row>
                <Row className="control-group">
                  <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                  <Col md={8}>
                    <Control.text model=".overTime" id="overTime" name="overTime" defaultValue="0" className="form-control"
                      validators={{
                        required,
                        isNumber
                      }} />
                    <Errors
                      model=".overTime"
                      className="text-danger"
                      show="touched"
                      messages={{
                        required: "Yêu cầu nhập",
                        isNumber: "Phải là chữ số"
                      }} />
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
      </div>
    );

  }
}

export default StaffsInfomation;

