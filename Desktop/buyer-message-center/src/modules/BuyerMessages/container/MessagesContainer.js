import { connect } from "react-redux";
import MsgPage from "../components/MsgPage/MsgPage";
import { messagesAPI } from "../actions/messageAction";
const mapStateToProps = (state) => {
  // console.log(state);
  return { UserDetails: state.UserDetails, BuyerReducer: state.BuyerReducer };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUserData: () => dispatch(fetchUDData()),
    fetchContactListData: (params) =>
      dispatch(messagesAPI.messageContactListData(params)),
    // disOtp: (params) => dispatch(settingAPI.disOtp(params)),
    // disableUser: (params) => dispatch(settingAPI.disableUser(params)),
  };
};

// export default Settings;

export default connect(mapStateToProps, mapDispatchToProps)(MsgPage);
