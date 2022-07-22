import React from 'react';
import { render } from 'react-dom'
import { getRoutes } from './router/routes';
import Provider from 'react-redux/lib/components/Provider';
import { updateMainJS } from './Globals/versionHandler';
import { isBot } from './Globals/MainFunctions';
// import helper from './modules/Header/helper'; //used to update header on enquiry login
import {getCookie,deleteCookie} from '../src/Globals/CookieManager';
import {store} from './Redux/store';
import { hydrate } from 'preact';

let local = JSON.parse(localStorage.getItem("webPSupport"));
let webPCookie = getCookie('webPSupport');
if(webPCookie) deleteCookie('webPSupport');
function checkWebPSupport(){
      let webp = new Image();
      webp.src = 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoBAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==';  
      
      webp.onerror = function(){
          webPHandling(false);        
      };
      webp.onload = function(){  
          webPHandling(true);
      };  
    }
    function webPHandling(val){
      local['val'] = val;
      localStorage.setItem("webPSupport", JSON.stringify(local));
    }

    if (!(local == null || local == 'undefined')) {
          localStorage.removeItem("webPSupport");
    }
    local={};
    checkWebPSupport();

if (!window._NEW_ROUTE_VERSION || window._NEW_ROUTE_VERSION <= 300) {
  window.location.reload(true);
}

if (process.NODE_ENV && !isBot() && (navigator.userAgent.indexOf(' UCBrowser/') == -1) && 'serviceWorker' in navigator) {

  navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
    navigator.serviceWorker.addEventListener('message', function (event) {
      try {
        let crntAppUrl = event.data.main_min;
        if (crntAppUrl !== window._MAIN_JS_VERSION && !window._NEED_UPDATE) {
          updateMainJS(crntAppUrl);
        }
      } catch (error) { }
    });
  }).catch(function (error) {
  });
}
;
render(
  <Provider store={store}>
    {getRoutes()}
  </Provider>,
  document.getElementById("root")
);