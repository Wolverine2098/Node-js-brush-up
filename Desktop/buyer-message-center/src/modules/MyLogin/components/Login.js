import * as footer from '../../Footer/components/Footer'
import React,{ Component } from 'react';
import { connect } from 'react-redux';  
// import { fetchSetting_Data } from "../../../../Redux/Settings/settings";
import { store } from '../../../Redux/store';
import {Link} from "react-router-dom";
import { fetchUDData } from '../../../Redux/UserDetails/UDActions';
import '../css/Login.css'

class LoginComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    if(typeof signIn !== 'undefined'){
      signIn('','','','B');
    }
  }

  render(){
  return (
    <>
    <div id="t0901_bewrapper" class="be-frmwrap bedsnone"><div id="t0901_blkwrap" class="be-blckbg"></div><div class="be-frmcont"><div id="t0901_thankDiv" class="be-mcont bezid bedsnone"></div><div id="t0901_mcont" class="be-mcont bezid"><div id="t0901_leftS" class="be-Lsc"><div class="belodrbg bedsnone" id="t0901_belodrYT"><div class="blloader"></div></div><div id="t0901_leftsection"></div></div><div id="t0901_leftR" class="be-Rsc  be-frmpop"><div id="t0901_cls" class="be-cls"></div><div id="t0901flagdiv" class="bedsnone"><dl id="t0901flag" class="dropdown bebdr be-flg"></dl></div><div id="t0901_rightsection"></div><div id="t0901_byrinfo" class="befs14 beinfo eqBotm bedsnone"></div><input type="hidden" id="t0901_tmpId"/></div></div></div></div>
    <div class="hm1 bbc fxmn" id="res-mob1">

    <script type="text/javascript">
        {`function selecttext(event, ui){
        if (typeof( ui.item.data) != 'undefined' && typeof( ui.item.data.catid) != 'undefined' && ui.item.data.catid != ''){
$('#hdr_frm').append( "<input type='hidden' name='catid' id='catid' value='"+ui.item.data.catid+"' >" );
}
                let source_val = '';
                if (typeof( ui.item.askwdSel) != 'undefined' && ui.item.askwdSel == 1){
                if(typeof(ui.item.trackid) != 'undefined'){
                    source_val = ui.item.trackid;
                }
                else{
                    source_val ="as";
                }
                //let source_val = decodeURI(ui.item.trackid);
                $('#hdr_frm').append( "<input type='hidden' name='src' id='src' value='"+source_val+"' >" );
 }
            this.value = ui.item.value;
            if(event.keyCode == 13){
                document.getElementById("btnSearch").click();
            }
            else if(event.handleObj.origType=="click"){
                document.getElementById("btnSearch").click();
            }
        }`}
    </script>
    <div class="content-wrapper">
    <div class="f1 f2" >
    <div class="pbl-sr f1 f3"><div class="security-msg">For the security reasons, you are required to provide your IndiaMART password to update your critical information and gain full access of all the features available on MY IndiaMART. <a href="javascript:void(0)" onClick={() => signIn('','','','B')}> Sign in to continue. </a></div>
    <div id="mobile dn"></div>
    </div>
    </div>
    </div>
    </div>
    <footer.footNav/>
    </>
  )
  }
}

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
