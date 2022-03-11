import { Card } from "reactstrap";
import { Link } from "react-router-dom";

function StaffSalary({ staffs }) {
    const list = staffs.map((staff) => {
        return (
            <div key={staff.id} className="col-lg-4 col-md-6 col-sm-12">
                    <Card>
                        <div className="ms-2">
                        <h3>{staff.name}</h3>
                        <p>Mã nhân viên: {staff.id}</p>
                        <p>Hệ số lương: {staff.salaryScale}</p>
                        <p>Số giờ làm thêm: {staff.overTime}</p>
                        </div>
                        <Card>
                            <p className="m-3">Lương: {(staff.salaryScale * 3000000 + staff.overTime * 200000).toFixed(0)}</p>
                        </Card>
                    </Card>
            </div>
        );
    });

    return (
        <div className="container">
            <p className='m-2'><Link to='/'>Nhân viên</Link> / Bảng lương</p>
            <div className="row mt-1">
                {list}
            </div>
        </div>
    );
}

export default StaffSalary;