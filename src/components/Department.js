import { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardTitle, CardBody } from "reactstrap";
import { FadeTransform } from "react-animation-components";

const RenderDept = ({ dept }) => {
        return (
            <FadeTransform in
                transformProps = {{
                    exitTransform: "scale(0.5) translateY(-50%)"
                }}>
                    <Link to = {`/departments/${dept.id}`}>
                      <Card className="m-4" style={{ background: "#ADD8E6" }}>
                        <CardTitle className="ms-1 p-2"><span className="fa fa-tag"/>{dept.name}</CardTitle>
                          <CardBody>
                            <CardText className="ms-4 p-2"><span className="fa fa-users"/>Số lượng nhân viên: {dept.numberOfStaff}</CardText>
                          </CardBody>
                      </Card>
                    </Link> 
                </FadeTransform>
        )
    }

class Department extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const dept = this.props.dept.map((department) => {
            return (
                <div key={department.id} className="col-lg-4 col-md-6 col-sm-12">
                    <RenderDept dept={department} />
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row mt-1">
                    {dept}
                </div>
            </div>
        );
    }
}

export default Department