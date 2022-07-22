let GblComFunc = require('../../../GblComFunc'),
    appShell = GblComFunc.APP_SHELL_STRUCTURE();

function loginShellStruct() {
    appShell.TITLE = '<title>Sign-in | IndiaMart - Global Marketplace - Connecting Buyers with Suppliers</title>';    
    appShell.STATE = '';
    appShell.ROOT_MT = 'myLogin';
    appShell.META = '<meta name="robots" content="noindex,nofollow">';
    appShell.CANONICAL_LINKS = '<!-- <link rel="manifest" href="/manifest.json"/> --><link rel="apple-touch-icon" href="https://my.imimg.com/apple-touch-icon.png"/><link rel="apple-touch-icon-precomposed" href="https://my.imimg.com/apple-touch-icon-precomposed.png"/>';
    appShell.BODY_SCRIPTS = '';
    appShell.HEAD_SCRIPTS = '';
    // appShell.BODY_HTML = `<div id="sign_in"></div>
    // <div class="content-wrapper">
    // <style>.pbl-sr {background: url("//my.imimg.com/gifs_new/alertIconNew.gif") no-repeat scroll left center #FFF8EC; border-bottom: 1px dotted #E6CCB3; border-top: 1px dotted #E6CCB3; font-family: Trebuchet MS; margin: 30px auto 0; padding: 8px 10px; }</style>
    // <div style="margin:0;width:100%!important;background:#fff;min-height:700px;margin-bottom:15px;" class="f1" >
    // <div style="background-position:0px -30px;height:120px;margin-left:18px; margin-right:20px;" class="pbl-sr f1"><div style="padding:25px 10px 0px 130px; font-weight:bold; line-height:20px">For the security reasons, you are required to provide your IndiaMART password to update your critical information and gain full access of all the features available on MY IndiaMART. <a href="javascript:void(0)" onClick="signIn('','','','B')"> Sign in to continue. </a></div>
    // <div id="mobile" style="display:none"></div>
    // </div>
    // </div>
    // </div>`
    appShell.STATUS = 200;
    appShell.FOOTER = 'DEFAULT';
}
function getLoginPage(req, res, shellCallBck) {
    loginShellStruct();
    shellCallBck(res, appShell)
}

module.exports = getLoginPage;