import { trackAppVer, checkUserStatus, pdp_url } from './MainFunctions';
import { getCookie, getCookieValByKey } from './CookieManager';
import { userType } from './UserType';
const loginModes = { 0: 'UnIdentified', 1: 'Identified', 2: 'LoggedIn', "null": 'UnIdentified' };
let pageTitle = "IndiaMART - Indian Manufacturers Suppliers Exporters Directory - PWA";

export const A2HSApp = (pipe = true) => {
    let A2HSAppend = '';
    if (( window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || ( window.navigator && window.navigator.standalone === true)) {
        if (pipe)
            A2HSAppend = '|' + 'A2HS';
        else
            A2HSAppend = 'A2HS';

    }
    return A2HSAppend;
}

export const checkremktg = () => {
    let remktgval = '';
    if (getCookie("remktg")) {
        remktgval = '|remktg';
    }
    return remktgval;
}

export const trackPageViewforHome = () => {
    let identified = getCookie('ImeshVisitor');
    let ls = localStorage;
    if (identified && (getCookieValByKey('ImeshVisitor', 'utyp') == 'P' || (getCookieValByKey('ImeshVisitor', 'utyp') == 'F'))) {
        gaTrack.trackPageView('/pwa/home/seller/', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer','HomePage');
    }
    else if (identified) {
        gaTrack.trackPageView('/pwa/home/identified/', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer','HomePage');
    }
    else if (!ls.recentMcats && !ls.relCats && !ls.relProds2 && !ls.prodsViewed) {
        gaTrack.trackPageView('/pwa/home/newuser/', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer','HomePage');
    }
    else {
        gaTrack.trackPageView('/pwa/home/unidentified/', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer','HomePage');
    }
}


//PV Track for Enq/Bl and Error Pages
export const trackPVEnqBL = (pageName, title = "") => {
    let vpv = "/vpv/pwa/";
    if(pageName.indexOf('nf')>-1){
        vpv = "/vpv/";
    }
    if (imgtm.length <= 1) {
        imgtm.push({
            "CD_User-Mode": checkUserStatus() === 1 ? "identified" : "unidentified",
            "PV_Tracking": vpv + pageName,
            "CD_Miscellaneous": trackAppVer('') + A2HSApp(),

        });
        (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); let f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
    }
    else {
        imgtm.push({
            "event": "VirtualPageview",
            "virtualPageURL": vpv + pageName,
            "virtualPageTitle": title,
            "CD_Miscellaneous": trackAppVer('') + A2HSApp(),
        });

    }
}
//PV Track For BL
export const trackPV = (pageName, title = "Latest BL") => {
    
    if (pageName.indexOf("/bl/") <= -1 && (pageName == "/dir/" || pageName.indexOf("/dir/") > -1 || pageName.indexOf("/suppliers/") > -1
        || pageName.indexOf("/proddetail/") > -1 || pageName.indexOf("/messages") > -1)
    ) {

        if (imgtm.length <= 1) {
            imgtm.push({
                "CD_User-Mode": checkUserStatus() === 1 ? "identified" : "unidentified",
                "PV_Tracking": "/vpv/pwa" + pageName,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp(),                
            });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); let f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
        }
        else {
            imgtm.push({
                "event": "VirtualPageview",
                "virtualPageURL": "/vpv/pwa" + pageName,
                "virtualPageTitle": title,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp(),
            });

        }

    } else {

        let url = title.search('cityIndex') > -1 ? "/vpv"+ pageName:"/vpv/pwa/bl/" + pageName;

        if (imgtm.length <= 1) {
            imgtm.push({
                "CD_User-Mode": checkUserStatus() === 1 ? "identified" : "unidentified",
                "PV_Tracking": url,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp(),

            });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); let f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
        }

        else {
            imgtm.push({
                "event": "VirtualPageview",
                "virtualPageURL": url,
                "virtualPageTitle": title,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp(),
            });
        }
        imgtm.push({
            "CD_Cust-Type-Weight": getCookieValByKey("ImeshVisitor", "cmid") ? getCookieValByKey("ImeshVisitor", "cmid") : ''
        });
    }


}
//Track in General
export const gaTrack = {
    trackPageView: function (pageName, title, CD_Miscellaneous,brd_mcat_id='') {
        // title = pageTitle;
        imgtm.push({
            "CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + A2HSApp()
        });

        if (window.location.pathname.indexOf("messages") > -1 && (imgtm.length > 3) && (window.location.pathname.indexOf("isearch") === -1) && (window.location.pathname.indexOf("bl") === -1) && (window.location.pathname != '/')) {
            imgtm.push({
                "CD_User-Mode": loginModes[checkUserStatus()] === 1 ? "identified" : "unidentified",
                "PV_Tracking": "/vpv" + pageName,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp(),

            });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); let f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
        }
        else if (window.location.pathname.indexOf("seller") > -1 && imgtm.length === 0 && (window.location.pathname.indexOf("isearch") === -1) && (window.location.pathname.indexOf("bl") === -1) && (window.location.pathname != '/')) {
            imgtm.push({
                "CD_User-Mode": loginModes[checkUserStatus()] === 1 ? "identified" : "unidentified",
                "PV_Tracking": "/vpv" + pageName,
                "CD_Miscellaneous": window.location.pathname.indexOf("seller") > -1 ? trackAppVer('') + A2HSApp() + checkremktg() : trackAppVer('') + A2HSApp(),
            });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); let f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
        }
        else if (pageName.indexOf('/pwa/home/') > -1 || pageName.indexOf('city-hub') > -1 || pageName == "/impcat/") {

            if (imgtm.length <= 1) {
                imgtm.push({
                    "CD_User-Mode": checkUserStatus() === 1 ? "identified" : "unidentified",
                    "PV_Tracking": "/vpv" + pageName,
                    "CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + pageName.indexOf('city-hub') > -1 ? "|ImpcatPWA" :"" +  A2HSApp(),

                });
                (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); let f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
            }
            
            else {
                imgtm.push({
                    "event": "VirtualPageview",
                    "virtualPageURL": "/vpv" + pageName,
                    "virtualPageTitle": title,
                    "CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + pageName.indexOf('city-hub') > -1 ? "|ImpcatPWA" :"" + A2HSApp(),
                });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); let f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
              
            }


        }
        else if(pageName.indexOf('/company') > -1) {
            
            let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
            if (imgtm.length <= 1) {
             
            imgtm.push({
                "CD_User-Mode": loginModes[checkUserStatus()] === 1 ? "identified" : "unidentified",
                "PV_Tracking": "/vpv" + pageName,
                "CD_Miscellaneous":langSelection +'|CompanyPWA' + A2HSApp(),
                "CD_MCAT" :brd_mcat_id
            });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); let f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
         } else {
                imgtm.push({
                    "event": "VirtualPageview",
                "CD_User-Mode": loginModes[checkUserStatus()] === 1 ? "identified" : "unidentified",
                    "virtualPageURL": "/vpv" + pageName,
                    "CD_Miscellaneous":langSelection +'|CompanyPWA' + A2HSApp(),
                    "CD_MCAT" : brd_mcat_id
                });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); let f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
              
            }
        }
        else if (pageName.indexOf('/pwa/dir/') > -1) {
            imgtm = [];
            imgtm.push({
                "event": "VirtualPageview",
                "virtualPageURL": "/vpv" + pageName,
                "virtualPageTitle": title,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp(),
            });


            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); let f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
        }
        else {
            imgtm.push({ 'CD_User-Mode': loginModes[checkUserStatus()] });
            imgtm.push({
                "event": "VirtualPageview",
                "virtualPageURL": "/vpv" + pageName,
                "virtualPageTitle": title,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp(),
            });

            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); let f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");



        }

        imgtm.push({
            "CD_Cust-Type-Weight": getCookieValByKey("ImeshVisitor", "cmid") ? getCookieValByKey("ImeshVisitor", "cmid") : ''
        });

    },

    trackMessagesPageViewWithCustomDimension: function(pageName, title, CD_Source){
        if (imgtm.length <= 1) {
            imgtm.push({
                "CD_User-Mode": checkUserStatus() === 1 ? "identified" : "unidentified",
                "PV_Tracking": "/vpv/pwa" + pageName,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp(),
                "CD_Source": CD_Source
            });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); let f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
        }
        else {
            imgtm.push({
                "event": "VirtualPageview",
                "virtualPageURL": "/vpv/pwa" + pageName,
                "virtualPageTitle": title,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp(),
                "CD_Source": CD_Source
            });

        }
    },
    
    trackSearchPageViewWithCustomDimension: function (pageNameInital, pagenameSuffix, title = pageTitle, group_id, cat_id, top_mcat, CD_Miscellaneous, CD_List_Count) {
        
        if (imgtm.length <= 1) {
            imgtm.push({
                "CD_User-Mode": loginModes[checkUserStatus()] === 1 ? "identified" : "unidentified",
                "PV_Tracking": pageNameInital + pagenameSuffix
            });
            imgtm.push({
                "CD_Group": group_id,
                "CD_Subcat": cat_id,
                "CD_MCAT": top_mcat,
                "CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + A2HSApp(),
                "CD_List-Count": CD_List_Count,
                "CD_Source": "IMOB"
            });

        } else {
            imgtm.push({
                "event": "VirtualPageview",
                "virtualPageURL": pageNameInital + pagenameSuffix,
                "virtualPageTitle": title,
                "CD_Group": group_id,
                "CD_Subcat": cat_id,
                "CD_MCAT": top_mcat,
                "CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + A2HSApp(),
                "CD_List-Count": CD_List_Count,
                "CD_Source": "IMOB"
            });
        }
        imgtm.push({
            "CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + A2HSApp()
        });
        imgtm.push({
            "CD_Cust-Type-Weight": getCookieValByKey("ImeshVisitor", "cmid") ? getCookieValByKey("ImeshVisitor", "cmid") : ''
        });

        (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); let f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
    },

    trackEvent: function (evArr) {
        window.location.pathname == "/" ? imgtm.push({ "CD_Additional_Data": userType() + A2HSApp()}) : '';
        window.location.pathname.indexOf("/seller/") > -1 && checkremktg().length > 0 ? imgtm.push({ "CD_Additional_Data": checkremktg() + A2HSApp()}) : '';
        window.location.pathname.indexOf("/messages/") > -1 && checkUserStatus()==2  ? evArr[5] ? imgtm.push({ "CD_Additional_Data": evArr[5]}) : imgtm.push({ "CD_Additional_Data": ''}) : '';
        imgtm.push({
            'event': (evArr[4] ? 'IMEvent' : 'IMEvent-NI'),
            'eventCategory': evArr[0],
            'eventAction': evArr[1],
            'eventLabel': evArr[2],
            'eventValue': evArr[3],


        });
    },
    trackMiniPDP: function (displayData, langSelection) {

        imgtm.push({
            "event": "VirtualPageview",
            "virtualPageURL": "/vpv/pwa/" + pdp_url(displayData.title, displayData.displayid),
            "CD_MCAT": displayData.mcatid[0],
            "CD_Subcat": displayData.catid[0],
            "CD_Miscellaneous": "single" + '|' + langSelection + A2HSApp(),
        });

    },


}
export const eventTracking = (a, b, c, d) => {
    window.location.pathname == "/" ? imgtm.push({ "CD_Additional_Data": userType() + A2HSApp() , "CD_Miscellaneous": trackAppVer("Homepage") + A2HSApp() }) : '';
    imgtm.push({
        'event': (d ? 'IMEvent' : 'IMEvent-NI'), 
        'eventCategory': a,
        'eventAction': b,
        'eventLabel': c,
        'eventValue': 0
    })
}
export const generateGAforPLT = (category, variable, label, value) => {
    imgtm.push(
        {
            'event': 'IMUserTiming',
            'timingCategory': category,
            'timingVar': variable,
            'timingLabel': label,
            'timingValue': value
        }
    )

}

