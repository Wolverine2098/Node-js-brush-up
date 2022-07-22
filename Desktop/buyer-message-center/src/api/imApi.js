//import gblFunc from '../Globals/GlobalFunctions';
import locationAPI from "./locationApi";
import {
  CC_JSON,
  COUNTRY_DROPDOWN_JSON,
  TOP5COUNTRIES,
} from "../constants/constants";
import { versionUp } from "../Globals/MainFunctions";
import {
  getCookie,
  getCookieValByKey,
  setCookie,
  deleteCookie,
} from "../Globals/CookieManager";
import { gaTrack, generateGAforPLT } from "../Globals/GaTracking";
import { checkUserStatus, resetCookies } from "../Globals/MainFunctions";
let glid;

let imApi = {
  fetchContactDetail(params) {
    let data = params;
    return makeRequest2(
      "POST",
      "/miscreact/ajaxrequest/messages/contactlist",
      data
    );
  },

  fetchOTPVer(params) {
    let data = params;
    return makeRequest2(
      "POST",
      "/miscreact/ajaxrequest/buyer/otpver/",
      data,
      20000
    );
  },
  fetchChangePassword(params) {
    let data = params;
    console.log(params);
    return makeRequest2(
      "POST",
      "/miscreact/ajaxrequest/buyer/chgpassword/",
      data,
      20000
    );
  },
  fetchBuyerUserdetails() {
    let data = {};
    return makeRequest2(
      "GET",
      "/miscreact/ajaxrequest/buyer/UserDetails/",
      data,
      20000
    );
  },
  fetchBuyerSettingsdetails() {
    let data1 = {
      privacy_settings: new Array({ flag: "2" }),
      mod_id: "IMOB",
      token: "imobile@15061981",
      glusrid: "glid",
    };
    let data = {};
    return makeRequest2("GET", "/miscreact/ajaxrequest/settingsData/", data);
  },
};

function makeRequestFile(method, url, file) {
  if (typeof window) {
    glid = getCookieValByKey("ImeshVisitor", "glid");
  }
  return new Promise(function (resolve, reject) {
    let fl = file;
    let fd = new FormData();
    let xhr = new XMLHttpRequest();
    fd.append("uploads[]", fl, fl.name);
    fd.append("glid", glid);
    xhr.open(method, url);
    xhr.timeout = 100000; // time in milliseconds

    xhr.onload = function () {
      if (this.status == 200 && this.readyState == 4) {
        return resolve(JSON.parse(xhr.response));
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.ontimeout = function (e) {
      gaTrack.trackEvent(
        "Image-Attachment-PWA",
        "Image-Upload",
        "ImageTimeOut",
        0,
        true
      );
      reject();
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send(fd);
  });
  //}
}

function makeRequest(method, url, body, timeout = 8000, glidAppend = true) {
  versionUp("XHR");
  if (typeof window) {
    glid = getCookieValByKey("ImeshVisitor", "glid");
  }
  return new Promise(function (resolve, reject) {
    if (method === "GET") {
      if (glid) {
        if (url.indexOf("?") >= 0 && glidAppend) {
          url += "&glid=" + glid;
        } else {
          if (glid && glidAppend) {
            url += "?glid=" + glid;
          }
        }
      }
    } else {
      if (glidAppend) {
        body["glid"] = glid;
      }
      body = JSON.stringify(body);
    }

    let isMsgMod = false;
    if (url.indexOf("messagecenter") != -1) {
      isMsgMod = true;
    }

    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.timeout = timeout;
    xhr.ontimeout = function () {
      if (url !== "/ajaxrequest/identified/timeout/") {
        gaTrack.trackEvent(["Timeout", "PWA", url, 0, true]);
        let datatimeout = { url: url, timeout: true };
        makeRequest("POST", "/ajaxrequest/identified/timeout/", datatimeout);
        reject({
          status: this.status,
          statusText: xhr.statusText,
          isMsgMod: isMsgMod,
          requestStatus: "timeout",
        });
      }
    };
    xhr.onload = function () {
      if (this.status == 200 && this.readyState == 4) {
        if (url.indexOf("/ajaxrequest/search/search") != -1) {
          if (!document.getElementById("searchListing")) {
            generateGAforPLT(
              "PWA",
              "First_load_search",
              "search_service",
              Date.now() - window.searchAPITime
            );
          } else if (url.indexOf("&start=0") != -1) {
            generateGAforPLT(
              "PWA",
              "subsequent_load_search",
              "search_service",
              Date.now() - window.searchAPITime
            );
          } else {
            generateGAforPLT(
              "PWA",
              "search_autofetch_search",
              "search_service",
              Date.now() - window.searchAPITime
            );
          }
        }

        let res = xhr.response ? JSON.parse(xhr.response) : "";
        if (
          res !== undefined &&
          res.response_reauth !== undefined &&
          (res.response_reauth == false || res.response_reauth == 4)
        ) {
          resetCookies(res.response_reauth);
        } else {
          return resolve(res);
        }
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
          isMsgMod: isMsgMod,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
        isMsgMod: isMsgMod,
      });
    };
    xhr.send(body);
  });
}

function makeRequest2(method, url, body, timeout = 8000, glidAppend = true) {
  return new Promise(function (resolve, reject) {
    //console.log("in mk2");
    if (method === "POST") {
      body = JSON.stringify(body);
    }
    if (method === "GET") {
      body = JSON.stringify(body);
    }
    //console.log(body);
    let isMsgMod = false;
    if (url.indexOf("messagecenter") != -1) {
      isMsgMod = true;
    }
    // console.log(url);
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.timeout = timeout;
    xhr.ontimeout = function () {
      if (url !== "/ajaxrequest/identified/timeout/") {
        gaTrack.trackEvent(["Timeout", "PWA", url, 0, true]);
        let datatimeout = { url: url, timeout: true };
        makeRequest("POST", "/ajaxrequest/identified/timeout/", datatimeout);
        reject({
          status: this.status,
          statusText: xhr.statusText,
          isMsgMod: isMsgMod,
          requestStatus: "timeout",
        });
      }
    };
    xhr.onload = function () {
      // console.log("response recieved");
      // console.log("in xhr response"+xhr.response);
      if (this.status == 200 && this.readyState == 4) {
        if (url.indexOf("/ajaxrequest/search/search") != -1) {
          if (!document.getElementById("searchListing")) {
            generateGAforPLT(
              "PWA",
              "First_load_search",
              "search_service",
              Date.now() - window.searchAPITime
            );
          } else if (url.indexOf("&start=0") != -1) {
            generateGAforPLT(
              "PWA",
              "subsequent_load_search",
              "search_service",
              Date.now() - window.searchAPITime
            );
          } else {
            generateGAforPLT(
              "PWA",
              "search_autofetch_search",
              "search_service",
              Date.now() - window.searchAPITime
            );
          }
        }
        let res = xhr.response ? JSON.parse(xhr.response) : "";
        if (
          res !== undefined &&
          res.response_reauth !== undefined &&
          (res.response_reauth == false || res.response_reauth == 4)
        ) {
          resetCookies(res.response_reauth);
        } else {
          return resolve(res);
        }
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
          isMsgMod: isMsgMod,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
        isMsgMod: isMsgMod,
      });
    };
    xhr.send(body);
  });
}

export default imApi;
