import imApi from "../../api/imApi";

export const sendOTP = (params) => {
  return async (dispatch) => {
    try{
      const res = await imApi.fetchOTPVer(params);
      dispatch({
        type: "SEND_OTP_SUCCESS",
        payload: res
      });
    }
    catch(err){
      dispatch({
        type: "SEND_OTP_FAILURE",
        payload: err
      });
    }
    
  };
};

export const changePassword = (params) => {
  return async (dispatch) => {
    try{
      const res = await imApi.fetchChangePassword(params);
      dispatch({
        type: "CHANGE_PASSWORD_SUCCESS",
        payload: res
      });
    }
    catch(err){
      dispatch({
        type: "CHANGE_PASSWORD_FAILURE",
        payload: err
      });
    }
  };
};
  