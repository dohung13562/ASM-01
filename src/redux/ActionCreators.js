import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const AddStaffSuccess = (staff) => ({
    type: ActionTypes.ADD_STAFF_SUCCESS,
    payload: staff
});
export const addStaff = (staff) => (dispatch) => {
    return fetch(baseUrl + "staffs", {
        method: "POST",
        body: JSON.stringify(staff),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then((response) => {
        if (response.ok) {
            return response
        } else {
            var error = new Error(
                "Error" + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
        }
    },
    (error) => {
        throw error;
    })
    .then((response) => response.json())
    .then((response) => dispatch(AddStaffSuccess(response)))
    .catch((error) => {
        console.log("Post staffs", error.message);
        alert("Your staff could not be posted\nError:" + error.message);
    })
};

export const deleteStaffSuccess = (id) => ({
    type: ActionTypes.DELETE_STAFF_SUCCESS,
    payload: id
});
export const deleteStaffLoading = () => ({
    type: ActionTypes.DELETE_STAFF_LOADING
})
export const deleteStaff = (id) => (dispatch) => {
    if (alert("Are you sure to delete this staff?")) {
        return fetch(baseUrl + `staff/${id}`, {
            method: "DELETE"
    })
    .then(() => dispatch(deleteStaffSuccess(id)))
    } else return
};

export const updateStaffSuccess = (staff) => ({
    type: ActionTypes.UPDATE_STAFFS_SUCCESS,
    payload: staff
})
export const updateStaff = (staff) => (dispatch) => {
    return fetch(baseUrl + "staffs", {
        method: "PATCH",
        body: JSON.stringify(staff),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then((response) => {
        if (response.ok) {
            return response
        } else {
            var error = new Error(
                "Error" + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
        }
    },
    (error) => {
        throw error;
    })
    .then((response) => response.json())
    .then((response) => dispatch(updateStaffSuccess(response)))
    .catch((error) => {
        console.log("Update staffs", error.message);
        alert("Your staff could not be updated\nError:" + error.message);
    })
};

export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true));
    return fetch(baseUrl + "staffs")
    .then((response) => response.json())
    .then((staffs) => dispatch(fetchStaffsSuccess(staffs)))
    .catch((error) => dispatch(fetchStaffsFailed(error.message)))
};
export const fetchStaffsFailed = (errmess) => ({
    type: ActionTypes.FETCH_STAFFS_FAILED,
    payload: errmess
})
export const fetchStaffsSuccess = (staffs) => ({
    type: ActionTypes.FETCH_STAFFS_SUCCESS,
    payload: staffs
})
export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
})

export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading(true));
    return fetch(baseUrl + "departments")
    .then((response) => {
        if (response.ok) {
            return response
        } else {
            var error = new Error(
                "Error" + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
        }
    },
    (error) => {
        throw error;
    })
    .then((response) => response.json())
    .then((response) => dispatch(departmentsfailed(response)))
    .catch((error) => {
        console.log("Department staffs", error.message);
        alert("Your staff could not be departmented\nError:" + error.message);
    })
}
export const departmentsfailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
})
export const departmentsLoading = () => ({
    type: ActionTypes.DEPARTMENTS_LOADING
})
export const addDepartments = (staffs) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: staffs
})

export const fetchStaffsSalary = () => (dispatch) => {
    dispatch(staffsSalaryLoading(true));
    return fetch(baseUrl + "staffsSalary")
    .then((response) => {
        if (response.ok) {
            return response
        } else {
            var error = new Error(
                "Error" + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
        }
    },
    (error) => {
        throw error;
    })
    .then((response) => response.json())
    .then((response) => dispatch(staffsSalaryfailed(response)))
    .catch((error) => {
        console.log("StaffsSalary staffs", error.message);
        alert("Your staff could not be staffsSalaryed\nError:" + error.message);
    })
}
export const staffsSalaryfailed = (errmess) => ({
    type: ActionTypes.STAFFSSALARY_FAILED,
    payload: errmess
})
export const staffsSalaryLoading = () => ({
    type: ActionTypes.STAFFSSALARY_LOADING
})
export const addStaffsSalary = (staffs) => ({
    type: ActionTypes.ADD_STAFFSSALARY,
    payload: staffs
})