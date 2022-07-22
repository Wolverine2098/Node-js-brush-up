let request = require("request");
let fs = require("fs");
const url = require('url');
const ON_PAGE = "";
const ERROR = 'SERVICE CONNECT FAILED';
const circuitBreaker = require('./CircuitBreaker/circuitBreaker');
const { getCookieValByKey, setCookie, getCookie } = require("../src/Globals/CookieManager");
import 'regenerator-runtime/runtime';
const APP_SHELL_STRUCTURE = () => {
    return ({
        TITLE: '<title>IndiaMART Mobile Site</title>',
        META: '<meta name="robots" content="noindex,nofollow" />',
        ORG_SCHEMA: `<script type="application/ld+json">
        {"@context": "https://schema.org","@type": "Organization","name": "IndiaMART","url": "https://m.indiamart.com/","logo": "https://my.imimg.com/gifs/indiamartlogo.jpg","contactPoint": [{ "@type": "ContactPoint", "telephone": "+91-96-9696-9696", "contactType": "customer service" }],"sameAs": ["https://www.facebook.com/IndiaMART","https://twitter.com/IndiaMART","https://www.linkedin.com/company/indiamart-intermesh-limited/","https://www.youtube.com/user/indiamart","https://en.wikipedia.org/wiki/IndiaMART","https://www.instagram.com/indiamartofficial/"]}
        </script>`,
        PRE_CONNECTS: `	
    <!-- <link rel="manifest" href="/manifest.json" crossorigin="use-credentials"> -->
    <link rel="preconnect" href="https://${process.env.NODE_ENV_M == 'dev' ? 'dev-': process.env.NODE_ENV_M == 'stg' ? 'stg-' : ''}my.imimg.com/" crossorigin > 
    <link rel="preconnect" href="https://${process.env.NODE_ENV_M == 'dev' ? 'dev-': process.env.NODE_ENV_M == 'stg' ? 'stg-' : ''}utils.imimg.com/" crossorigin > 
    <link rel="preconnect" href="https://1.imimg.com/" crossorigin > 
    <link rel="preconnect" href="https://2.imimg.com/" crossorigin >
    <link rel="preconnect" href="https://3.imimg.com/" crossorigin > 
    <link rel="preconnect" href="https://4.imimg.com/" crossorigin >
    <link rel="preconnect" href="https://5.imimg.com/" crossorigin > 
    <link rel="preconnect" href="https://ajax.googleapis.com/" crossorigin >   
    <link rel="preconnect" href="https://www.googletagmanager.com/" crossorigin>
    <link rel="preconnect" href="https://suggest.imimg.com/" crossorigin >
    <link rel="preconnect" href="https://mc.yandex.ru" crossorigin >
    <link rel="preconnect" href="https://recommended.imutils.com" crossorigin >
    <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossorigin >
    <link rel="preconnect" href="https://www.google-analytics.com" crossorigin >
    <link rel="preconnect" href="https://adservice.google.co.in" crossorigin >`,
        HEAD_SCRIPTS: ``,
        STATE: '',
        SEARCHBAR: 'DEFAULT',
        LOADER: 'DEFAULT',
        CSS: '',
        CANONICAL_LINKS: '<link rel="canonical" href="https://www.indiamart.com/"/><link rel="alternate" id="phone" href="https://m.indiamart.com" media="only screen and (max-width:640px)" /><link rel="alternate" href="android-app://com.indiamart.m/https/m.indiamart.com/"> <!-- <link rel="manifest" href="/manifest.json"/> --><link rel="apple-touch-icon" href="https://my.imimg.com/apple-touch-icon.png"/><link rel="apple-touch-icon-precomposed" href="https://my.imimg.com/apple-touch-icon-precomposed.png"/>',
        METAOGTAGS:'',
        BODY_SCRIPTS: '',
        FOOTER: 'DEFAULT',
        FOOTER_LINK: '',
        ROOT_MT: 'DEFAULT',
        STATUS: 200
    })
}
const shellToken = {
    "dev": `<meta http-equiv="origin-trial" content="AjYLkv+23dlMvBHCKTyemTTpqa2bNmDprLClt49tisd1DD1NsruKgW6qXGBEud25RUTjMRKdrdF0YbKSNySs7gQAAABYeyJvcmlnaW4iOiJodHRwczovL2Rldi1tLmluZGlhbWFydC5jb206NDQzIiwiZmVhdHVyZSI6IlNtc1JlY2VpdmVyIiwiZXhwaXJ5IjoxNTgzODg0Nzk5fQ=="></meta>`,
    "stg": `<meta http-equiv="origin-trial" content="AjpUbQ6fRwAJUOJMqojbU3tftR7p33derazGbawFhmwGYm2Hi6K8cw/KEUYLVzSmWVHzwtFob07aMhI4CEzqKA8AAABYeyJvcmlnaW4iOiJodHRwczovL3N0Zy1tLmluZGlhbWFydC5jb206NDQzIiwiZmVhdHVyZSI6IlNtc1JlY2VpdmVyIiwiZXhwaXJ5IjoxNTgzODg0Nzk5fQ=="></meta>`,
    "prod_test": `<meta http-equiv="origin-trial" content="AjpUbQ6fRwAJUOJMqojbU3tftR7p33derazGbawFhmwGYm2Hi6K8cw/KEUYLVzSmWVHzwtFob07aMhI4CEzqKA8AAABYeyJvcmlnaW4iOiJodHRwczovL3N0Zy1tLmluZGlhbWFydC5jb206NDQzIiwiZmVhdHVyZSI6IlNtc1JlY2VpdmVyIiwiZXhwaXJ5IjoxNTgzODg0Nzk5fQ=="></meta>`,
    "prod": `<meta http-equiv="origin-trial" content="AuEJOV0e0beLDLxsXNbKHpNlqPKDK5q9Rw/E57nV2cnynJSLjoweufGAu5+Q8LcFSdduTqhIau61fGqfbbYF5AAAAABUeyJvcmlnaW4iOiJodHRwczovL20uaW5kaWFtYXJ0LmNvbTo0NDMiLCJmZWF0dXJlIjoiU21zUmVjZWl2ZXIiLCJleHBpcnkiOjE1ODM4ODQ3OTl9"></meta>`
};
const securePayUrls = [
    "r=payments/APP/getPackageDetails/",
    "r=payments/Pay/generateOrderID/"
];
const securearray = [
  "/addressbook/listContactUnread",
  "/addressbook/conversationList",
  "/addressbook/detailContact/",
  "/addressbook/listContact",
  "/enquiry/findEnquiry/",
  "/enquiry/findMail/",
  "/wservce/products/listing/",
  "/enquiry/InsertSendReply/",
  "/wservce/buyleads/Purchase/",
  "/wservce/leads/markfav/",
  "/wservce/leads/notinterested/",
  "/wservce/rfq/display/",
  "/wservce/products/add/",
  "/wservce/products/uploadimage/",
  "/wservce/users/detail/",
  "/wservce/users/forgotpassword/",
  "/wservce/users/seller/",
  "/wservce/users/verifiedDetail/",
  "/wservce/users/credit/",
  "/wservce/products/userlisting/",
  "/seller_activity",
  "/user/update",
  "/details/",
  "/wservce/users/edit/",
  "/wservce/users/setting/",
  "/index.php",
  "/users/otherdetail/",
  "/details",
  "/wservce/buyleads/shortlisted/",
//   "/user/verification",
  "/wservce/users/attrdispositions/",
  "/user/dispositon",
  "/Buyerattributes/GetBuyerData/",
  "/Buyerattributes/GetBigBrand/",
  "/Buyerattributes/GetMcatRecomendation/",
  "/UserAttributes/GetAttributes/",
  "/wservce/users/supplierrating/",
  "/supplierrating",
  "/enquiry/chatCreateUser",
  "/wservce/buyleads/detail/",
  "/wservce/buyleads/delete/",
  "/wservce/buyleads/pushtotop/",
  "/search/",
  "/addressbook/readReceipt",
];
const secureDomains = [
  "impcat.imutils.com",
  "enq2.intermesh.net",
  "leads.imutils.com",
  "mapi.indiamart.com",
  "users.imutils.com",
  "service.intermesh.net",
  "enqphp.intermesh.net",
  "dev-leads.imutils.com",
  "stg-leads.imutils.com",
  "dev-mapi.indiamart.com",
  "stg-mapi.indiamart.com",
  "dev-users.imutils.com",
  "stg-users.imutils.com",
  "dev-service.intermesh.net",
  "stg-service.intermesh.net",
  "pay.indiamart.com",
  "dev-pay.indiamart.com",
  "fts-master.intermesh.net",
  "users.imutils.com",
  "imsearch.indiamart.com",
  "recommend.imutils.com",
];

