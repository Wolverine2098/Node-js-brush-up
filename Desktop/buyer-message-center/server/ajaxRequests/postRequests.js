const axios = require("axios");
var buffer = require("buffer/").Buffer;
var request = require("request");
const url1 = require("url");
const fs = require("fs");
const sa = require("superagent");
const Service = require("./ServiceUrls");
const ERROR = "SERVICE CONNECT FAILED";
const FormData = require("form-data");
var GblComFunc = require("../GblComFunc");
const { response } = require("express");
var AWS = require("aws-sdk");
const sgMail = require("@sendgrid/mail");
const { dirname } = require("path");
const rimraf = require("rimraf");
const appDir = dirname(require.main.filename);
const decompress = require("decompress");
import { windowsKey } from "../../src/Globals/GlobalFunc";
import { makeRequest } from "../GblComFunc";
import uniqid from "uniqid";

const formatDate = (xDate) => {
  return (
    xDate.getFullYear().toString(10).substring(0) +
    "-" +
    +(xDate.getMonth() + 1).toString(10).padStart(2, "0") +
    "-" +
    +xDate.getDate().toString(10).padStart(2, "0") +
    "-" +
    +xDate.getHours().toString(10).padStart(2, "0") +
    "-" +
    +xDate.getMinutes().toString(10).padStart(2, "0") +
    "-" +
    +xDate.getSeconds().toString(10).padStart(2, "0")
  );
};

// const uniqId = (prefix) => {
//     if (windowsKey.performance) {
//         var s = performance.timing.navigationStart;
//         var n = performance.now();
//         var base = Math.floor((s + Math.floor(n))/1000);
//     } else {
//         var n = new Date().getTime();
//         var base = Math.floor(n/1000);
//     }
//     var ext = Math.floor(n%1000*1000);
//     var now = ("00000000"+base.toString(16)).slice(-8)+("000000"+ext.toString(16)).slice(-5);
//     if (now <= windowsKey.my_las_uid) {
//         now = (parseInt(windowsKey.my_las_uid?windowsKey.my_las_uid:now, 16)+1).toString(16);
//     }
//     windowsKey.my_las_uid = now;
//     return (prefix?prefix:'')+now;
// }

