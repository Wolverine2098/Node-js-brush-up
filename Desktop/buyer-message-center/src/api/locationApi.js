//import gblFunc from '../Globals/GlobalFunctions';

import {getCookie, getCookieValByKey, setCookie} from '../Globals/CookieManager';
import {gaTrack} from '../Globals/GaTracking';

let glid;
let locationAPI = {
geolocation_newservice(service=1){
     window.page = {};
     if(service){
     let cookiedata = getCookie("iploc");
     let bot_request = (/googlebot|mediapartners|bingbot|slurp|crawler|spider|BomboraBot|PiplBot|mappydata|Quantcastbot|Clickagy|LinkisBot/i.test(navigator.userAgent));
     if(!cookiedata && !bot_request && service==1){
     let data = 'modid=IMOB&token=imobile@15061981'
     return makeRequestLocation('POST','https://geoip.imimg.com/api/location.php',data,service)
    }
    else
    {
        if(service==2){
           
          return new Promise(function(resolve, reject) {
            window.page.country = getCookieValByKey('iploc','gcnnm');
            window.page.countryCode = getCookieValByKey('iploc','gcniso');
            window.page.country_ip = getCookieValByKey('iploc','gip');
              return resolve({ 'country': getCookieValByKey('iploc','gcniso')})
          });
        }else if(bot_request){
            return new Promise(function(resolve, reject) {
            window.page.country = 'United States Of America';
            window.page.countryCode = 'US';
            window.page.country_ip = '0.0.0.0';
            return resolve({ 'country': 'United States Of America', 'country_iso' : 'US', 'country_ip': '0.0.0.0' })
            });
        }else{
      return new Promise(function(resolve, reject) {
        let c_iso=getCookieValByKey('iploc','gcniso');
        if(c_iso == 'GB' || c_iso == 'EU')
        {
            c_iso = 'UK';
        }
        else if(c_iso == 'A1' || c_iso == 'A2' || c_iso == 'O1' || c_iso == 'AP')
        {
            c_iso = '';
        }
        
        window.page.country = getCookieValByKey('iploc','gcnnm');
            window.page.countryCode = getCookieValByKey('iploc','gcniso');
            window.page.country_ip = getCookieValByKey('iploc','gip');
      return resolve({ 'country': getCookieValByKey('iploc','gcnnm'), 'country_iso' : c_iso, 'country_ip': getCookieValByKey('iploc','gip') })
      });
    }
}

    }
}
}

function makeRequestLocation(method, url, body,service){
return new Promise(function(resolve, reject) {
let xhr = new XMLHttpRequest();
xhr.open(method, url);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.timeout = 8000;
xhr.ontimeout = function () { 
gaTrack.trackEvent(['Timeout',"PWA", url, 0, true]) }
xhr.onload = function() {
if (this.status == 200 && this.readyState == 4 ){
    let p = JSON.parse(xhr.response);
    let cookieString = '';
    if(p.Response.Code==200){
        if(p.Response.Data.geoip_countryiso == 'IN'){
           cookieString = "gcniso="+p.Response.Data.geoip_countryiso +"|gcnnm="+p.Response.Data.geoip_countryname+"|gctnm="+p.Response.Data.geoip_cityname+"|gctid="+p.Response.Data.geoip_cityid+"|gacrcy="+p.Response.Data.geoip_accuracy+"|gip="+p.Response.Data.geoip_ipaddress;
        }
        else
            {cookieString = "gcniso="+p.Response.Data.geoip_countryiso +"|gcnnm="+p.Response.Data.geoip_countryname+"|gacrcy="+p.Response.Data.geoip_accuracy+"|gip="+p.Response.Data.geoip_ipaddress;}
        setCookie('iploc',cookieString,0.12);
        window.page.country = p.Response.Data.geoip_countryname;
        window.page.countryCode = p.Response.Data.geoip_countryiso;
        window.page.country_ip = p.Response.Data.geoip_ipaddress;
        if(service==2){
          return resolve({ 'country': p.Response.Data.geoip_countryiso})
        }
        return resolve({ 'country': p.Response.Data.geoip_countryname, 'country_iso' : p.Response.Data.geoip_countryiso, 'country_ip': p.Response.Data.geoip_ipaddress })
    }else
    {
          return resolve({ 'country': 'IN'});
    }
} 
else {
reject({
    status: this.status,
    statusText: xhr.statusText
});
}
};
xhr.onerror = function() {
reject({
status: this.status,
statusText: xhr.statusText
});
};
xhr.send(body);
});
}



export default locationAPI;
