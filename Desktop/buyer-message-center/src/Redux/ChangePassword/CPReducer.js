const CPreducer = (state = {}, action) => {
  switch (action.type) {
    case "SEND_OTP_SUCCESS":
      return {
        ...state,
        otpData: action.payload,
      };

    case "SEND_OTP_FAILURE":
      return {
        ...state,
        otpError: action.payload,
      };

    case "CHANGE_PASSWORD_SUCCESS":
      return {
        ...state,
        changePasswordData: action.payload,
      };
    case "CHANGE_PASSWORD_FAILURE":
      return {
        ...state,
        changePasswordError: action.payload,
      };

    default:
      return state;
  }
};

export default CPreducer;
