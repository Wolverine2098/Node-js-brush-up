import { combineReducers } from "redux";
import UDreducer from "./UserDetails/UDReducer";
import CPReducer from "./ChangePassword/CPReducer";
import MessagesReducer from "./messagesReducer";

const rootReducer = combineReducers({
  // UserDetails: UDreducer,
  // ChangePassword: CPReducer,
  MessagesReducer: MessagesReducer,
});

export default rootReducer;