export const trackPVForMcat = (data) =>{
    let bizName = data.bizName ? `-${(data.bizName).toLowerCase()}`:'';
    const cityName = data.cityName || data.rehitCityName || '';
    const url = cityName ? `/vpv/dir/${data.groupFlName}/${data.subcatFlName}/${data.tracking.pageType}${bizName}/${cityName}/${data.flName}.html` : `/vpv/dir/${data.groupFlName}/${data.subcatFlName}/${data.tracking.pageType}${bizName}/${data.flName}.html`;
    const ImeshVisitor = getCookie('ImeshVisitor','object')
    const mcatLoginModes = { 0: 'UnIdentified', 1: 'Identified', 2: 'Identified', "null": 'UnIdentified' };
    let userMode = mcatLoginModes[checkUserStatus()];
    let isHindi = data.cityName && data.vernacularCityName  ? `|isHindi` :''
    let isBrand = data.isBrand == '1'? `|Brand` :'';
    let CDmiscellaneous = `MIM-Mcat|Typ-${data.mcatProd}${isBrand}${isHindi}|${data.tracking.lang}|ImpcatPWA${A2HSApp()}`;
    let tracking;
    if (imgtm.length <= 1) {
        tracking = { 
            "CD_User-Mode": userMode,
            "PV_Tracking": url,
            "CD_Miscellaneous": CDmiscellaneous,
            "CD_MCAT" : data.mcatId,
            "CD_Subcat" : data.catId,

        }
    } else {
        tracking = { 
            "event": "VirtualPageview",
            "virtualPageURL": url,
            "CD_User-Mode": userMode,
            "CD_Miscellaneous": CDmiscellaneous,
            "CD_MCAT" : data.mcatId,
            "CD_Subcat" : data.catId,

        }
    }


    if(ImeshVisitor){
        if(ImeshVisitor.glid)
        tracking['CD_Gl-User-ID'] = ImeshVisitor.glid;
        if(ImeshVisitor.cmid)
        tracking['CD_Cust-Type-Weight']=ImeshVisitor.cmid;
        if(ImeshVisitor.utyp)
        tracking['CD_User-Type'] = ImeshVisitor.utyp;

        let userDetails = '';
        
        let mverified = ImeshVisitor.uv ? 'Verified':'UnVerified';
        let name = ImeshVisitor.fn ? 'Name':'_';
        let email = ImeshVisitor.em ? 'Email' : '_';
        let city = ImeshVisitor.ctid ? 'City' : '_';
        let eVerified = ImeshVisitor.ev ? 'EV' :'_'; 
        let GeoLoc = getCookie('GeoLoc') ? 'GeoLoc' : '_';
        userDetails = `${mverified}|${name}|${email}|${city}|${eVerified}|${GeoLoc}`
        if(userDetails)
        tracking['CD_User-Details'] = userDetails;
        tracking['CD_Verification-Status'] = mverified;
    }

    // if(data.groupId){
    //     tracking['CD_Group'] = data.groupId;
    // }
    
    imgtm.push(tracking);

    (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); let f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");

}



