const MessagesReducer = (state = {}, action) => {
  switch (action.type) {
    case "contact_data_success":
      return {
        ...state,
        Contactdata: action.result,
        ContactStatus: action.success,
      };

    case "contact_data_ERR":
      return {
        ...state,
        Contactdata: action.result,
        ContactStatus: action.success,
      };

    default:
      return state;
  }
};

export default MessagesReducer;
