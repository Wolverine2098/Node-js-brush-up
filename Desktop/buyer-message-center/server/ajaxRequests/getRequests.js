let request = require("request");
const url = require("url");
const queryString = require("query-string");
let ServiceParser = require("../ServiceParser");
const fs = require("fs");
const axios = require('axios');
const Service = require("./ServiceUrls");
const ERROR = "SERVICE CONNECT FAILED";
let GblComFunc = require("../GblComFunc");
let Cache = require("../Cache");
const { getCookieValByKey } = require("../../src/Globals/CookieManager");

module.exports = (req, res) => {
  const webAddress = req.headers.host;
  const UrlPri = process.env.NODE_ENV_M == "dev" ? "dev-":process.env.NODE_ENV_M == "stg" ? "dev-":"";
  let env = req.headers.host;
  let hostName = "http://" + env;
  let pnsFail = "",
    pnsDown = "";
  if (process.env.SNTK != "undefined" && process.env.SNTK == 0) {
    pnsFail += "SNTK|";
  }
  if (process.env.KNOW != "undefined" && process.env.KNOW == 0) {
    pnsFail += "KNOW|";
  }
  if (process.env.one97 != "undefined" && process.env.one97 == 0) {
    pnsFail += "one97|";
  }
  let glid = (req.cookies.ImeshVisitor)?(GblComFunc.cookieValExtracter(req.cookies.ImeshVisitor, 'glid')):1522196;
  // console.log(glid);
  let ak = '';
  if (req.cookies.im_iss) {
      let arr = req.cookies.im_iss.split('=')
      ak = arr[1];
  }else{
    ak = '';
  }

  // console.log(req.cookie);
  switch (req.path) {
    //buyer start
    case "/miscreact/ajaxrequest/buyer/UserDetails/":
      {      
        // console.log("In ud");
        // console.log(UrlPri);
        let fraudUser = ['Conflict temporary disable', 'Multiple bs conflicts', 'Payment protection Non-compliance', 'Fraud Suspect Disabled', 'Suspicious Activity', 'Fraud complaint', 'Blacklisted User'];
        let userdeturl = `http://${UrlPri}users.imutils.com/wservce/users/detail/?glusrid=${glid}&token=imobile@15061981&modid=MY&logo=1&comp_logo=1&others=GLUSR_USR_IM_GSM,GLUSR_USR_PH_COUNTRY,GLUSR_USR_PH_AREA,GLUSR_USR_PH_NUMBER,GLUSR_USR_PH2_AREA,GLUSR_USR_PH2_NUMBER,GLUSR_USR_PH_MOBILE,GLUSR_USR_PH_MOBILE_ALT&AK=${ak}`;

        axios.get(userdeturl).then((d)=>{
          // console.log("in res");
          // console.log(d.data);
          if (fraudUser.indexOf(d.data.glusr_disabled_reason) > -1) {
            res.send({glusr_disabled_reason: '1'});
          } else {
            res.send(d.data);
          }
        }).catch(error => console.log(error));
        break;
      }
      case '/miscreact/ajaxrequest/settingsData/': {
        let options = {
            method: 'GET',
            form: JSON.stringify({
                'privacy_settings': [{"flag":"2"}],
                'token': 'imobile@15061981',
                'mod_id': 'MY',
                'glusrid': glid,
                'setting_type': 3            
            }),
        }
        options.url = "http://users.imutils.com/wservce/users/setting/";
        GblComFunc.makeRequest(req, res, options, true, true).then(function(response){
          res.status(200).send(response);
        }).catch(error => console.log(error));
        break;
    }
    //buyer-end

    // identified-start
    case "/ajaxrequest/search/search":
    case "/ajaxrequest/identified/search": {
      if (req.query.q) {
        //old request handling..
        req.query.s = req.query.q;
      }
      require("../SSRSections/Search/searchServiceManager")(req, res).then(
        function (data) {
          if (typeof data == "number") {
            //bad-response-code or unexpected-data
            res.status(data).send({ status: data });
            //ajax did not connect
          } else if (data == "SERVICE CONNECT FAILED") {
            res.status(503).send({ status: 503 });
          } else if (
            data === "Bad-Response" ||
            data === "No-Data" ||
            data === "EMPTY SEARCH"
          ) {
            res.status(200).send({ status: "404" });
          } else {
            res.status(200).send(data);
          }
        }
      );
      break;
    }
    case "/ajaxrequest/identified/allVersions": {
      let versions = require("../JSVersionManager/handler").getVersions();
      res.set("Content-Type", "application/json");
      res.status(200).send(versions);
      break;
    }
    // identified-end
    default: {
      res.status(404).send({ DATA: "NOT FOUND" });
    }
  }
};
