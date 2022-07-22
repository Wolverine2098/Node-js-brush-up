const { checkAccess } = require("../GblComFunc");

function serverRouter(app) {
  const shellCallBck = (res, appShellObj) => {
    require("../AppShell")(res, appShellObj);
  };
  const pageRedirect = (res, redirectObj) => {
    res.redirect(redirectObj.status, redirectObj.url);
  };

  const checkRedirectReq = (req) => {
    if (require("../GblComFunc").objIsEmpty(req.query)) {
      if (
        req.url.charAt(req.url.length - 1) != "/" &&
        req.url.indexOf(".") == -1
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const setPVHeader = (res, pageType) => {
    let headerKey =
        require("../constants/serverConstants.json").PAGE_TYPE_HEADER,
      headerVal = require("../constants/pageConstants.json")[pageType];
    headerKey && headerVal ? res.set(headerKey, headerVal) : ""; //if key and val exist set header
  };

  const checkAccessReq = async (req, res) => {
    const glid = req.cookies.ImeshVisitor
      ? require("../GblComFunc").cookieValExtracter(
          req.cookies.ImeshVisitor,
          "glid"
        )
      : "";
    let valid = 0;
    try {
      valid = await checkAccess(
        req,
        res,
        glid,
        req.headers.referer,
        "",
        "MY",
        [],
        "",
        "",
        ""
      );
    } catch (error) {
      console.log(error);
    }
    // console.log("valid-->"+valid);
    // if(req.headers.host=="localhost:3000"){
    //   return true;
    // }
    if (!valid || valid == 0 || glid == "") {
      return false;
    }
    return true;
  };

  //Api calling
  app.use((req, res, next) => {
    // console.log("in first");
    if (
      !/^\/miscreact\/ajaxrequest\/.*$/.test(req.path) &&
      checkRedirectReq(req)
    )
      pageRedirect(res, { status: 301, url: req.url + "/" });
    else {
      // console.log("in first next");
      next();
    }
  });

  app.use((req, res, next) => {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    next();
  });

  app.use((req, res, next) => {
    // console.log("in seconnd");
    let headerKey =
        require("../constants/serverConstants.json").PAGE_TYPE_HEADER,
      headerVal = "";

    if (req.path.indexOf("/ajaxrequest/") > -1) {
      // API Request...
      headerVal = require("../constants/ajaxConstants.json")[req.path];
    }
    headerKey && headerVal ? res.set(headerKey, headerVal) : ""; //if key and val exist set header
    next();
  });
  app.post(/^\/miscreact\/ajaxrequest\/.*$/, function (req, res) {
    require("../ajaxRequests/postRequests")(req, res);
  });
  app.get(/^\/miscreact\/ajaxrequest\/.*$/, function (req, res) {
    require("../ajaxRequests/getRequests")(req, res);
  });
  //api calling end

  //Buyer SSR
  app.get("/mymessagesreact", async function (req, res) {
    let checkAccessval = await checkAccessReq(req, res);
    if (
      (req.cookies["im_iss"] == "" || req.cookies["im_iss"] == undefined) &&
      !checkAccessval
    ) {
      console.log("insdie login shell");
      require("../SSRSections/Buyer/MyLogin/loginShell")(
        req,
        res,
        shellCallBck
      );
    } else {
      console.log("inside messages shell");
      require("../SSRSections/Buyer/Messages/messagesShell")(
        req,
        res,
        shellCallBck
      );
    }
  });

  app.get("/mychangepasswordreact", async function (req, res) {
    let checkAccessval = await checkAccessReq(req, res);
    if (
      (req.cookies["im_iss"] == "" || req.cookies["im_iss"] == undefined) &&
      !checkAccessval
    ) {
      require("../SSRSections/Buyer/MyLogin/loginShell")(
        req,
        res,
        shellCallBck
      );
    } else {
      require("../SSRSections/Buyer/Password/changePasswordShell")(
        req,
        res,
        shellCallBck
      );
    }
  });
  //Buyer SSR Closed
  //everything failed
  app.all("*", function (req, res) {
    res.status(404).send({ Error: "Page Does Not Exist" });
  });
}

module.exports = serverRouter;
