import { Card, CardTitle, CardBody } from "reactstrap";
import { Component, useState } from "react";
import { FadeTransform } from "react-animation-components";

const RenderSalary = ({salary}) => {
    return(
        <FadeTransform in
            transformProps = {{
                exitTransform: "scale(0.5) translateY(-50%)"
            }}>
            <div>
                    <Card className="m-1" style={{ background: "#ADD8E6" }}>
                    <CardTitle className="m-2"><h2>{salary.name}</h2></CardTitle>
                        <CardBody style={{ background: "#ADD8E6" }}> 
                            <div >
                                <h5>Mã nhân viên: {salary.id}</h5>
                                <h5>Hệ số lương: {salary.salaryScale}</h5>
                                <h5>Số giờ làm thêm: {salary.overTime}</h5>
                            </div>
                            <div className="text-danger">
                                <h3>Lương: {(salary.salaryScale * 3000000 + salary.overTime * 200000).toFixed(0)}</h3>
                            </div>
                        </CardBody>
                    </Card>
            </div>
            </FadeTransform>
    )
}

class StaffSalary extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const staffSalary = this.props.salary.map((salarys) => {
            return (              
                <div key={salarys.id} className="col-lg-4 col-md-6 col-sm-12">  
                    <RenderSalary salary={salarys} />       
                </div>
            )
        })
            return(
                <div className="container">
                    <div className="row mt-1">
                        <h2 className="text-success">Bảng Lương</h2>
                        {staffSalary}
                    </div>
                </div>
            )
    }
}


export default StaffSalary;