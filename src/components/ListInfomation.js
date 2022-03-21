import React, { Component } from "react";
import { Card, CardImg, Button} from "reactstrap";
import { Link } from "react-router-dom";

class StaffList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            doB: "",
            startDate: "",
            department: "Sale",
            salaryScale: 1,
            annualLeave: 0,
            overTime: 0,
            salary: 30000,
            image: "/assets/images/alberto.png",
            touched: {
                name: false,
                department: false,
                salaryScale: false,
                doB: false,
                startDate: false,
                annualLeave: false,
                overTime: false
            },
            nameK: "",
            ModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.searchModal = this.searchModal.bind(this);
    }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.ModalOpen
        });
    }
    
    searchModal(event) {
        event.preventDefault();
        const name = event.target.name.value;
        this.setState({ nameK: name })
    }
    
    render() {
        const list = this.props.staffs.filter((val) => {
            if (this.state.nameK === "") return val;
            else if (
            val.name.toLowerCase().includes(this.state.nameK.toLowerCase())
        )
            return val;
        return 0;
    }).map((val) => {
        return (
            <div key={val.id} className="col-lg-2 col-md-4 col-sm-6">
                    <Link className="nav-link link-dark" to={"/staff/" + val.id}>
                        <Card onClick={() => this.props.onClick(val.id)}>
                            <CardImg src={val.image} />
                            <p style={{textAlign: "center"}}>{val.name}</p>
                        </Card>
                    </Link>
                </div>
            );
        });
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-6 mt-3">
                    <div className="row">
                        <div className="text text-white m-2">
                            <h4>Nhân Viên</h4>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-6">
                            <Button outline onClick={this.toggleModal}><span className="fa fa-plus fa-lg"></span></Button>
                        </div>
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
            </div>
          <div className="row row-shadow mb-2 mt-2">{list}</div>
        </div>
        );
    }
}

export default StaffList;
