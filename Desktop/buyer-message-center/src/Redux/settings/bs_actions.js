import imApi from "../../api/imApi";
export const fetchSetting_Data = () => {
    return (dispatch) => {
        dispatch(fetchBSRequest());
        imApi.fetchBuyerSettingsdetails()
        .then(response => {          
            let d = response;
            console.log(d);
            dispatch(fetchBSSuccess(d))
        })
        .catch(error => {
            dispatch(fetchBSFailure(error.message))
        })
    }
}

export const fetchBSRequest = () => {
    return {
        type: "FETCH_BS_REQUEST"
    }
}
  
export const fetchBSSuccess = (data) => {
    return {
        type: "FETCH_BS_SUCCESS",
        payload: data
    }
}
  
export const fetchBSFailure = (error) => {
    return {
        type: "FETCH_BS_FAILURE",
        payload: error
    }
}