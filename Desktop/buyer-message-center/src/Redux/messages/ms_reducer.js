let Ms_initialstate = {
  ms_mp_data: {},
  loader: 1,
  fail: 0,
};

const msmp_reducer = (state = Ms_initialstate, action) => {
  switch (action.type) {
    case "FETCH_MS_REQUEST":
      return {
        ...state,
        loader: 1,
      };

    case "FETCH_MS_SUCCESS":
      return {
        ...state,
        ms_mp_data: action.payload,
        loader: 0,
      };

    case "FETCH_MS_FAILURE":
      return {
        ...state,
        fail: 1,
        loader: 0,
      };

    default:
      return state;
  }
};

export default msmp_reducer;
