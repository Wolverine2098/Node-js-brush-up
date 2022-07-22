function shellHeader(){
  let srchUrl = '';
        let plchldr = "Enter product / service to search";
        let srch_btn = "Search";
        let hdsrch='class ="hd_srch Hd_fl"';
        let verified_supplied_popup ='<div class="blk_scrn Hd_dbn" id="ver_sc"></div><div class="ver_cert Hd_dbn"></div>';
        let gtbstprc = "Get Best Price";
        let shopnow = '<div id="shopNow" style="display:none"></div>';
        let Covid19 = '<div id="cvdSp" style="display:none"></div>';
        let lead_man='<div id="lead_manager" style="display:none" class="head_Icn hdLeadMn"><span class="nme Hd_dib cpo hdBlk Hd_dib"></span></div>';
        let buyleads='<div id="lead_cen" style="display:none" class="head_Icn hdLeadMn"><span class="nme Hd_dib cpo hdBlk Hd_dib"></span></div>';
        let prod='<div id="prod_cen" style="display:none" class="head_Icn"><span class="nme Hd_dib cpo hdBlk Hd_dib"></span></div>';
        let tools='<div id="sell-center" style="display:none"></div><div id="help-center" style="display:none"></div><div id="message-center" style="display:none"></div>';
        let login = '<div class="hgtb Hd_pr Hd_bxCt" id="lshead"></div>';
  return `
  <script>
  var glmodid = "MY";
    var srchUrl = location.hostname.match(/^dev/)  ? 'https://dev-dir.indiamart.com/search.mp?ss=' :location.hostname.match(/^stg/) ? 'https://stg-dir.indiamart.com/search.mp?ss=' :'https://dir.indiamart.com/search.mp?ss=';
    function readCookie(cname) {
      var name = cname + "=";
      try {
          var decodedCookie = decodeURIComponent(document.cookie);
      } catch(err) {
          var decodedCookie = unescape(document.cookie);
      }
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    function getparamVal(cookieStr, key) {
      if (cookieStr > "") {
        var val = "|" + cookieStr + "|";
        var pattern = new RegExp(".*?\\\\|" + key + "=([^|]*).*|.*");
        return val.replace(pattern, '\$1');
      } else {
        return "";
      }
    }
  </script>
  <header class="headercntrl Hd_pr">
    ${verified_supplied_popup}
    <div class="gl-wrapper" id="header"><div class="nwHdr"><a href="https://www.indiamart.com/" class="hd_logo Hd_db hdlft Hd_fl">IndiaMART</a><div class="hdw hdLk clFix Hd_pr Hd_fl"><div style="display: inline-flex;"><div class =${hdsrch} id="hdSrh"><div class="wrpd3 select-wrapper Hd_pr Hd_fl cpo" id="drpn" style="display:none"></div><form name="searform" method="get" onsubmit="return validator(document.searform);" class ="Hd_pr" id="hdr_frm" action=${srchUrl}> <input type="submit" id="btnSearch" class="hd_srBtn ch_fr Hd_pa cpo" value=${srch_btn} data-click="^search_button|header"/> <input placeholder=${plchldr} id="search_string" name="ss" class="hd_txt ch_fr Hd_fl"/> </form> </div>
    <a href="https://my.indiamart.com/blgen/postbl?modid=IMHOME" id="pstBuy" class="pstBuy Hd_dib ih-pbr ch_post_buy Hd_fl">${gtbstprc}</a></div>
    <div id="cssmenu1" class="fr1 headermenu Hd_pr">${shopnow} ${Covid19} ${lead_man} ${buyleads} ${prod} ${tools} ${login}</div></div></div> </div> <div class="ch_clb" id="loginstrip"></div> <div id="sign_in"></div> <div id="bl_overlay_layer_v2"></div> <div id="boxes"></div><div id="miclag"></div><div id="blkSrn" class="hd_blkSrn Hd_dbn"></div><div id="blk_ctpup" style="display:none"><div id ="chat_popup"></div></div>
  </header>
  
  <script>
   $('#hdr_frm').attr('action',srchUrl);
   var cookie = readCookie("ImeshVisitor");
    if ( cookie != ""){
      var namep=getparamVal(decodeURIComponent(cookie), 'fn');
      var forname = '<span class="rmv Hd_dib cpo ico-usr Hd_pr">Hi '+namep+'</span>';
      document.getElementById("lshead").innerHTML = forname;
    }
    else{
      var sgnhtm = '<a class="rmv Hd_dib cpo ico-usr" href="https://my.indiamart.com"><span class="Hd_pr">Sign In</span></a>';
      document.getElementById("lshead").innerHTML = sgnhtm;
    }

    var hd_webLoc=location.hostname;
    var hd_UrlPri = hd_webLoc.match(/^dev/) ? "dev-" : (hd_webLoc.match(/^stg/)) ? "stg-" : "";
    var page_sel = location.hostname.indexOf(hd_UrlPri + "seller") == 0 ? 1 : 0;
    var page_trd = location.hostname.indexOf(hd_UrlPri + "trade") == 0 ? 1 : 0;
    var page_tend = location.hostname.indexOf(hd_UrlPri + "tenders") == 0 ? 1 : 0;
    if(typeof ims!== 'undefined' && typeof ims.hcq!== 'undefined' && typeof ims.hcq!== '' ){
      changeselect_city(ims.hcq);
    }else{
      var referrer = document.referrer;
      if(referrer == ""||(referrer.match(/.indiamart.com/))){
        var hd_ct = readCookie('hd_ctval');
        city=(hd_ct)?getparamVal(hd_ct,'ctval'):"All India";
        city=(city=="undefined" || city=="Undefined")?"All India":city;
        changeselect_city(city);
      }else{
        changeselect_city("All India");
      }  
    }

    function hdr_getusercity(city){
      var city =city||"All India";
      city=(city==''||city=="null"||city==null)?'All India':city;
      city=city.replace('-', ' ');
      var splitcity = city.toLowerCase().split(' ');
      for (var i = 0; i < splitcity.length; i++) {
        splitcity[i] = splitcity[i].charAt(0).toUpperCase() + splitcity[i].substring(1);  
      }
      city = splitcity.join(' ');
      var hddrpdn2 = '<button id="hd_searchPlace" class="hd_cFl cpo"><span id="hd_usercity" class="Hd_db">'+city+'</span></button><div id="city_hold" class="hd_cSrb Hd_dbn"><label for="hd_city_sugg"></label><input type="text" id="hd_city_sugg" placeholder ="Enter City" value ="Enter City" class="srin ui-autocomplete-input" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true" onkeyup="AlInd_Op()"><div class="hd_alop Hd_dbn cpo" id="all_India" >All India</div></div>';
      document.getElementsByClassName("select-wrapper")[0].classList.add("hd_cFMn");
      document.getElementsByClassName("select-wrapper")[0].innerHTML = hddrpdn2;
      document.getElementsByClassName("select-wrapper")[0].style.display = "block";
    }

    function changeselect_city(city) {
      var cookie = readCookie('ImeshVisitor');
      var imurldata = getparamVal(cookie, 'utyp');
      if (!(page_sel || page_trd || page_tend)&&!((imurldata == "P") && (window.location.href.indexOf("easybuy") == -1))) {
        hdr_getusercity(city);
      }
    }

    function setHdCountry()
    {
      var hdIploc='',hdCcode='';
      var hdSrch="iploc=";
      if (document.cookie.length > 0){
        var offset = document.cookie.indexOf(hdSrch);
        if (offset != -1){
          offset += hdSrch.length;
          end = document.cookie.indexOf(";", offset);
          if (end == -1)
            end = document.cookie.length;
          hdIploc=unescape(document.cookie.substring(offset, end));
        }
      }
      if(hdIploc != '' && hdIploc.indexOf('gcniso=') != -1){
        var hdcon = hdIploc.split('gcniso=');
        if(typeof(hdcon[1])!="undefined")
        var hdcarr = hdcon[1].split('|');
        hdCcode= hdcarr[0];
      }
      if(hdCcode == '')
      {
        var hdDate = new Date();
        var hdgmt = -hdDate.getTimezoneOffset() / 60;
        if (hdgmt != 5.5)
          hdCcode = 'OTHER';
        else
          hdCcode = 'IN';
      }
      if(typeof(hdCcode)!="undefined" && hdCcode != '' && hdCcode == 'IN')
      {
        var hdInpt = document.getElementsByClassName('duet');
        for (var i = 0, len = hdInpt.length; i < len; i++) {
          var hdMid = hdInpt[i];
          var hdContent = hdMid.innerHTML;
          if(hdContent.match(/^\\+91/)){
            hdContent = hdContent.replace('+91-','0');
            hdMid.innerHTML=hdContent;
          }
        }
      }
      else if(typeof(hdCcode)!="undefined" && hdCcode != '' && hdCcode != 'IN')
      {
        var hdInpt = document.getElementsByClassName('duet');
        for (var i = 0, len = hdInpt.length; i < len; i++) {
          var hdMid = hdInpt[i];
          var hdContent = hdMid.innerHTML;
          if(hdContent.match(/^0/)){
            hdContent = hdContent.replace('0','+91-');
            hdMid.innerHTML=hdContent;
          }
        }
      }
    }

    if (window.addEventListener)
      window.addEventListener("load", function(){setHdCountry();}, false);
    else if (window.attachEvent)
      window.attachEvent("onload", function(){setHdCountry();});
    else
      window.onload = function(){setHdCountry();};
  </script>`;
}
function shellLeftnav(){
  return `
  <div className="side-menu">
  </div>`;
}
function shellCSS() {
  return `<style>
 body{min-height:1200px}.Hd_bxCt{box-sizing:content-box}#err3{color:#fff;margin-top:5px}#lshead{line-height:15px;float:right!important}.h_clr{color:#2e3192!important}.h_ic10:before,.h_ic11:before,.h_ic16:before,.h_ic19:before,.h_ic1:before,.h_ic21:before,.h_ic2:before,.h_ic34:before,.h_ic3:before,.h_ic40:before,.h_ic41:before,.h_ic4:before,.h_ic5:before,.h_ic6:before,.h_ic7:before,.h_ic8:before{content:"";height:20px;width:40px;position:absolute;left:5px;top:7px}.h_ic1:before{background-position:-8px -477px}.h_ic2:before{background-position:-8px -425px}.h_ic3:before{background-position:-8px -7px}.h_ic4:before{background-position:-8px -60px}.h_ic5:before{background-position:-8px -164px}.h_ic6:before{background-position:-8px -372px}.h_ic7:before{background-position:-8px -215px}.h_ic8:before{background-position:-8px -797px}.h_ic40:before{background-position:-9px -1627px}.h_ic41:before{background-position:-12px -1660px}.h_ic10:before{background-position:-8px -112px}.h_ic11:before{background-position:-8px -373px}.appshd.h_ic11:before{background-position:-17px -370px;top:8px;left:1px}.stFrn.h_ic11:before{left:13px}.h_ic16:before{background-position:-7px -596px}.appshd.h_ic16:before{top:10px}.h_ic19:before{background-position:-15px -557px;left:-3px;top:3px;width:20px}.h_ic21:before{background-position:-10px -1005px}.h_ic24:before,.h_ic25:before,.h_ic26:before,.h_ic27:before,.h_ic28:before,.h_ic29:before,.h_ic30:before,.h_ic31:before,.h_ic32:before,.h_ic33:before,.h_ic35:before,.h_ic36:before,.h_ic37:before,.h_ic38:before,.h_ic39:before{content:"";height:18px;width:39px;position:absolute;left:7px;top:7px}.h_ic24:before{background-position:-14px -1034px}.h_ic25:before{background-position:-14px -1066px}.h_ic26:before{background-position:-14px -1100px}.h_ic27:before{background-position:-14px -1132px}.h_ic28:before{background-position:-14px -1164px}.h_ic29:before{background-position:-12px -1192px}.h_ic30:before{background-position:-13px -1224px}.h_ic31:before{background-position:-12px -1262px}.h_ic32:before{background-position:-13px -1296px}.h_ic33:before{background-position:-13px -1332px}.h_ic34:before{background-position:-8px -1368px}.h_ic35:before{background-position:-13px -1404px}.h_ic36:before{background-position:-14px -1437px}.h_ic37:before{background-position:-10px -1477px}.h_ic38:before{background-position:-13px -1520px}.h_ic39:before{background-position:-16px -1561px}.hover-new-user{padding:6px;line-height:normal;color:#757575;text-align:center}.u_sigin{border-bottom:1px solid #eee}#cssmenu li span{text-decoration:none}.edtM.edit{margin:15px 10px 10px 0;float:right}.cont_s{width:110px;margin:10px auto;padding:0!important;font-size:14px;line-height:35px;border:1px solid #00a699;text-align:center;border-radius:3px;color:#fff!important;background:#00a699}.cont_s:hover{background-color:#007a6e;color:#fff!important}#dialog{width:800px;height:400px;position:fixed;z-index:2000}.closeb{background:#000 none repeat scroll 0 0;color:#fff;font-size:12px;padding:4px;right:0;top:0}#iph61{top:332px;left:230px}.frm-cntr2{padding:7px 9px;margin:0 auto;border:solid 1px #999;font-size:16px;width:140px;border-radius:2px}.btn-pop{padding:7px 14px;background-color:#00a699;color:#fff;border:none;font-size:17px;font-weight:700;margin-left:12px;border-radius:2px}#mask1{background:#000;position:fixed;opacity:.7;top:0;bottom:0;left:0;right:0;z-index:1000}#joinf a:hover,.hover-new-user p{padding-left:5px}.hover-new-user p:hover{text-decoration:underline}.butls2>a.trdAd{padding-left:15px}.clear{clear:both}#cssmenu li:hover{text-decoration:underline}.app-link{right:57px;top:257px}.app-link a{padding:17px 15px;font-size:0;width:68px;margin:0 8px 0 0}#msg_cont1{top:367px;left:234px;width:420px;color:#eceaea;font-size:13px}p.ttl{color:#000!important;font-weight:700;padding:10px 17px;text-align:left}.im_mic{position:absolute;right:0;top:51px;left:530px;width:40px;margin:0 auto;cursor:pointer}.Tip:hover .Tiptext{visibility:visible}@-webkit-keyframes hlsten{0%{-webkit-transform:scale(.5)}25%{-webkit-transform:scale(.25)}35%{-webkit-transform:scale(.1)}65%{-webkit-transform:scale(.35)}80%{-webkit-transform:scale(.5)}100%{-webkit-transform:scale(.25)}}.hdNot.lft{left:47px}.butls2{width:50%!important;box-sizing:border-box;color:#757575;font-size:13px}.appshd{padding-left:36px;height:42px;line-height:42px;text-align:left;color:#333!important;font-size:13px!important}.appshd li{line-height:42px!important}.appshd .h_ic16{top:11px;left:2px}.lgactive{border:1px solid #0078ec!important;color:#0078ec!important;background:#fff!important}.hdPdn{padding-left:22px!important}.appshd .h_ic11{top:12px}#help-center .h_ic13:hover:before{background-position:-357px -52px!important}.hdLeadMn .lmIcn:before{background-position:-460px -93px!important;width:22px;top:-3px}.bDlIcn:before{background-position:-456px -52px!important;width:26px;top:-3px}.pdIcn:before{background-position:-408px -52px!important;width:20px;left:22px;top:-3px}.h_ic23:hover:before{background-position:-387px -233px}.h_ic14:hover:before{background-position:-424px -232px}.hdLeadMn .lmIcn:hover:before{background-position:-460px -133px!important}.pdIcn:hover:before{background-position:-408px -89px!important}#lshead span .edtHo:hover{text-decoration:underline!important}.butls2.slT{width:47%!important}.butls2.blT{width:53%!important}#cht_cross{z-index:1;right:10px;color:#fff;font-size:16px;top:5px}.hDiWrp{display:block}@media only screen and (min-width:1520px){#lshead>.nme>a>span{max-width:130px}}@media only screen and (min-width:1290px) and (max-width:1515px){#lshead>.nme>a>span{max-width:140px}}@media only screen and (min-width:980px) and (max-width:1280px){#lshead>.nme>a>span{max-width:75px}.hdNot.lft{left:38px}}.ts_cmpn_dtl li{display:flex;margin-top:10px}.db,.ts_cmpn_dtl li span{display:block}.ts_tik{min-width:13px;width:13px;height:9px;margin:4px 10px 0 0;fill:#149447}.certLgo{width:48px;height:48px;border-radius:50%;border:2px solid #149447;margin:45px auto 22px}.certLgo .ts_tik{width:27px;height:20px;margin:0}.certLgo:after{content:"";position:absolute;width:48px;height:8px;left:-1px;bottom:-3px;background-color:#149447}.ts_dsgn{width:50px;height:50px;position:absolute;background-color:#fff;fill:#a2a2a2;z-index:2}.ts_lt_dsgn{left:8px;top:8px}.ts_rt_dsgn{right:8px;top:8px;transform:rotate(90deg)}.ts_rb_dsgn{right:8px;bottom:8px;transform:rotate(180deg)}.ts_lb_dsgn{left:8px;bottom:8px;transform:rotate(270deg)}.ts_inner_ln{border:2px solid #a2a2a2}.ts_inner_ln:after,.ts_inner_ln:before{content:"";position:absolute;z-index:2;left:8px;right:8px;top:8px;bottom:8px}.ts_inner_ln:before{z-index:1;border:2px solid #a2a2a2}.certmain{min-height:120px;flex-direction:column}.ver_logo img{width:70px}.clos_btn,.clos_cert{width:20px;height:20px;position:absolute;z-index:2}.clos_cert{display:flex;top:-2px;right:-30px;justify-content:center;align-items:center}.clos_btn{top:0;left:0}.clos_cert svg{width:20px;height:20px;position:relative;z-index:1;fill:#f1f1f1}.as_ui-widget-content.hd_ctfltr,.hd_ctfltr{width:165px!important;box-shadow:0 0 0 #ccc!important;border:none!important;margin-top:10px!important}.hd_ctfltr.ui-menu .ui-menu-item a{font-size:13px!important;color:#333!important;padding:6px 10px!important;text-indent:0}.hd_Ovr{overflow:hidden!important}.hd_Ovr body{overflow:scroll!important;height:100%}
      </style>`;
}
function shellJS(state) {
  return `
${state ? 'window.__INITIAL_STATE__ = ' + JSON.stringify(state) + ';' : ''}
let deferredPromptA2hs;
let a2Prompt;
(function(){    
  window.addEventListener('beforeinstallprompt', function(event) {               
      event.preventDefault();
      let now = new Date();
      let timeout = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds
      if(localStorage.a2hsInstallTime){
          if(now.getTime() - localStorage.a2hsInstallTime >= timeout){
            deferredPromptA2hs = event;
            a2Prompt = event;
            if(document.getElementById("a2hsbt")){document.getElementById("a2hsbt").style.display="block";} 
          }
      } else {
        localStorage.a2hsInstallTime = now.getTime() - timeout;
        deferredPromptA2hs = event;
        a2Prompt = event;
        if(document.getElementById("a2hsbt")){document.getElementById("a2hsbt").style.display="block";}
      }

    });
})();

if (document.cookie && document.cookie.indexOf('adminiil') > -1) {
  let data = '';
  let d = new Date();
  d = d - 3600;
  document.cookie = "v4iilex=;expires=" + d + ";path=/";
  document.cookie = "adminiil=;expires=" + d + ";path=/";
  document.cookie = "ImeshVisitor=;expires=" + d + ";path=/";
  document.cookie.split(";").forEach(function(c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/;domain=.indiamart.com")
  })
}

function getImCookie(e) {
  e.name;
  let n, t = !1,
      o = new Array;
  o = document.cookie.split(";");
  for (let a = 0; a < o.length; a++) {
      let i = o[a];
      if(i.length>0){
         i = i.trim();
      }
      if (i.replace(/^\s+|\s+$/g, "").split("=")[0] == e.name) {
          let c = (i = unescape(i)).indexOf(e.name + "=");
          switch (n = c > -1 ? i.substring(e.name.length + 1) : "", e.flag) {
              case 0:
                  c > -1 && (t = !0);
                  break;
              case 1:
                  t = -1 != c && splitWithPipe(n);
                  break;
              case 2:
                  t = e.keyValue ? splitWithPipe(n)[e.keyValue] : splitWithPipe(n);
                  break;
              default:
                  t = splitWithPipe(n)
          }
      }
  }
  return t
}

//seller HNF scripts
function myReadCookieforGA(name){
  let search = name + "="
  if (document.cookie.length > 0){
      offset = document.cookie.indexOf(search)
      if (offset != -1){
          offset += search.length
          end = document.cookie.indexOf(";", offset)
          if (end == -1) end = document.cookie.length
              return unescape(document.cookie.substring(offset, end))
      }
  }
}
//seller end

function splitWithPipe(e) {
  let a = new Array;
  a = e.replace(new RegExp("\\\\+", "g"), " ").split("|");
  let g = {};
  for (i = 0; i < a.length; i++) {
      if (1 == a.length) {
          return a[0]
      }
      let h = a[i];
      g[h.split("=")[0]] = h.split("=")[1]
  }
  return g
}

  function scriptsLoader()
  { 
  handleMainJS();
  removeOldLS();
  // if(!getImCookie({name : 'webPSupport',flag : 0})){checkWebPSupport()}
 
  //SWListen();
  if (navigator.connection){
  navigator.connection.addEventListener('change', connectionCheck);
  connectionCheck();
  }
  }
  function connectionCheck() {
      if (navigator.connection && navigator.connection.effectiveType) {
          const connectionType = navigator.onLine 
              ? navigator.connection.effectiveType
              : 'offline';
              let isSlowConnection='';
              if (/\slow-2g|2g/.test(connectionType)) {
                  isSlowConnection = true;
                } 
              let slowNetDiv = document.getElementById('slow_net_pop');
              if(slowNetDiv)
              {
                  if(isSlowConnection) {slowNetDiv.classList.remove('dn'); let timerId = setTimeout(function(){ slowNetDiv.classList.add('dn');(typeof timerId != 'undefined')?clearTimeout(timerId):'';}, 6000);}
                  else {(typeof timerId != 'undefined')?clearTimeout(timerId):''; slowNetDiv.classList.add('dn')}
              }
      }        
  }
// function checkWebPSupport(){
//   let webp = new Image();
//   webp.src = 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoBAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==';  
//   let webPSupport = false;
  
//   webp.onerror = function(){
//       webPHandling(false);        
//   };
//   webp.onload = function(){  
//       webPHandling(true);
//   };  
// }
// function webPHandling(val){
//   let a=new Date;a.setTime(a.getTime()+30*24*60*60*1e3);    
//   document.cookie="webPSupport="+val+";expires="+a.toGMTString()+";path=/;domain=.indiamart.com";           
// }

function ipp_handling() {	
  let iploc_val = getImCookie({	
      name: 'iploc',	
      flag: 2,	
      keyValue: 'gcniso'	
  });	
  let Imesh_val = getImCookie({	
      name: 'ImeshVisitor',	
      flag: 2,	
      keyValue: 'utyp'	
  })	
  if (document.getElementById('payxfooter') || document.getElementById('payx')) {	
      if ((iploc_val) || (Imesh_val)) {	
          document.getElementById('payxfooter').style.display = 'none';	
          document.getElementById('payxfooter').style.display = 'none'	
      }	
  }	
}	
let track_page_view = 1;	
let event_login = new Event('logged_in');	
let event_iploc = new Event('iploc_created');	
window.addEventListener('iploc_created', ipp_handling);	
window.addEventListener('logged_in', ipp_handling);	


window.addEventListener('load',(event)=>{
  scriptsLoader();
});
`
}
function shellFooter(footerType, footerLink) {
  return (``);

}
function shellLoader() {
  return (
    `<div id="gblLoader"style="display:none" class="mSpinnerP centerAlign"> <svg class="mLogo" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve"> <image id="image0" width="30" height="30" x="0" y="0" href="data:image/png;base64,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"/></svg> <div class="mSpinner"> <div></div><div></div></div></div>`
  )
}
function appJSRequestHandler() {
  let versionData = require("./JSVersionManager/handler").getVersions();
  return `
function removeOldLS()
{
  if(localStorage && localStorage.getItem('allVersions'))
  {
    localStorage.removeItem('allVersions');
  }
}
function setVersionLS()
{
  if(localStorage)
  {
    let time = new Date().getTime();
    let verData = ${JSON.stringify(versionData)};
    localStorage.setItem('versionsTime',time);
    localStorage.setItem('appJSVersions',JSON.stringify(verData));
  }
}
function handleMainJS()
{
  window._MAIN_JS_VERSION = '';
  window._NEW_ROUTE_VERSION = ${versionData['newRouteVersion']};
  if(localStorage && localStorage.getItem('appJSVersions'))
  {
    window._MAIN_JS_VERSION = JSON.parse(localStorage.getItem('appJSVersions'))['appUrl']
    let splitBy = ${process.env.NODE_ENV_M ? 4 : 2}
    window._MAIN_JS_NUMBER = Number(window._MAIN_JS_VERSION.split('/')[splitBy].split('_')[1].split('.')[0]);
    if(window._NEW_ROUTE_VERSION>window._MAIN_JS_NUMBER)//update LS
    {
      window._MAIN_JS_VERSION = "${versionData['appUrl']}";
      attachAppJS();
      setVersionLS();
    }
    else
    {
    attachAppJS();
    }
  }
  else
  {
    window._MAIN_JS_VERSION = "${versionData['appUrl']}";
    attachAppJS();
    setVersionLS();
  }
}
function attachAppJS() {
  let main_min = document.createElement('script');
  main_min.src = window._MAIN_JS_VERSION;
  document.body.appendChild(main_min);
}
window._NEED_UPDATE = false
`
}
function shell(APP_SHELL_STRUCTURE) {

  let viewLatestBuyleadCTA = "";

  if (APP_SHELL_STRUCTURE.TITLE.toLowerCase().includes('purchase') && APP_SHELL_STRUCTURE.STATUS == 404 && !APP_SHELL_STRUCTURE.TITLE.toLowerCase().includes("page not found")) {
    viewLatestBuyleadCTA = '<a href="/bl/"><div class="noimgform clrw bgmim bxrd20 mt35p ta">View Latest Buyleads</div></a>';
  }


  return `<!doctype html>
    <html lang="en">

    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="google" content="notranslate" />
    <meta http-equiv="Content-Type" content="text/html">
    <!-- <link rel="manifest" href="/manifest.json" crossorigin="use-credentials"> -->
    <link rel="stylesheet preload" href="https://${process.env.NODE_ENV_M == 'dev' ? 'dev-': process.env.NODE_ENV_M == 'stg' ? 'stg-' : ''}utils.imimg.com/globalhf/header/header-new45.min.css" as="style">
    <link href="//${process.env.NODE_ENV_M == 'dev' ? 'dev-': process.env.NODE_ENV_M == 'stg' ? 'stg-' : ''}my.imimg.com/css-new/css/side-menu-v-23.css" type="text/css" rel="stylesheet">
    ${process.env.NODE_ENV_M ? require('./GblComFunc').shellToken[process.env.NODE_ENV_M] : ''}
    ${APP_SHELL_STRUCTURE.PRE_CONNECTS}
    ${APP_SHELL_STRUCTURE.TITLE}
    ${APP_SHELL_STRUCTURE.META}
      ${APP_SHELL_STRUCTURE.CANONICAL_LINKS}
      ${APP_SHELL_STRUCTURE.METAOGTAGS}
      <script async>imgtm=[]; window.ENQUIRY_IDENTIFY_LOGOUT=false; </script>
      <script language="javascript" type="text/javascript" src="https://${process.env.NODE_ENV_M == 'dev' ? 'dev-': process.env.NODE_ENV_M == 'stg' ? 'stg-' : ''}utils.imimg.com/imsrchui/js/jquery2.js"></script>

      <script language="javascript" type="text/javascript" src="https://kenwheeler.github.io/slick/slick/slick.js"></script>
    ${APP_SHELL_STRUCTURE.HEAD_SCRIPTS}
    <meta name="theme-color" content="#00a699">
      </head>

  <body><div id="callOverlay"></div>
  <noscript>
  <div class="pf ma w100 h400 b0 t0 z100 bgw" style="z-index:10">
  <div class="dt w100 mh400">
     <div class="vam dtc tc ">
  <p class="fw">Please enable Javascript in your browser.</p>
  <p>Go to Settings -&gt; Site Settings -&gt; Javascript -&gt; Enable</p></div>
  </div>
  </div></noscript>

<input type="hidden" id="page_name" value="">
${shellHeader()}
<div id="root">
${shellLeftnav()}
</div>
${shellCSS()}
${shellLoader()}

${shellFooter(APP_SHELL_STRUCTURE.FOOTER, APP_SHELL_STRUCTURE.FOOTER_LINK)}
<script async="" type="text/javascript" src="https://${process.env.NODE_ENV_M == 'dev' ? 'dev-': process.env.NODE_ENV_M == 'stg' ? 'stg-' : ''}utils.imimg.com/header/js/imlogin-v397.js"></script>
<script async="" type="text/javascript" src="https://${process.env.NODE_ENV_M == 'dev' ? 'dev-': process.env.NODE_ENV_M == 'stg' ? 'stg-' : ''}utils.imimg.com/suggest/js/suggest.js"></script>
<script async="" type="text/javascript" src="https://${process.env.NODE_ENV_M == 'dev' ? 'dev-': process.env.NODE_ENV_M == 'stg' ? 'stg-' : ''}utils.imimg.com/globalhf/header/header-new250.js"></script>

  <script>   
  ${appJSRequestHandler()}
  ${APP_SHELL_STRUCTURE.BODY_SCRIPTS}

  ${shellJS(APP_SHELL_STRUCTURE.STATE)}   
  </script>
  ${APP_SHELL_STRUCTURE.ORG_SCHEMA}
  </body>
  </html>`

}

function pageResponse(res, appShell) {
  res.status(appShell.STATUS).send(shell(appShell));
}

module.exports = pageResponse;
