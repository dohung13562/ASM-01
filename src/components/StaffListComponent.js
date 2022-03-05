import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import dateFormat from "dateformat";

class StaffList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedStaff: null
        }
    }

    onStaffSelect(staff) {
        this.setState({ selectedStaff: staff });
    }

    renderStaff(staff) {
        if (staff != null) {
            return (
                <div style={{ margin: "auto" }} className="col-lg-4 col-md-6 col-sm-12">
                    <Card>
                        <h4>Họ và tên : {staff.name}</h4>
                        <li>Ngày sinh : {dateFormat(staff.doB, "dd/mm/yyyy")}</li>
                        <li>Ngày vào công ty : {dateFormat(staff.startDate, "dd/mm/yyyy")}</li>
                        <li>Phòng ban : {staff.department.name}</li>
                        <li>Chức danh : {staff.role}</li>
                        <li>Số ngày nghỉ còn lại : {staff.annualLeave}</li>
                        <li>Số ngày đã làm thêm : {staff.overTime}</li>
                    </Card>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
    renderStaffs(staff) {
        if (staff != null) {
            return (
                <div style={{ margin: "auto" }} className="col-lg-2 col-md-6 col-sm-12">
                    <CardImg>
                        <h4>Họ và tên : {staff.name}</h4>
                        <li>Ngày sinh : {dateFormat(staff.doB, "dd/mm/yyyy")}</li>
                        <li>Ngày vào công ty : {dateFormat(staff.startDate, "dd/mm/yyyy")}</li>
                        <li>Phòng ban : {staff.department.name}</li>
                        <li>Chức danh : {staff.role}</li>
                        <li>Số ngày nghỉ còn lại : {staff.annualLeave}</li>
                        <li>Số ngày đã làm thêm : {staff.overTime}</li>
                    </CardImg>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
    render() {

        const list = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-lg-4 col-md-6 col-sm-12">
                    <Card onClick={() => this.onStaffSelect(staff)}>
                        <p>{staff.name}</p>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container-fluid">
                <h4>Bấm vào tên nhân viên để xem thông tin :</h4>
                <div className="row mt-1">
                    {list}
                </div>
                <div className="row">
                    {this.renderStaff(this.state.selectedStaff)}
                </div>
            </div>
        );

    }
}

export default StaffList;