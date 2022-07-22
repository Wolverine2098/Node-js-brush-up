import { browserHistory } from 'react-router';
import {eventTracking, A2HSApp} from './GaTracking';
import {getCookie, getCookieValByKey, setCookie, deleteCookie} from './CookieManager';
import {checkUserStatus, trackAppVer} from './MainFunctions';

export const windowsKey = () => window

export const goToRoute = (pathTo, gaArr) => {
    browserHistory.push(pathTo);
}
export const showToIndianUser = () => {
    if ((!checkUserStatus() && getCookie("iploc") != '' && getCookieValByKey('iploc', 'gcniso') == "IN") || (getCookieValByKey('ImeshVisitor', 'glid') != '' && getCookieValByKey('ImeshVisitor', 'iso') == "IN")) {
        return true;
    }
    else {
        return false;
    }
}
export const showSOI = () => {
    if ((!checkUserStatus() && getCookie("iploc") != '' && getCookieValByKey('iploc', 'gcniso') == "IN") || (getCookieValByKey('ImeshVisitor', 'glid') != '' && getCookieValByKey('ImeshVisitor', 'iso') == "IN")) {
        return true;
    }
    else {
        return false;
    }
}
export const detectLocation = (geoLocState) => {
    if (navigator && navigator.geolocation) {
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
                if (result.state == 'granted') {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        console.log('Geolocation permissions granted');
                        console.log('Lat.:' + position.coords.latitude + ', Long.:' + position.coords.longitude + ', Acc.:' + position.coords.accuracy);
                        eventTracking('GEOLOCATION', 'Geolocation Allow', 'search', true)
                        setCookie('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) +"|createdate="+ new Date().getTime(), 3)
                        geoLocState(result.state, position.coords.latitude, position.coords.longitude, position.coords.accuracy);
                    }, function (error) {
                        console.log('Geolocation Error-' + error.message)
                        eventTracking('GEOLOCATION', 'Geolocation Block', 'search', true)
                        eventTracking('Filter-Clicks-Search', 'Unable-To-Detect', error.code + '-' + error.message, true)
                        setCookie('GeoLoc', "lt=|lg=|acc=|createdate=", 3)
                        geoLocState("denied");
                    }
                    );
                }
                else if (result.state == 'denied') {
                    console.log("Unable to detect location");
                    geoLocState(result.state);
                }
                else if (result.state == 'prompt') {
                    console.log('Geolocation permissions asked again');
                    navigator.geolocation.getCurrentPosition(function (position) {
                    }
                        , function (error) {
                            console.log('Geolocation Error-' + error.message)
                            console.log('Phone location settings disabled. Please allow.');
                            geoLocState("denied-phone");
                        }
                    );
                    result.onchange = function () {
                        if (this.state == 'granted') {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                console.log('Geolocation permissions granted');
                                console.log('Lat.:' + position.coords.latitude + ', Long.:' + position.coords.longitude + ', Acc.:' + position.coords.accuracy);
                                setCookie('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime(), 3)
                                geoLocState("prompt-" + result.state, position.coords.latitude, position.coords.longitude, position.coords.accuracy);
                            }, function (error) {
                                console.log('Geolocation Error-' + error.message)
                                eventTracking('GEOLOCATION', 'Geolocation Block', 'search', true)
                                eventTracking('Filter-Clicks-Search', 'Unable-To-Detect', error.code + '-' + error.message, true)
                                setCookie('GeoLoc', "lt=|lg=|acc=|createdate=", 3)
                                geoLocState("denied");
                            }
                            );
                        } else if (this.state == 'denied') {
                            geoLocState("prompt-" + result.state);
                        }
                    }
                }
            });
        }
        else {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log('Geolocation permissions granted');
                console.log('Lat.:' + position.coords.latitude + ', Long.:' + position.coords.longitude + ', Acc.:' + position.coords.accuracy);
                eventTracking('GEOLOCATION', 'Geolocation Allow', 'search', true)
                setCookie('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime(), 1)
                geoLocState("granted", position.coords.latitude, position.coords.longitude, position.coords.accuracy);
            }, function (error) {
                console.log('Geolocation Error-' + error.message)
                eventTracking('GEOLOCATION', 'Geolocation Block', 'search', true)
                eventTracking('Filter-Clicks-Search', 'Unable-To-Detect', error.code + '-' + error.message, true)
                setCookie('GeoLoc', "lt=|lg=|acc=|createdate=", 3)
                geoLocState("denied");
            }
            );
        }

    }
}
export const validate_mobile = (mobNo) => {
    let error = '',
        mobrRegex = /^[0-9-+()./ ]*$/,
        filter = /^(?:(?:\+|0{0,2})(91|910)(\s*[\-]\s*)?|[0]?)?[16789]\d{9}$/;
    if (mobNo == '' || mobNo.length == 0) {
        error = "Please enter mobile number";
        return error;
    } else if(isNaN(mobNo)) {
        error = "Please enter correct mobile number";
        return error;
    }
    else if (mobrRegex.test(mobNo)) {
        if (mobNo.length > 10 || mobNo.length < 10) {
            mobNo = mobNo.replace(/^((91){0,1}0{0,})/g, '');
            if (mobNo.length != 10) {
                error = "Please enter 10 digit mobile number";
                return error;
            }
            else {
                return error;
            }
        }
        if (!filter.test(mobNo)) {
            error = "Please enter correct mobile number";
            return error;
        }
        else {
            return error;
        }
    }
    else {
        return error;
    }

}
export const validate_email = (email) => {
    let error = '',
        emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (email == '' || email.length == 0) {
        error = "Email cannot be blank";
        return error;
    }
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email))) {
        error = "Please enter a valid email";
        return error;
    }
    else {
        return error
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
export const timeSince = (date) => {
    let secs = Math.abs(Math.floor(((new Date).getTime() - date) / 1000));
    let minutes = secs / 60;
    if (minutes < 1) {
        return secs + (secs > 1 ? ' secs ago' : ' sec ago');
    }
    let hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
    if (hours < 1) {
        return minutes + (minutes > 1 ? ' mins ago' : ' min ago');
    }
    let days = hours / 24;
    hours = Math.floor(hours % 24);
    if (days < 1) {
        return hours + (hours > 1 ? ' hrs ago' : ' hr ago');
    }
    let weeks = days / 7;
    days = Math.floor(days % 7);
    if (weeks < 1) {
        return days + (days > 1 ? ' days ago' : ' day ago');
    }
    let months = weeks / 4.35;
    weeks = Math.floor(weeks % 4.35);
    if (months < 1) {
        return weeks + (weeks > 1 ? ' weeks ago' : ' week ago');
    }
    let years = months / 12;
    months = Math.floor(months % 12);
    if (years < 1) {
        return months + (months > 1 ? ' months ago' : ' month ago');
    }
    years = Math.floor(years);
    return years + (years > 1 ? ' yrs ago' : ' yr ago');
}
export const numTostring = (data) => {
    let new_data = [];
    data.map((val, key) => {
        const Entities = require('he');
        let decode = Entities.decode(val);
        new_data.push(decode);
    });
    return new_data;
}
export const doxssHandling = (PostData) => {
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
export const getXSSList = () => {
    let list = /(javascript:|&lt;script|<script|&lt;\/script|<\/script|script&gt;|script>|&lt;\/xml|<\/xml|xml&gt;|xml>|&lt;object|<object|&lt;\/object|<\/object|object&gt;|object>|vbscript:|livescript:|&lt;javascript|javascript:|alert\(|&lt;iframe|<iframe|@import|&lt;META|<META|FSCommand|onAbort|onActivate|onAfterPrint|onAfterUpdate|onBeforeActivate|onBeforeCopy|onBeforeCut|onBeforeDeactivate|onBeforeEditFocus|onBeforePaste|onBeforePrint|onBeforeUnload|onBeforeUpdate|onBegin|onBlur|onBounce|onCellChange|onChange|onClick|onContextMenu|onControlSelect|onCopy|onCut|onDataAvailable|onDataSetChanged|onDataSetComplete|onDblClick|onDeactivate|onDrag|onDragEnd|onDragLeave|onDragEnter|onDragOver|onDragDrop|onDragStart|onDrop|onEnd|onError|onErrorUpdate|onFilterChange|onFinish|onFocus|onFocusIn|onFocusOut|onHashChange|onHelp|onInput|onKeyDown|onKeyPress|onKeyUp|onLayoutComplete|onLoad|onLoseCapture|onMediaComplete|onMediaError|onMessage|onMouseDown|onMouseEnter|onMouseLeave|onMouseMove|onMouseOut|onMouseOver|onMouseUp|onMouseWheel|onMove|onMoveEnd|onMoveStart|onOffline|onOnline|onOutOfSync|onPaste|onPause|onPopState|onProgress|onPropertyChange|onReadyStateChange|onRedo|onRepeat|onReset|onResize|onResizeEnd|onResizeStart|onResume|onReverse|onRowsEnter|onRowExit|onRowDelete|onRowInserted|onScroll|onSeek|onSelect|onSelectionChange|onSelectStart|onStart|onStop|onStorage|onSyncRestored|onSubmit|onTimeError|onTrackChange|onUndo|onUnload|onURLFlip|seekSegmentTime)/i;
    return list;
}

export function move_toNext1(event, e, i) {
    // fires on backspace key
    if(event.keyCode == '8') {
        $('#' + e).prev().focus();
    }
    $('#' + e).val().length >= $('#' + e).prop('maxLength') && $('#' + i).focus()
}

export function chkInput(evt){
    let charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}