const formatDate = (xDate) => {
    return xDate.getFullYear().toString(10).substring(0) + "-"+
      + (xDate.getMonth()+1).toString(10).padStart(2,'0')+ "-"+
      + xDate.getDate().toString(10).padStart(2,'0')+ "-"+
      + xDate.getHours().toString(10).padStart(2,'0')+ "-"+
      + xDate.getMinutes().toString(10).padStart(2,'0')+ "-"+
      + xDate.getSeconds().toString(10).padStart(2,'0');
}

function checkAccess(req, res, glid, path, subpath, modid, q, dbh, isReturnOnly, adminloginimplimented){
    return new Promise(function(resolve, reject) {
        // console.log("Debug:----", glid);
        let imesh = {};
        let im_iss = {};
        let v4iilex = {};
        let im_iss_obj = {};
        let iploc = {};

        let imesh_id =(req.cookies.ImeshVisitor)?(cookieValExtracter(req.cookies.ImeshVisitor, 'glid')):'';
        let domain = '.indiamart.com';
        if((req.headers.host).includes('localhost')) {
            domain = 'localhost';
        }
        let v4iilex_id = (req.cookies.v4iilex) ? (cookieValExtracter(req.cookies.v4iilex, 'id')) : '';
        if(glid){
            if(v4iilex_id != imesh_id || glid != imesh_id || v4iilex_id != glid) {
                // console.log("Debug1:----> ", v4iilex_id); 
                // console.log("Debug1:----> ", imesh_id); 
                // console.log("Debug2:----> ", glid);
                res.cookie('v4iilex','', { domain: domain, path:'/', expires: new Date(Date.now() - 2592000)});
                res.cookie('im_iss','', { domain: domain, path:'/', expires: new Date(Date.now() - 2592000)});
                resolve(0);
                return 0;
            }else{
                q['req_glid'] = glid;
            } 
        }else{
            if(v4iilex_id != imesh_id) {
                res.cookie('v4iilex','', { domain: domain, path:'/', expires: new Date(Date.now() - 2592000)});
                res.cookie('im_iss','', { domain: domain, path:'/', expires: new Date(Date.now() - 2592000)});
                resolve(0);
                return 0;
            } 	
        }

        if (req.cookies.ImeshVisitor !== undefined) {
            req.cookies.ImeshVisitor.split('|').forEach(function (x) {
                let arr = x.split('=');
                if (arr[1] == "") { imesh[arr[0]] = "" }
                arr[1] && (imesh[arr[0]] = arr[1]);
            });
        }
        if (req.cookies.v4iilex !== undefined) {
            req.cookies.v4iilex.split('|').forEach(function (x) {
                let arr = x.split('=');
                if (arr[1] == "") { v4iilex[arr[0]] = "" }
                arr[1] && (v4iilex[arr[0]] = arr[1]);
            });
        }
        if (req.cookies.im_iss !== undefined) {
            im_iss = req.cookies.im_iss;
            let arr = req.cookies.im_iss.split('=')
            im_iss_obj[arr[0]] = arr[1];
        }

        let valid = 0;
        if(req.cookies.im_iss ||req.cookies.ImeshVisitor){
            if(!isReturnOnly)
            {
                isReturnOnly = 0;
            }
            if(!adminloginimplimented)
            {
                adminloginimplimented = 1;
            }      
            if(q['redirect'])
            {
                redurl = q['redirect'];
            }
            q['reauth']=1;
            let access_data = CallIMLS(req, res, 'relogin', q, imesh, v4iilex, im_iss_obj);
            access_data.then((response) => {
                // console.log("response --> " +response); 
                valid = response; //0,1,2,3,4,13
                if(valid == 4) {
                    valid = MY_Identified_Mode(req);
                }
                if(valid == 2) {
                    valid = 1;
                }

                resolve(valid);
            }).catch((error) => {
                // console.log("in reject = "+error);
                reject(error);
            });
        }
        else{
            resolve(0);
            return 0;
        }
    });
}

