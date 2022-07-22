import { connect } from 'react-redux';
import LoginComponent from '../components/Login';  

const mapStateToProps = state => {
  // console.log("printing from mydrive.js");
  // console.log(state.MyDrive);
  return {}
}

const mapDispatchToProps = dispatch => {
	return {
	}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(LoginComponent);