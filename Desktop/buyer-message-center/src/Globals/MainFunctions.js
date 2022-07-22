//Functions required in router/routes.js, reducer/index.js which are not defined in Globals/GaTracking.js and Globals/CookieManager.js
import { getCookie, deleteCookie } from './CookieManager';
import { checkVersionUpdate } from './versionHandler';
export const updateVariables= () => {
    let locMp = (localStorage && localStorage.getItem('multi_purpose')) ? JSON.parse(localStorage.getItem('multi_purpose')) : '';

    let lastBrowseDuration, userVC,req_pop_shown_st, status = 'N';
    

    if (locMp) {
        if (locMp.lastBrowseTS == undefined) {
            lastBrowseDuration = 0;
        } else {
            lastBrowseDuration = new Date() - new Date(locMp.lastBrowseTS);
        }

        if (locMp.userViewCount == undefined) {
            userVC = 1;
        } else {
            userVC = locMp.userViewCount + 1;
        }

        if (locMp.status == undefined) {
            status = 'N';
        } else {
            status = locMp.status;
        }

        if (locMp.req_pop_shown_st == undefined) {
            req_pop_shown_st = 4;
        } else {
            req_pop_shown_st = locMp.req_pop_shown_st;
        }
    } else {
        locMp = {};
        lastBrowseDuration = 0;
        userVC = 1;
        status = 'N';
        req_pop_shown_st = 4;
    }

    //Resetting viewCount
    let allVersions = localStorage.getItem('allVersions') ? JSON.parse(localStorage.getItem('allVersions')) : '';
    let reset_durn_min = (allVersions && allVersions['reset_durn_min']) ? allVersions['reset_durn_min'] : (60 * 60);//Default 1 hr
    let reset_durn_max = (allVersions && allVersions['reset_durn_max']) ? allVersions['reset_durn_max'] : (10 * 24 * 60 * 60);//Default 10 days
    if (((lastBrowseDuration / 1000) > reset_durn_min) && ((lastBrowseDuration / 1000) < reset_durn_max) && status == 'N' && userVC > 3) //durn > 1hr & < 10days 
    {
        userVC = 1;
        status = 'R';
    }
    if (((lastBrowseDuration / 1000) > reset_durn_max) && userVC > 3) //durn > 10days
    {
        userVC = 1;
        status = 'N';
    }
    if (((lastBrowseDuration / (1000)) > reset_durn_min) && ((lastBrowseDuration / 1000) < reset_durn_max) && status == 'R') //durn > 1hr & < 10days 
    {
        userVC = 1;
        status = 'R';

        req_pop_shown_st = 4;
    }

    /** Deletion of ctcrecordid key if the call not placed today**/
    if (locMp.ctcrecordid) {
        let today = new Date();
        let lastBrowseDate = new Date(locMp.lastBrowseTS);
        if (!(lastBrowseDate.getDate() == today.getDate() &&
            lastBrowseDate.getMonth() == today.getMonth() &&
            lastBrowseDate.getFullYear() == today.getFullYear())) { delete locMp.ctcrecordid; }
    }
    /****/


    locMp.lastBrowseTS = (new Date() + '');
    locMp.userViewCount = userVC;
    locMp.status = status;
    locMp.req_pop_shown_st = req_pop_shown_st;
    localStorage.setItem('multi_purpose', JSON.stringify(locMp));
 
}
export const versionUp = (type = '') => {
    if (!isBot() && localStorage) {
        if (window._NEED_UPDATE && type !== 'XHR') {
            window.location.reload(true);
        }
        else {
            checkVersionUpdate().then((data) => {
                if (data === 'VERSION_UPDATED') {
                    if (type !== 'XHR') {
                        window.location.reload(true);
                    }
                }
            }, (error) => { })
        }
    }
}
export const checkUserStatus = () => {
    let status = 0;
    if (document.cookie) {
        let c = document.cookie;
        if (c.length > 0 && -1 != c.indexOf('ImeshVisitor') && -1 != c.indexOf('im_iss') && getCookie('ImeshVisitor') !== '' && getCookie('im_iss') !== '') status = 2;
        else if (c.length > 0 && -1 != c.indexOf('ImeshVisitor') && getCookie('ImeshVisitor') !== '') status = 1;
    }
    return status;
}
export const trackAppVer = (CD_Miscellaneous) => {
    try {
        if (process.NODE_ENV && window._MAIN_JS_VERSION) {
            let verNum = window._MAIN_JS_VERSION.split('/')[4].split('_')[1].split('.')[0];
            verNum = 'AppVersion=' + verNum;
            return (CD_Miscellaneous ? CD_Miscellaneous + '|' + verNum : verNum);
        }
        else {
            return CD_Miscellaneous ? CD_Miscellaneous : '';
        }
    }
    catch (e) {
        return CD_Miscellaneous ? CD_Miscellaneous : '';;
    }
}
export const service_link = (title, id) => {
    let name = title;
    name = name.replace(/^\s+/, '');
    name = name.replace(/\s+$/, '');
    name = name.replace(/\s+/g, "-");
    name = name.toLowerCase();
    name = name.replace(/\&amp;/g, "&");
    name = name.replace(/\&lt;/g, "<");
    name = name.replace(/\&gt;/g, ">");
    name = name.replace(/\&nbsp;/g, " ");
    name = name.replace(/[\'\/\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\|\;\:\"\<\>\,\.\?\\]+/g, "-");
    name = name.replace(/^(-)+/, "");
    name = name.replace(/-+$/, "");
    return "/proddetail/" + name + '-' + id + '.html';
}
export const pdp_url = (title, id) => {
    let url = service_link(title, id)
    let posn = url.indexOf('proddetail')
    url = url.substring(posn)
    return url;
}
export const removeEnqStyletagspdp = () => {
    let p = document.getElementsByClassName("fr pdb12 pdt12 w45 clrw mr10 fs14 fw ripple bxsdw compBl bxrd20");
    for (let i = 0; i < p.length; i++) {
        p[i].style = "";
    }
    let q = document.getElementsByClassName("pdt12 pdb12 fs15 mt10 bxrd4 por bgff c2e pl35 pr25");
    for (let i = 0; i < q.length; i++) {
        q[i].style = "";
    }
}
export const getUrlVars = () => {
    let vars = [], hash;
    let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
export const getQueryStringValue = (key) => {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
export const removeEnqStyletags = () => {
    let p = document.getElementsByClassName("pdtb4 lh26 bdrm018 bgm018 clrw bxrdEnq w36 ml10 dib");
    for (let i = 0; i < p.length; i++) {
        p[i].style = "";
    }
}
export const resetCookies = (access) => {
    if (access == 4) {
        deleteCookie('v4iilex');
        deleteCookie('im_iss');
        window.location.reload();
    }
    else {
        deleteCookie('ImeshVisitor');
        deleteCookie('v4iilex');
        deleteCookie('im_iss');
        window.location.reload();
    }
}
export const isBot = () => {
    return (/googlebot|mediapartners|bingbot|slurp|crawler|spider|BomboraBot|PiplBot|mappydata|Quantcastbot|Clickagy|LinkisBot/i.test(navigator.userAgent))
}

export const createFloatingLoader = () => {
    // Create a new element
    let newNode = document.createElement('div'); newNode.innerHTML = `<button style="display:none" id="fltldng" class=" loaderfloating fs18 pf">Loading...</button>`;

    // Get the reference node
    let referenceNode = document.querySelector('#gblLoader');

    // Insert the new node before the reference node
    referenceNode.after(newNode);

}