function MY_Identified_Mode(req)	{
    let file = req.originalUrl;
    let file_list = {
        '/index.mp': '4',
            '/cgi/index_ajax.mp': '4',
            '/cgi/my-contactdetail.mp': '4',
            '/cgi/domain-registration.mp': '4'
    };
    let updt_valid = 0;
    if(file_list.hasOwnProperty(file))
        updt_valid = 4;
    
    return updt_valid;
}

export function getCountry(req) {
    let ip = '192.170.156.119';
    let country = 'India';
    let country_iso = 'IN';
    if (req.cookies.iploc){
        let iploc = req.cookies.iploc.split('|');
        for(var ipl of iploc) {
            let check = ipl.split('=');
            if (check[0] == 'gip') {
                ip = check[1];
            } else if (check[0] == 'gcnnm') {
                country = check[1];
            } else if (check[0] == 'gcniso') {
                country_iso = check[1];
            }
        }
    }
    let return_geoip=[];
    return_geoip['ip'] = ip;
    return_geoip['country'] = country;
    return_geoip['country_iso'] = country_iso;
    return return_geoip;
}

function CallIMLS(req, res, action, q, imesh, v4iilex, im_iss_obj)
{
		let login_flag=0;
        let result='';
        let proxy = '';
        let options = {};
        let LoginCookie1 = {};
        let datacookie1 = {};
        let arr3 = [];
        let im_issCookie = {};
        var country_details = getCountry(req);

        if(req.cookies.v4iilex){
            LoginCookie1 =  v4iilex;
        }
        if(req.cookies.ImeshVisitor){
            datacookie1 =  imesh;
        }
        let admincookie = {};
        if(req.cookies.adminiil){
            admincookie = getCookie('adminiil');
        }
        if(req.cookies.im_iss) {
            im_issCookie = im_iss_obj;
        } 
            let cookie1 = {'LoginCookie': LoginCookie1, 'DataCookie': datacookie1, 'im_iss': im_issCookie};

        let admincookievalueonly = '';
        if(req.cookies.adminiil)
        {
            admincookievalueonly = getCookie('adminiil');
        }

        //other parameters to pass from the q->param
        let username = '';let password = '';let halflogin = 0;let modid = 'MY';let debug = '';let loginmode = '';let referer = '';let refurl = '';let original_referer = '';let script = '';let reauth = '';let av='';
        if(q['user_em'] != 'undefined')
        username = q['user_em'] ? q['user_em'].trim() : '';
        if(q['usr_pass'] != 'undefined')
        password = q['usr_pass'];
        if(q['isHalf'] != 'undefined')
        halflogin = q['isHalf'];
        if(q['modid'] != 'undefined')
        modid = q['modid']; 
        if(q['debug'] != 'undefined')
        debug = q['debug'];
        if(q['lg'] != 'undefined')
        loginmode = q['lg'];
        if(req.headers.referer){
            referer = url.parse(req.headers.referer).pathname;
            refurl = url.parse(req.headers.referer).hostname;
            original_referer = req.headers.referer
        }

        let IP = country_details['ip'];
        let country = country_details['country'];

        let req_glid = '';let forceauthenticate = ''; let age = 7; let dt = ''; let em = ''; let vm = 0; let mv_screen = ''; let mv_agency=''; let mb = ''; let force = ''; let ph_country=''; let idm = 0; let id=''; let userid=''; let eem=''; let un_key = '';
        if(q['forceauthenticate'] != 'undefined')
            forceauthenticate  = q['forceauthenticate'];
        if(q['age'] != 'undefined') 
            age = q['age'];
        if(q['dt'] != 'undefined')
            dt  = q['dt'];
        if(q['req_glid'] != 'undefined'){
            req_glid=q['req_glid'];
        } else{
            req_glid= '';
        }

        if(q['em'] != 'undefined')
            em  = q['em'];
        if(q['VM'] != 'undefined')
            vm  = q['VM'];
        let cur_date = formatDate(new Date());
        if(q['verify_screen'] != 'undefined')
            mv_screen = q['verify_screen'];
        if(q['verify_agency'] != 'undefined')
            mv_agency = q['verify_agency'];
        if(q['mb'] != 'undefined')
            mb = q['mb'];
        if(q['force'] != 'undefined')
            force = q['force'];
        if(q['ph_country'] != 'undefined')
            ph_country = q['ph_country'];
        if(q['reauth'] != 'undefined')
            reauth = q['reauth'];
        if(q['av'] != 'undefined')
			av = q['av'];
        if(q['idm'] != 'undefined')
			idm = q['idm'];
		if(q['id'] != 'undefined')
			id = q['id'];
		if(q['userid'] != 'undefined')
			userid = q['userid'];
		if(q['eem'] != 'undefined')
			eem = q['eem'];
		if(q['un_key'] != 'undefined')
			un_key = q['un_key'];
			
        original_referer = decodeURIComponent(original_referer);
        referer = decodeURIComponent(referer);

        if(action == 'login')
        {
            proxy = '';
            if(process.env.NODE_ENV_M == "dev")
            {
                proxy = 'http://admin:admin@dev1-login.indiamart.com/user/authenticate/';
            }
            else if(process.env.NODE_ENV_M == "stg")
            {
                proxy = 'http://admin:admin@stg1-login.indiamart.com/user/authenticate/';
            }
            else	
            {
                proxy = 'http://login.indiamart.com/user/authenticate/';
            }
 			
			options={
                method: 'POST',
                url: proxy,
                form: JSON.stringify({
                    verdate: dt,
                    em: imesh.em,
                    modid: "MY",
                    cur_date: cur_date,
                    mb: mb,
                    format: "JSON",
                    age: age,
                    cookie: cookie1,
                    referer: referer,
                    forceauthenticate: forceauthenticate,
                    idm: idm,
                    id: id,
                    MV_SCREEN: mv_screen ,
                    MV_AGENCY: mv_agency,
                    vm: vm,
                    av: av,
                    userid: userid,
                    eem: eem,
                    ph_country: ph_country,
                    un_key: un_key,
                    ip: IP
                })
            };           
            // options = JSON.stringify(options);
                       
	    }
        else if(action == 'relogin')
        {                        
            proxy = '';
            if(req.cookies.v4iilex){
                LoginCookie1 =  v4iilex;
            } else {
                login_flag=1;
            }

            if(process.env.NODE_ENV_M == "dev")
            {
                proxy = 'http://admin:admin@dev1-login.indiamart.com/user/reauthenticate/';
            }
            else if(process.env.NODE_ENV_M == "stg")
            {
                proxy = 'http://admin:admin@stg1-login.indiamart.com/user/reauthenticate/';
            }
            else	
            {
                proxy = 'http://login.indiamart.com/user/reauthenticate/';
            }
            // console.log('proxy='+proxy);
            options= {
                method: 'POST',
                url: proxy,
                form: JSON.stringify({
                    username: (imesh.mb1 !== undefined && imesh.mb1 !== '' && imesh.iso == "IN") ? imesh.mb1 : imesh.em,
                    password: password,
                    modid: "MY",
                    cookie: cookie1,
                    glusr_usr_country: country,
                    referer: referer,
                    refurl: refurl,
                    glusr_usr_ip: IP,
                    loginmode: loginmode,
                    original_referer: original_referer,
                    format: "JSON",
                    ph_country: ph_country,
                    iso: imesh.iso,
                    reauth: reauth,
                    req_glid: req_glid,
                    format: "JSON", 
                })
            };
        }
        let domain = '.indiamart.com';
        if((req.headers.host).includes('localhost')) {
            domain = 'localhost';
        }
		if(login_flag==0) 
        {
            return new Promise(function (resolve, reject) {
                request(options, function (error, response, body) {
                    if (error) { return reject(error); }
                    else {
                        body = JSON.parse(body);
                        // console.log(body);
                        let response_reauth = '';
                        if ((body.access) && (body.access == 1 || body.access == 2)) {
                            if ((body.LoginCookie.au == v4iilex.au) && (body.DataCookie.glid == imesh.glid)) {
                                response_reauth = body.access;
                                let updated_imesh = setImCookie(body.DataCookie);
                                let updated_v4iilex = setImCookie(body.LoginCookie);
                                let updated_im_iss = setImCookie(body.im_iss);
                                req.cookies.ImeshVisitor = updated_imesh;
                                req.cookies.v4iilex = updated_v4iilex;
                                req.cookies.im_iss = updated_im_iss;
                                res.cookie("ImeshVisitor", updated_imesh, { maxAge: 15552000000, domain: domain, sameSite: 'Lax' });
                                res.cookie("v4iilex", updated_v4iilex, { maxAge: 2592000000, domain: domain, sameSite: 'Lax' });
                                res.cookie("im_iss", updated_im_iss, { maxAge: 2592000000, domain: domain, sameSite: 'Lax' });
                                resolve(response_reauth);
                            }
                            else {
                                response_reauth = 0;
                                res.cookie('v4iilex','', {domain: domain, path:'/', expires: new Date(Date.now() - 2592000)});
                                res.cookie('im_iss','', {domain: domain, path:'/', expires: new Date(Date.now() - 2592000)});
                                // res.send({ response_reauth: 0 });
                                resolve(response_reauth);
                            }
                        }
                        else if ((body.access) && (body.access == 4)) {
                            if ((body.DataCookie.glid == imesh.glid)) {
                                response_reauth = 4;
                                res.cookie('v4iilex','', {domain: domain, path:'/', expires: new Date(Date.now() - 2592000)});
                                res.cookie('im_iss','', {domain: domain, path:'/', expires: new Date(Date.now() - 2592000)});
                                // res.send({ response_reauth: 4 });
                                resolve(response_reauth);
                            }
                            else {
                                response_reauth = 0;
                                res.cookie('v4iilex','', {domain: domain, path:'/', expires: new Date(Date.now() - 2592000)});
                                res.cookie('im_iss','', {domain: domain, path:'/', expires: new Date(Date.now() - 2592000)});
                                // res.send({ response_reauth: 0 });
                                resolve(response_reauth);
                            }
                        }
                        else {
                            response_reauth = 0;
                            res.cookie('v4iilex','', {domain: domain, path:'/', expires: new Date(Date.now() - 2592000)});
                            res.cookie('im_iss','', {domain: domain, path:'/', expires: new Date(Date.now() - 2592000)});
                            // res.send({ response_reauth: 0 });
                            resolve(response_reauth);
                        }
                    }
                });
            });
		}
        else {
            res.cookie('v4iilex','', {domain: domain, path:'/', expires: new Date(Date.now() - 2592000)});
            res.cookie('im_iss','', {domain: domain, path:'/', expires: new Date(Date.now() - 2592000)});
            // res.send({ response_reauth: 0 });
            return new Promise(function (resolve, reject) {resolve(0)});
        }
}

