import imApi from "../../api/imApi";

export const fetchUDData = () => {
    return (dispatch) => {
        return imApi.fetchBuyerUserdetails().then(response => {          
            //console.log(response);
            dispatch({
                type: "FETCH_UD_SUCCESS",
                payload: response
            });
            return true;
        }).catch(error => {
            dispatch({
                type: "FETCH_UD_FAILURE",
                payload: error
            })
        })
    }
}
  