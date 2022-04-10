import { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardTitle, CardBody } from "reactstrap";
import { FadeTranForm } from "react-animation-components";

class RenderDept extends Component {
    render() {
        return (
            <FadeTranForm in
                transformProps = {{
                    exitTransform: "scale(0.5) translateY(-50%)"
                }}>
                    <Link to = {`/departments/${this.props.dept.id}`}>
                      <Card className="m-4" style={{ background: "#ADD8E6" }}>
                        <CardTitle className="ms-1 p-2"><span className="fa fa-tag"/>{this.props.dept.name}</CardTitle>
                          <CardBody>
                            <CardText className="ms-4 p-2"><span className="fa fa-users"/>Số lượng nhân viên: {this.props.staffNum.length}</CardText>
                          </CardBody>
                      </Card>
                    </Link> 
                </FadeTranForm>
        )
    }
}


class Department extends Component {
    render() {
        const departments = this.props.departments.map((department) => {
            return (
                <div key={departments.id} className="col-lg-4 col-md-6 col-sm-12">
                    <RenderDept dept={department} staffNum={this.props.staff.filter((staff) => staff.departmentId === department.id)} />
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row mt-1">
                    {departments}
                </div>
            </div>
        );
    }
    
}

export default Department