function checkUserStatus(req) {
    if (req.cookies.ImeshVisitor && req.cookies.im_iss) {
        return 2;
    }
    else if (req.cookies.ImeshVisitor) {
        return 1;
    }
    else {
        return 0;
    }
}
function objIsEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}
function isSecureUrl(service_url, mode) {
    let service_hostname = url.parse(service_url).hostname;
    let service_path = url.parse(service_url).pathname;
    let service_query = url.parse(service_url).query;
    if (service_hostname.indexOf("pay") > -1) {
        if (secureDomains.includes(service_hostname)) {
            if (securearray.includes(service_path)) {
                if (securePayUrls.includes(service_query)) {

                    return true;

                }
                else {

                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    } else if (service_hostname.indexOf("recommend") > -1) {
        if (secureDomains.includes(service_hostname)) {
            if (securearray.includes(service_path) && mode == '3') {
                return true
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }


    } else {
        if (secureDomains.includes(service_hostname)) {
            if (securearray.includes(service_path)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}
function securecookie(req, res) {
    let v4iilex = {};
    let imesh = {};
    let im_iss = {};
    let im_iss_obj = {};
    let iploc = {};
    if (req.cookies.ImeshVisitor !== undefined) {
        req.cookies.ImeshVisitor.split('|').forEach(function (x) {
            let arr = x.split('=');
            if (arr[1] == "") { imesh[arr[0]] = "" }
            arr[1] && (imesh[arr[0]] = arr[1]);
        });
    }
    if (req.cookies.v4iilex !== undefined) {
        req.cookies.v4iilex.split('|').forEach(function (x) {
            let arr = x.split('=');
            if (arr[1] == "") { v4iilex[arr[0]] = "" }
            arr[1] && (v4iilex[arr[0]] = arr[1]);
        });
    }
    if (req.cookies.iploc !== undefined) {
        req.cookies.iploc.split('|').forEach(function (x) {
            let arr = x.split('=');
            if (arr[1] == "") { iploc[arr[0]] = "" }
            arr[1] && (iploc[arr[0]] = arr[1]);
        });
    }
    if (req.cookies.im_iss !== undefined) {
        im_iss = req.cookies.im_iss;
        let arr = req.cookies.im_iss.split('=')
        im_iss_obj[arr[0]] = arr[1];
    }
    if (imesh.glid !== undefined && v4iilex.id !== undefined && (v4iilex.id == imesh.glid)) {
        let options = {
            method: 'POST',
            url: require("./ajaxRequests/ServiceUrls").USER_REAUTH_URL,
            form: JSON.stringify({
                username: (imesh.mb1 !== undefined && imesh.mb1 !== '' && imesh.iso == "IN") ? imesh.mb1 : imesh.em,
                modid: "IMOB",
                country_iso: imesh.iso,
                format: "JSON",
                IP: req.body.ip,
                glusr_usr_ip: (iploc.gip) ? iploc.gip : '',
                reauth: 1,
                iso: imesh.iso,
                "cookie": {
                    'DataCookie': imesh,
                    'LoginCookie': v4iilex,
                    'im_iss': im_iss_obj
                }
            })
        };
        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) { return reject(error); }
                else {
                    body = JSON.parse(body);
                    let response_reauth = '';
                    if ((body.access) && (body.access == 1 || body.access == 2)) {
                        if ((body.LoginCookie.au == v4iilex.au) && (body.DataCookie.glid == imesh.glid)) {
                            response_reauth = true;
                            let updated_imesh = setImCookie(body.DataCookie);
                            let updated_v4iilex = setImCookie(body.LoginCookie);
                            let updated_im_iss = setImCookie(body.im_iss);
                            req.cookies.ImeshVisitor = updated_imesh;
                            req.cookies.v4iilex = updated_v4iilex;
                            req.cookies.im_iss = updated_im_iss;
                            res.cookie("ImeshVisitor", updated_imesh, { maxAge: 15552000000, domain: '.indiamart.com', sameSite: 'Lax' });
                            res.cookie("v4iilex", updated_v4iilex, { maxAge: 2592000000, domain: '.indiamart.com', sameSite: 'Lax' });
                            res.cookie("im_iss", updated_im_iss, { maxAge: 2592000000, domain: '.indiamart.com', sameSite: 'Lax' });
                            resolve(response_reauth);
                        }
                        else {
                            response_reauth = false;
                            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                            res.header('Expires', '-1');
                            res.header('Pragma', 'no-cache');
                            res.send({ response_reauth: false });
                            resolve(response_reauth);
                        }
                    }

                    else if ((body.access) && (body.access == 4)) {
                        if ((body.DataCookie.glid == imesh.glid)) {
                            response_reauth = 4;
                            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                            res.header('Expires', '-1');
                            res.header('Pragma', 'no-cache');
                            res.send({ response_reauth: 4 });
                            resolve(response_reauth);
                        }
                        else {
                            response_reauth = false;
                            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                            res.header('Expires', '-1');
                            res.header('Pragma', 'no-cache');
                            res.send({ response_reauth: false });
                            resolve(response_reauth);
                        }
                    }
                    else {
                        response_reauth = false;
                        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                        res.header('Expires', '-1');
                        res.header('Pragma', 'no-cache');
                        res.send({ response_reauth: false });
                        resolve(response_reauth);
                    }
                }
            })
        });
    }
    else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.send({ response_reauth: false });
        return new Promise(function (resolve, reject) { resolve(false) });
    }
}
function getServiceName(url) {
    if ((url.indexOf('enq2.intermesh.net') > -1) || (url.indexOf('enqphp.intermesh.net') > -1)) {
        return 'enq2';
    }
    else if (url.indexOf('users.imutils.com') > -1) {
        return 'seller';
    }
    else if (url.indexOf('service.intermesh.net') > -1) {
        return 'service';
    }
    else if (url.indexOf('mapi.indiamart.com') > -1) {
        return 'mapi';
    }
    else if (url.indexOf('leads.imutils.com') > -1) {
        return 'leads';
    }
    else if (url.indexOf('pay.indiamart.com') > -1) {
        return 'pay';
    } else if (url.indexOf('recommend.imutils.com') > -1) {
        return 'recomm';
    }

}
function fetchData(options) {
    let d_fetcher = new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                // reject(new Error('SERVICE CONNECT FAILED'));
                //res.status(503).send();
            }
            else if (response.statusCode == 200) {
                resolve(body);
            }
            else {
                resolve(response.statusCode);
            }
        })
    })
    // .catch(error => {
    //     return error;
    // });
    return d_fetcher;
}
function setImCookie(e) {
    let i = e;
    i = separateInPipeFormat(e);
    return i;
}
function separateInPipeFormat(e) {
    let i = new Array;
    for (let a in e)
        i.push(a + "=" + e[a]);
    return i.join("|")
}
function handleResponse(req, res, service_options, error, response, body, isString, hit) {
    let fs = require("fs");
    let code = getResponseCode(service_options.url, body);
    if (hit != 2) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
    }
    if (error) { res.status(503).send(); }
    else if (code == 402 || code == 400 || code == 412) {
        let reauthObj = require('./reauthHandler')(req, res, service_options, isString);
    }
    else if (code == 403 || code == 401) {
        let date_string = new Date().toISOString().slice(0, 10);
        let reauthserviceLog = fs.createWriteStream('/tmp/reAuthPwaLog-' + date_string + '.log', { flags: 'a' });
        reauthserviceLog.write(new Date().toJSON().slice(0, 19).split("T")[0] + "\t" + req.cookies.ImeshVisitor + "\t" + service_options.url + "\t" + code + "\t" + body + "\t" + "is_pwa");
        res.send({ response_reauth: false });
    }
    else {

        if (hit && (hit == 1)) {
            let attributes = [];
            let parseRes = JSON.parse(body);
            let fraudUser = ['Conflict temporary disable', 'Multiple bs conflicts', 'Payment protection Non-compliance', 'Fraud Suspect Disabled', 'Suspicious Activity', 'Fraud complaint', 'Blacklisted User'];
            if (fraudUser.indexOf(parseRes.glusr_disabled_reason) > -1) {
                res.send(body);
            }
            else {
                if (parseRes.glusr_usr_ph_mobile != "" && parseRes.glusr_usr_ph_mobile != null) {
                    attributes[0] = '121'
                }
                if (parseRes.glusr_usr_ph_mobile_alt != "" && parseRes.glusr_usr_ph_mobile_alt != null) {
                    attributes[0] ? attributes[1] = ',48' : attributes[0] = '48';
                }
                if (parseRes.email2 != "" && parseRes.email2 != null) {
                    attributes[1] ? (attributes[2] = ',157') : attributes[0] ? attributes[1] = ',157' : attributes[0] = '157';
                }
                if (parseRes.email1 != "" && parseRes.email1 != null) {
                    attributes[2] ? (attributes[3] = ',109') : attributes[1] ? attributes[2] = ',109' : attributes[0] ? attributes[1] = ',109' : attributes[0] = '109';
                }
                let stringAtt = attributes[0] ? attributes[0] : ''
                stringAtt += attributes[1] ? attributes[1] : ''
                stringAtt += attributes[2] ? attributes[2] : ''
                stringAtt += attributes[3] ? attributes[3] : ''

                let options = {
                    method: 'POST',
                    url: require("./ajaxRequests/ServiceUrls").SLR_VRFY_DTL_URL,
                    form: {
                        'glusrid': parseRes.glid,
                        'token': 'imobile@15061981',
                        'attribute_id': stringAtt,
                        'modid': 'IMOB',
                        'userverified': 1
                    }

                };
                makeRequest(req, res, options, false, false, 2);
            }
        }
        else {

            if(service_options && service_options.page && service_options.page == 'MCAT'){
                require('./SSRSections/Mcat/parser').authAutofetchData(res,body,error,service_options);
            }
            else if (url.parse(service_options.url).pathname.indexOf("/wservce/buyleads/shortlisted/") > -1) {
                require('./ServiceParser').forBuyleadList(req, res, body, error)
            }
            else {
                res.send(body);
            }

        }

    }
}
function getResponseCode(url, body) {
    let service_name = getServiceName(url);
    let service_response_code;
    switch (service_name) {
        case 'enq2':
            if (body && body !== undefined) {
                service_response_code = JSON.parse(body).CODE;
            }
            service_response_code == undefined ? service_response_code = 200 : '';
            return service_response_code;
            break;
        case 'seller':
        case 'mapi':
            if (body && body !== undefined) {
                service_response_code = JSON.parse(body).CODE;
            } service_response_code == undefined ? service_response_code = 200 : '';
            return service_response_code;
            break;
        case 'service':
            if (body && body !== undefined) {
                service_response_code = (JSON.parse(body)).CODE;
            }
            service_response_code == undefined ? service_response_code = 200 : '';
            return service_response_code;
            break;
        case 'leads':
            if (body && body !== undefined) {
                service_response_code = (JSON.parse(body)).CODE;
            }
            service_response_code == undefined ? service_response_code = 200 : '';
            return service_response_code;
            break;
        case 'pay':
            if (body && body !== undefined) {
                service_response_code = (JSON.parse(body)).CODE;
            }
            service_response_code == undefined ? service_response_code = 200 : '';
            return service_response_code;
            break;
        case 'recomm':
            if (body && body !== undefined) {
                service_response_code = (JSON.parse(body)).CODE;
            }
            service_response_code == undefined ? service_response_code = 200 : '';
            return service_response_code;
            break;


    }

}
let makeRequest = (req, res, options, isString, sendResponseBack, hit = 0) => {
    let date = new Date().toJSON().slice(0, 19).split("T")[0];
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let fullDate = year + '-' + month + '-' + day, glid;
    // if(checkUserStatus(req)!=0){
    // glid=req.cookies.ImeshVisitor.split('glid=')[1].split('|')[0];}
    // else glid=' ';
    glid = ' ';
    let scriptUri = req.url;
    if (!options.timeout) {
        options.timeout = 3000
    }
    let mode = -1;
    // console.log(options);
    //appendUniqueId(options,req);
    //sendResponseBack set to false
    if (!sendResponseBack) {
        if (options.form && options.form.mode) mode = options.form.mode;
        if (isSecureUrl(options.url, mode)) {

            let cookie_secure = securecookie(req, res);
            cookie_secure.then((response) => {
                if (response == true) {
                    let service_options = isString ? JSON.parse(options.form) : options.form;
                    req.cookies.im_iss !== undefined ? service_options.AK = (req.cookies.im_iss.split("t=")[1] == undefined ? (req.cookies.im_iss == '' ? ' ' : req.cookies.im_iss) : req.cookies.im_iss.split("t=")[1]) : '';
                    options.form = isString ? JSON.stringify(service_options) : service_options;
                    request(options, function (error, response, body) {
                        //test
                        handleResponse(req, res, options, error, response, body, isString, hit);
                    });
                }
            }, (error) => {
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                res.header('Expires', '-1');
                res.header('Pragma', 'no-cache');
                res.send({ response_reauth: false });
            });
        }
        else {
            request(options, function (error, response, body) {
                if (error) {
                    if ((error['code'] == "ETIMEDOUT" || error['code'] == "ESOCKETTIMEDOUT") && process.env.NODE_ENV_M) {
                        let log = date + '\t' + scriptUri + '\t' + "999" + '\t' + error['code'] + '\t' + glid + '\t' + options.url + '\t' + options.timeout + '\t' + "0" + '\t' + "0" + '\t' + req.headers.referer + '\t' + "0" + "\n";
                        fs.appendFile('/home3/indiamart/statlogs/nodelogs/curlTimeOut-' + fullDate + '.log', log, function (err) {
                            if (err) throw err;
                        });
                    }
                    res.status(503).send();
                }
                else {
                    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                    res.header('Expires', '-1');
                    res.header('Pragma', 'no-cache');
                    res.send(body);
                }
            });
        }
    }
    //Send Response back
    else {
        let dFetcher = new Promise(function (resolve, reject) {
            if (options.url.indexOf('related.imutils.com') > -1 && circuitBreaker.isCircuitBroken(url.parse(options.url).hostname)) {
                let error_code = "Circuit Breaker triggered - Domain : " + url.parse(options.url).hostname;
                let log = date + '\t' + scriptUri + '\t' + "999" + '\t' + error_code + '\t' + glid + '\t' + options.url + '\t' + options.timeout + '\t' + "0" + '\t' + "0" + '\t' + req.headers.referer + '\t' + "0" + "\n";
                fs.appendFile('/home3/indiamart/statlogs/nodelogs/curlTimeOut-' + fullDate + '.log', log, function (err) {
                    if (err) throw err;
                });

                reject(ERROR);
            }
            else {
                /////////3000milliseconds
                request(options, function (error, response, body) {
                    if (((error && (error['code'] == "ESOCKETTIMEDOUT" || error['code'] == "ETIMEDOUT")) || (response && response.statusCode >= 500)) && options.url.indexOf('related.imutils.com') > -1) {
                        circuitBreaker.update5XXCount(url.parse(options.url).hostname);
                        if (error['code'] == "ETIMEDOUT" || error['code'] == "ESOCKETTIMEDOUT") {
                            let log = date + '\t' + scriptUri + '\t' + "999" + '\t' + error['code'] + '\t' + glid + '\t' + options.url + '\t' + options.timeout + '\t' + "0" + '\t' + "0" + '\t' + req.headers.referer + '\t' + "0" + "\n";
                            fs.appendFile('/home3/indiamart/statlogs/nodelogs/curlTimeOut-' + fullDate + '.log', log, function (err) {
                                if (err) throw err;
                            });
                        }
                        reject(ERROR);
                    }
                    else if (error) {
                        if (error['code'] == "ETIMEDOUT" || error['code'] == "ESOCKETTIMEDOUT") {
                            let log = date + '\t' + scriptUri + '\t' + "999" + '\t' + error['code'] + '\t' + glid + '\t' + options.url + '\t' + options.timeout + '\t' + "0" + '\t' + "0" + '\t' + req.headers.referer + '\t' + "0" + "\n";
                            fs.appendFile('/home3/indiamart/statlogs/nodelogs/curlTimeOut-' + fullDate + '.log', log, function (err) {
                                if (err) throw err;
                            });
                        }
                        reject(ERROR);
                    }
                    else if (response.statusCode == 200) {
                        // console.log("In mkr"+response.body);
                        resolve(body);
                    }
                    else {
                        reject(response.statusCode);
                    }
                })
            }
        })

        return dFetcher;
    }
}