export const trackPVForPDP = (url, mcatId, data, langSelection) => {

    let docTitle = data.ITEM_DOCS.pc_item_doc_title? data.ITEM_DOCS.pc_item_doc_title:'';
    let itemImg = data.ITEM_IMG;
    let CDmiscellaneous='';
    let hindiNameVal='';
    if(data.PC_ITEM_HINDI_NAME !=''){hindiNameVal = '|hindi-name';}
    let CDsubcat = data.CAT_ID;
    let langSelected = '|'+langSelection;
    let selrCustWgt = data.GLUSR_USR_CUSTTYPE_WEIGHT?selrCustWgt='SELLER:'+ data.GLUSR_USR_CUSTTYPE_WEIGHT: selrCustWgt= '';
    
    let buyrCustWgt = getCookieValByKey("ImeshVisitor", "cmid");
    if(buyrCustWgt && buyrCustWgt != undefined){buyrCustWgt= 'BUYER:'+buyrCustWgt+'|'}else{buyrCustWgt= 'BUYER:Null|'}
    
    let statusAprvl = data.PC_ITEM_STATUS_APPROVAL ? statusAprvl= '|STATUS:' + data.PC_ITEM_STATUS_APPROVAL :statusAprvl = '';
    
    

    if((docTitle != '') && (docTitle == "VIDEO") && (itemImg.length != 0)){
        CDmiscellaneous= 'video'+ hindiNameVal + langSelected;}
    else if(itemImg.length != 0){
        CDmiscellaneous= 'multiple-image'+ hindiNameVal + langSelected;}
    else if(docTitle == 'VIDEO'){
        CDmiscellaneous= 'video'+ hindiNameVal + langSelected;}
    else if(itemImg.length == 0){
        CDmiscellaneous= 'single-image'+ hindiNameVal + langSelected;}
        
        CDmiscellaneous+='|PDP'+ statusAprvl;

    if (imgtm.length <= 1) {
        let userMode=loginModes[checkUserStatus()];
        imgtm.push({
            "CD_User-Mode": userMode,
            "PV_Tracking": "/vpv/pwa" + url,
            "CD_Miscellaneous": CDmiscellaneous + A2HSApp()
        });
    } else {
        imgtm.push({
            "event": "VirtualPageview",
            "virtualPageURL": "/vpv/pwa" + url,
            "CD_Miscellaneous":  CDmiscellaneous + A2HSApp()

        });
    }

    
    imgtm.push({
        "CD_MCAT": mcatId ? mcatId : '',
        "CD_Subcat": CDsubcat ? CDsubcat : '',
        "CD_Cust-Type-Weight":  buyrCustWgt + selrCustWgt,
        "CD_Additional_Data": data.PC_ITEM_STATUS_APPROVAL ? data.PC_ITEM_STATUS_APPROVAL : ''
    });

    
    
    (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); let f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
}

