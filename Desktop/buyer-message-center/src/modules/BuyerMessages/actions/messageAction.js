export const messagesAPI = {
  messageContactListData(params) {
    return async (dispatch) => {
      try {
        const res = await getData(
          "POST",
          "/miscreact/ajaxrequest/messages/contactlist",
          params
        );
        dispatch({ type: "contact_data_success", success: true, result: res });
      } catch (error) {
        dispatch({ type: "contact_data_ERR", success: false, result: error });
      }
    };
  },
};