function appendUniqueId(options,req){
    if(options.url && options.url.indexOf('leads.imutils.com')>-1 && req && req.headers && req.headers.hasOwnProperty('uniqueid')){
        let uniqueid=req.headers.uniqueid;
        if(options.hasOwnProperty('headers')){
            options.headers['Http-uniqueid']=uniqueid
        }
        else{
            options['headers']={},
            options.headers['Http-uniqueid']=uniqueid
        }
        if(options.method=='GET'){
            if(options.url.indexOf('?')>-1) options.url=options.url+'&unique_id='+uniqueid;
            else options.url=options.url+'unique_id/'+uniqueid+'/';
        }
        else{
            if(options.hasOwnProperty('form')){
                options.form.unique_id=uniqueid
            }
            else{
                options['form']={},
                options.form['Http-uniqueid']=uniqueid
            }
            // console.log(options);
        }
    }
}
  
function getEnvType() {
    let eType = '';
    if (process.env.NODE_ENV_M == 'prod' || process.env.NODE_ENV_M == 'prod_test') {
        eType = 'prod';
    }
    else if (process.env.NODE_ENV_M == 'stg') {
        eType = 'stg';
    }
    else if (process.env.NODE_ENV_M == 'dev') {
        eType = 'dev';
    }
    else {
        eType = 'local';
    }
    return eType;
}
let getSrvcUrl = (servcType, srvcUrl, forLocal = '') => {//LEAD_SERVICES, LEAD_SERVICES.BL_DISPLAY-->/wservce/buyleads/display/
    let compUrl = '';
    let envType = getEnvType();
    if (envType == 'prod' || (envType == 'local' && forLocal == '')) {
        compUrl = servcType.DOMAIN + srvcUrl;//http://leads.imutils.com/wservce/buyleads/display/
    }
    else {
        if (envType == 'local' && forLocal != '') {
            if (forLocal == 'dev') {
                compUrl = servcType.DEV_DOMAIN + srvcUrl;
            }
            else if (forLocal == 'stg') {
                compUrl = servcType.STG_DOMAIN + srvcUrl;
            }
            else {
                compUrl = servcType.DOMAIN + srvcUrl;
            }
        }
        else if (envType == 'dev') {
            compUrl = servcType.DEV_DOMAIN + srvcUrl;
        }
        else {
            compUrl = servcType.STG_DOMAIN + srvcUrl;
        }
    }
    return compUrl;
}
let cookieValExtracter = (cookieData, val) => {
    let reqVal = '';
    try {
        if (cookieData) {
            let cData = cookieData.split('|')
            for (let i = 0; i < cData.length; i++) {
                let splits = cData[i].split('=');
                if (splits[0] == val) {
                    reqVal = splits[1];
                    break;
                }
            }
            return reqVal;
        }
    }
    catch (e) {
        return '';
    }
}
function numTostring(data) {
    let new_data = [];
    data.map((val, key) => {
        const Entities = require('he');
        let decode = Entities.decode(val.toString());
        new_data.push(decode);
    });
    return new_data;
}