module.exports = (req, res) => {
  const webAddress = req.headers.host;
  const UrlPri2 =
    process.env.NODE_ENV_M == "dev"
      ? "dev1-"
      : process.env.NODE_ENV_M == "stg"
      ? "stg1-"
      : "";
  const UrlPri =
    process.env.NODE_ENV_M == "dev"
      ? "dev-"
      : process.env.NODE_ENV_M == "stg"
      ? "stg-"
      : "";
  var env = req.headers.host;
  var hostName = "http://" + env;
  var userIP = GblComFunc.cookieValExtracter(req.cookies.iploc, "gip");
  var mode = GblComFunc.checkUserStatus(req);
  var glid = req.cookies.ImeshVisitor
    ? GblComFunc.cookieValExtracter(req.cookies.ImeshVisitor, "glid")
    : "";
  console.log(glid);
  var ak = "";
  if (req.cookies.im_iss) {
    let arr = req.cookies.im_iss.split("=");
    ak = arr[1];
  } else {
    ak = "";
  }
  //console.log(req);
  switch (req.path) {
    case "/miscreact/ajaxrequest/messages/contactlist": {
      let data = req.body;
      let contact_date = data.last_contact_date ? data.last_contact_date : "";
      var options = {
        method: "GET",
        form: JSON.stringify({
          glusrid: data.glusrid,
          start: data.start,
          end: data.end,
          modid: data.modid,
          AK: ak,
          last_contact_date: contact_date,
        }),
      };
      options.url = "http://lms.imutils.com/addressbook/listContact";
      makeRequest(req, res, options, true, true)
        .then(function (response) {
          var arr = JSON.parse(response);

          console.log(arr);
          // resp = encodeURIComponent(resp);

          // for(var key in response)
          res.status(200).send(arr);
        })
        .catch((error) => console.log(error));
      break;
    }

    case "/miscreact/ajaxrequest/messages/ConversationDetail": {
      let data = req.body;

      var options = {
        method: "GET",
        form: JSON.stringify({
          user_glid: data.user_glid,
          contact_glid: data.contact_glid,
          modid: data.modid,
          from: data.from,
          to: data.to,
          AK: data.AK,
        }),
      };

      options.url = "http://lms.imutils.com/addressbook/conversationList/";
      makeRequest(req, res, options, true, true)
        .then(function (response) {
          var arr = JSON.parse(response);

          console.log(arr);
          // resp = encodeURIComponent(resp);

          // for(var key in response)
          res.status(200).send(arr);
        })
        .catch((error) => console.log(error));
      break;
    }

    case "/miscreact/ajaxrequest/messages/Usuallyreplies": {
      let data = req.body;

      var options = {
        method: "POST",
        form: JSON.stringify({
          glusrid: data.glusrid,
          modid: data.modid,
          AK: data.AK,
        }),
      };

      options.url = "http://lms.imutils.com/addressbook/usuallyRepliesWithin";
      makeRequest(req, res, options, true, true)
        .then(function (response) {
          var arr = JSON.parse(response);

          console.log(arr);
          // resp = encodeURIComponent(resp);

          // for(var key in response)
          res.status(200).send(arr);
        })
        .catch((error) => console.log(error));
      break;
    }

    // buyer - start
    case "/miscreact/ajaxrequest/buyer/settingsPref": {
      // console.log('in setting pref');

      let data = req.body;
      // console.log(data);

      const key = "iilc2062016";
      const cur_date = formatDate(new Date());
      // console.log("date: "+ cur_date);
      const str =
        data.glusrId +
        "|" +
        cur_date +
        "|" +
        uniqid() +
        "|" +
        data.email +
        "|" +
        "";
      // console.log("str: "+str);
      let s = [];
      for (let i = 0; i < 256; i++) {
        s[i] = i;
      }

      let j = 0;
      let x = 0;
      for (let i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
      }

      j = 0;
      let i = 0;
      let resp = "";
      x = 0;
      for (let y = 0; y < str.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        resp += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
      }
      // console.log(resp);
      resp = Buffer.from(resp, "binary").toString("base64");
      // console.log(resp);
      var privId = "45,90,20,16,50,95,47,80,98,99,100,101,102,107";

      var options = {
        method: "GET",
        form: JSON.stringify({
          privacy_settings: [{ flag: "2" }],
          token: "imobile@15061981",
          mod_id: "MY",
          glusrid: data.glusrId,
          priv_ids: privId,
          UK: resp,
          AK: ak,
        }),
      };
      if (process.env.NODE_ENV_M == "dev" || process.env.NODE_ENV_M == "stg")
        options.url = "http://dev-users.imutils.com/wservce/users/setting/";
      else options.url = "http://users.imutils.com/wservce/users/setting/";

      makeRequest(req, res, options, true, true)
        .then(function (response) {
          var arr = JSON.parse(response);
          var redirect_url = "";
          if (arr["Response"]["Status"] == "200") {
            // console.log(arr['Response']['Data']['Disable_Setting_ids']);
            var dataSetting = arr["Response"]["Data"]["Disable_Setting_ids"];
            var arr1 = [];
            dataSetting.forEach((obj, i) => {
              arr1[obj["MY_PRIVACY_SETTING_ID"]] = obj["ISENABLE"];
            });

            var un_remarketing = 1;
            var un_feedback = 0;
            var un_blalert = 0;
            var un_tender = 0;
            var un_sup_intro_buy = 0;
            var un_enq_rep = 0;
            var un_biz_enq = 0;
            var bl_after_pur = 0;
            var tender_post_pur = 1;
            var pwim_prod_up = 0;
            var prod_up = 0;
            var ima_alloc_lapse = 0;
            var ima_lapse_rem = 0;
            var uf_rem_alert = 0;

            if (arr1["20"] != undefined && arr1["20"] == "Enabled") {
              un_blalert = 1;
            }
            if (arr1["90"] != undefined && arr1["90"] == "Enabled") {
              un_feedback = 1;
            }
            if (arr1["45"] != undefined && arr1["45"] == "Disabled") {
              un_remarketing = 0;
            }
            if (arr1["16"] != undefined && arr1["16"] == "Enabled") {
              un_tender = 1;
            }
            if (arr1["95"] != undefined && arr1["95"] == "Enabled") {
              un_sup_intro_buy = 1;
            }
            if (arr1["50"] != undefined && arr1["50"] == "Enabled") {
              un_enq_rep = 1;
            }
            if (arr1["47"] != undefined && arr1["47"] == "Enabled") {
              un_biz_enq = 1;
            }
            if (arr1["80"] != undefined && arr1["80"] == "Enabled") {
              bl_after_pur = 1;
            }
            if (arr1["98"] != undefined && arr1["98"] == "Disabled") {
              tender_post_pur = 0;
            }
            if (arr1["99"] != undefined && arr1["99"] == "Enabled") {
              pwim_prod_up = 1;
            }
            if (arr1["100"] != undefined && arr1["100"] == "Enabled") {
              prod_up = 1;
            }
            if (arr1["101"] != undefined && arr1["101"] == "Enabled") {
              ima_alloc_lapse = 1;
            }
            if (arr1["102"] != undefined && arr1["102"] == "Enabled") {
              ima_lapse_rem = 1;
            }
            if (arr1["107"] != undefined && arr1["107"] == "Enabled") {
              uf_rem_alert = 1;
            }

            redirect_url += "&un_remarketing=" + un_remarketing;
            redirect_url += "&un_feedback=" + un_feedback;
            redirect_url += "&un_blalert=" + un_blalert;
            redirect_url += "&un_tender=" + un_tender;
            redirect_url += "&un_sup_intro_buy=" + un_sup_intro_buy;
            redirect_url += "&un_enq_rep=" + un_enq_rep;
            redirect_url += "&un_biz_enq=" + un_biz_enq;
            redirect_url += "&un_bl_after_pur=" + bl_after_pur;
            redirect_url += "&un_tender_post_pur=" + tender_post_pur;
            redirect_url += "&un_pwim_prod_up=" + pwim_prod_up;
            redirect_url += "&un_prod_up=" + prod_up;
            redirect_url += "&un_ima_alloc_lapse=" + ima_alloc_lapse;
            redirect_url += "&un_ima_lapse_rem=" + ima_lapse_rem;
            redirect_url += "&un_rem_alert=" + uf_rem_alert;
          }

          resp = encodeURIComponent(resp);
          var finalURL =
            "https://" +
            UrlPri +
            "feedback.indiamart.com/emailSett/index.php?isTr=1&fn=" +
            data.fn +
            "&email=" +
            data.email +
            "&utyp=" +
            data.utyp +
            redirect_url +
            "&uk=" +
            resp;
          // for(var key in response)
          res.status(200).send(finalURL);
        })
        .catch((error) => console.log(error));
      break;
    }
    case "/miscreact/ajaxrequest/buyer/disotp/": {
      let data = req.body;
      let url = `http://${UrlPri2}login.indiamart.com/users/OTPVerification?token=imobile@15061981&glusrid=${data.glusrid}&modid=${data.modid}&user_mobile_country_code=${data.user_mobile_country_code}&user_ip=${data.user_ip}&user_country=${data.iso}`;

      if (data.mobile_num) {
        url += `&mobile_num=${data.mobile_num}`;
      }
      if (data.email) {
        url += `&email=${data.email}`;
      }
      if (data.typ == "1") {
        url += `&OTPResend=${data.OTPResend}&flag=OTPGen&process=OTP_BuyerMYSetting_Desktop&user_updatedusing=BUYER MY SETTINGS PAGE`;
      } else if (data.typ == "2") {
        url += `&flag=OTPVer&auth_key=${data.auth_key}&verify_process+=ONLINE&verify_screen=Buyer Settings Verification Popup`;
      }

      axios
        .post(url)
        .then((response) => {
          return res.send(response.data);
        })
        .catch((err) => console.log(err));
      break;
    }
    case "/miscreact/ajaxrequest/mysettings/deleteuser": {
      let data = req.body;
      var formdata = {};
      var valid = GblComFunc.checkAccess(
        req,
        res,
        glid,
        req.headers.referer,
        url1.parse(req.headers.referer).pathname,
        "MY",
        [],
        "",
        "",
        ""
      )
        .then((response) => {
          // console.log('Response = '+ response);
          if (response == 1) {
            formdata.UPDATEDUSING = "Buyer Privacy Settings";
            let reason = "";
            if (data.reason && data.reason != "Others") reason = data.reason;
            else if (data.other_reason) reason = data.other_reason;

            if (reason != "")
              reason = `and reason is selected by the client ${reason}.`;

            formdata.UPDATEDBY = "user";
            formdata.VALIDATION_KEY = "3245abd21ccaf37b137062f7ccc81269";
            formdata.USR_ID = data.glusrId;
            formdata.LASTMODIFIED = "SYSDATE";
            formdata.APPROV_REASON = "User do not want to be listed";
            formdata.APPROV = "D";
            formdata.HIST_COMMENTS = `As per the client request from Buyer MY, his IndiaMART account (${data.glusrId}) has been disabled ${reason} He will no longer receive any business enquiry from IndiaMART against his account.`;
            formdata.IP_COUNTRY = data.iso;
            formdata.IP = data.ip;
            formdata.MODID = "MY";
            formdata.AK = ak;
            var options = {
              method: "POST",
              form: JSON.stringify(formdata),
            };
            options.url =
              "http://" + UrlPri + "service.intermesh.net/user/update";
            makeRequest(req, res, options, true, true)
              .then(function (response) {
                res.status(200).send(response);
              })
              .catch((error) => console.log(error));
          } else {
            res.status(200).send({ error: "Not Authorized" });
          }
        })
        .catch((error) => {
          console.log(error);
          // res.sendStatus(500).send(error);
        });
      break;
    }
    case "/miscreact/ajaxrequest/buyer/otpver/": {
      console.log("In otp ver");
      console.log(UrlPri2);
      // let data = JSON.stringify(req.body);
      console.log(req.headers.host);
      let data = req.body;
      console.log(data);
      let url = `http://${UrlPri2}login.indiamart.com/users/OTPVerification?token=${data.token}&glusrid=${data.glusrid}&modid=${data.modid}&user_mobile_country_code=${data.user_mobile_country_code}&flag=${data.flag}&user_ip=${data.user_ip}&process=${data.process}&user_country=${data.user_country}&user_updatedusing=${data.user_updatedusing}&OTPResend=${data.OTPResend}`;

      if (data.mobile_num) {
        url += `&mobile_num=${data.mobile_num}`;
      }
      if (data.attribute_id) {
        url += `&attribute_id=${data.attribute_id}`;
      }
      if (data.email) {
        url += `&email=${data.email}`;
      }

      axios
        .post(url)
        .then((response) => {
          return res.send(response.data);
        })
        .catch((err) => console.log(err));
      break;
    }
    case "/miscreact/ajaxrequest/buyer/chgpassword/": {
      console.log("In chg password");
      console.log(UrlPri2);
      // let data = JSON.stringify(req.body);
      let data = req.body;
      console.log(data);
      let url = `http://${UrlPri2}login.indiamart.com/user/changepassword/?att_id=${data.att_id}&glusrid=${data.glusrid}&auth_key=${data.auth_key}&modid=${data.modid}&iso=${data.iso}&user_ip=${data.user_ip}&process=${data.process}&verify_screen=${data.verify_screen}&pass=${data.pass}&new_pass_reenter=${data.new_pass_reenter}`;
      axios
        .post(url)
        .then((response) => {
          return res.send(response.data);
        })
        .catch((err) => console.log(err));
      break;
    }
    case "/miscreact/ajaxrequest/buyer/verifiedstatus/": {
      console.log("In verified status");
      // let data = JSON.stringify(req.body);
      let data = req.body;
      let ak = "";
      console.log(data);
      let url = `http://users.imutils.com/wservce/users/verifiedDetail/?attribute_id=${data.attribute_id}&token=${data.token}&userverified=${data.userverified}&glusrid=${data.glusrid}&modid=${data.modid}&AK=${data.AK}`;
      axios
        .post(url)
        .then((response) => {
          console.log(response.data);
          return res.send(response.data);
        })
        .catch((err) => console.log(err));
      break;
    }

    //buyer end
    // identified- start
    case "/ajaxrequest/identified/timeout/": {
      try {
        var date = new Date().toISOString().slice(0, 10);
        var logfile_timeout = fs.createWriteStream(
          "/tmp/clienttimeout-log-" + date + ".txt",
          { flags: "a" }
        );
        logfile_timeout.write(
          "{ url:" +
            req.body.url +
            ",timeout:" +
            req.body.timeout +
            ",timestamp:" +
            new Date().toLocaleString() +
            "}" +
            "\n"
        );
      } catch (error) {}
      res.status(200).send();

      break;
    }

    // identified- end
    default: {
      res.status(404).send({ DATA: "NOT FOUND" });
    }
  }
};
