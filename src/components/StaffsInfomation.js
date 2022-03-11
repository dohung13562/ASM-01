import dateFormat from 'dateformat';
import { Component } from 'react'; 
import { Card, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

class StaffsInfomation extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        const staff = this.props.staff;
            if (staff) {
                return (
                    <div className="col-lg-4 m-3 col-md-6 col-sm-12">
                        <p className='m-2'><Link to='/'>Nhân viên</Link> / {staff.name}</p>
                        <hr/>
                    <Card style={{ clear: "left" }}>
                        <CardImg className="cardd-img" src={staff.image} />
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
            } else {
                return (
                    <div></div>
                );
            }   
    }
}

export default StaffsInfomation;

