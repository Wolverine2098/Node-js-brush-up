import imApi from "../../api/imApi";
export const fetchContactList_Data = () => {
  return (dispatch) => {
    dispatch(fetchMSRequest());
    imApi
      .fetchContactDetail()
      .then((response) => {
        let d = response;
        console.log(d);
        dispatch(fetchMSSuccess(d));
      })
      .catch((error) => {
        dispatch(fetchMSFailure(error.message));
      });
  };
};

export const fetchMSRequest = () => {
  return {
    type: "FETCH_MS_REQUEST",
  };
};

export const fetchMSSuccess = (data) => {
  return {
    type: "FETCH_MS_SUCCESS",
    payload: data,
  };
};

export const fetchMSFailure = (error) => {
  return {
    type: "FETCH_MS_FAILURE",
    payload: error,
  };
};