function getXSSList() {
    let list = /(javascript:|&lt;script|<script|&lt;\/script|<\/script|script&gt;|script>|&lt;\/xml|<\/xml|xml&gt;|xml>|&lt;object|<object|&lt;\/object|<\/object|object&gt;|object>|vbscript:|livescript:|&lt;javascript|javascript:|alert\(|&lt;iframe|<iframe|@import|&lt;META|<META|FSCommand|onAbort|onActivate|onAfterPrint|onAfterUpdate|onBeforeActivate|onBeforeCopy|onBeforeCut|onBeforeDeactivate|onBeforeEditFocus|onBeforePaste|onBeforePrint|onBeforeUnload|onBeforeUpdate|onBegin|onBlur|onBounce|onCellChange|onChange|onClick|onContextMenu|onControlSelect|onCopy|onCut|onDataAvailable|onDataSetChanged|onDataSetComplete|onDblClick|onDeactivate|onDrag|onDragEnd|onDragLeave|onDragEnter|onDragOver|onDragDrop|onDragStart|onDrop|onEnd|onError|onErrorUpdate|onFilterChange|onFinish|onFocus|onFocusIn|onFocusOut|onHashChange|onHelp|onInput|onKeyDown|onKeyPress|onKeyUp|onLayoutComplete|onLoad|onLoseCapture|onMediaComplete|onMediaError|onMessage|onMouseDown|onMouseEnter|onMouseLeave|onMouseMove|onMouseOut|onMouseOver|onMouseUp|onMouseWheel|onMove|onMoveEnd|onMoveStart|onOffline|onOnline|onOutOfSync|onPaste|onPause|onPopState|onProgress|onPropertyChange|onReadyStateChange|onRedo|onRepeat|onReset|onResize|onResizeEnd|onResizeStart|onResume|onReverse|onRowsEnter|onRowExit|onRowDelete|onRowInserted|onScroll|onSeek|onSelect|onSelectionChange|onSelectStart|onStart|onStop|onStorage|onSyncRestored|onSubmit|onTimeError|onTrackChange|onUndo|onUnload|onURLFlip|seekSegmentTime)/i;
    return list;
}
function getCDNHost() {
    let cdnUrl = '';
    if (process.env.NODE_ENV_M == 'prod' || process.env.NODE_ENV_M == 'prod_test') {
        cdnUrl = 'https://my.imimg.com/pwagifs/';
    }
    else if (process.env.NODE_ENV_M == 'stg') {
        cdnUrl = 'https://stg-my.imimg.com/pwagifs/';
    }
    else if (process.env.NODE_ENV_M == 'dev') {
        cdnUrl = 'https://dev-my.imimg.com/pwagifs/';
    }
    else {
        cdnUrl = '/pwagifs/';
    }
    return cdnUrl;
}
let doxssHandling = (PostData) => {
    let post_data = numTostring(PostData);
    let xsslist = getXSSList();
    let datauriregex = /(data:)([a-z]+\/[a-z0-9\-\+\.]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%]*\s*/i;
    for (let i = 0; i < post_data.length; i++) {
        post_data[i] = post_data[i].replace(/\s/gi, "");
        if (xsslist.test(post_data[i]) || datauriregex.test(post_data[i])) {
            let data = { 'code': '206', 'message': 'Invalid Input!' };
            return data;
        }
    }
    let data = { 'code': '200', 'message': 'Success' };
    return data;
}

const constructPDPUrl = (productName, id, type = "pdp") => {
  let name = productName;
  if(name && name!=null){
  name = name.replace(/^\s+/, "");
  name = name.replace(/\s+$/, "");
  name = name.replace(/\s+/g, "-");
  name = name.toLowerCase();
  name = name.replace(/\&amp;/g, "&");
  name = name.replace(/\&lt;/g, "<");
  name = name.replace(/\&gt;/g, ">");
  name = name.replace(/\&nbsp;/g, " ");
  name = name.replace(
    /[\'\/\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\|\;\:\"\<\>\,\.\?\\]+/g,
    "-"
  );
  name = name.replace(/^(-)+/, "");
  name = name.replace(/-+$/, "");
  }
  else{
      name = '';
    }
  if (type == "pdp") {
    return "/proddetail/" + name + "-" + id + ".html";
  } else {
    return "/proddetail/" + name + "-s" + id + ".html";
  }
};
module.exports = {
  makeRequest: makeRequest,
  checkUserStatus: checkUserStatus,
  getSrvcUrl: getSrvcUrl,
  cookieValExtracter: cookieValExtracter,
  objIsEmpty: objIsEmpty,
  APP_SHELL_STRUCTURE: APP_SHELL_STRUCTURE,
  ON_PAGE: ON_PAGE,
  fetchData: fetchData,
  doxssHandling: doxssHandling,
  getXSSList: getXSSList,
  getCDNHost: getCDNHost,
  ERROR: ERROR,
  shellToken: shellToken,
  appendUniqueId: appendUniqueId,
  constructPDPUrl: constructPDPUrl,
  checkAccess: checkAccess
};
