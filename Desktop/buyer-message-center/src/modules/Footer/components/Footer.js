import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCookieValByKey, getCookie } from '../../../Globals/CookieManager';
import { connect } from 'react-redux';
import '../css/FooterCss.css'
import NoScript from 'react-noscript';

export class footNav extends Component {
    constructor(props){
        super(props);
        this.newVal = '';
        this.c_imesh = '';
        this.rspv = 0;
    }

    startingcall(){
        let jobs_career = '<a href="https://corporate.indiamart.com/careers-at-im/">Jobs &amp; Careers</a>';
        let IMhome_invest = '';
        let IMhome_jobs = '';
        if(window.location.href.match(/my/i)=='my'||glmodid=="IMHOME"){  
            IMhome_invest = '<a href="https://investor.indiamart.com/index.htm">Investor Section</a>';
            IMhome_jobs = jobs_career ;
        }else{
            IMhome_invest = jobs_career;
            IMhome_jobs = '' ;
        }
        document.getElementById('sag').innerHTML='<ul><li><a href="https://corporate.indiamart.com/about-us/">About Us</a><a href="https://corporate.indiamart.com/partner-with-us/">Join Sales</a><a href="https://corporate.indiamart.com/category/everything-else/indiamart-achievers/">Success Stories</a> <a href="https://corporate.indiamart.com/category/everything-else/press-releases/">Press Section</a> <a href="https://corporate.indiamart.com/advertise-with-indiamart/">Advertise with Us</a>'+IMhome_invest+'</li><li><a href="https://help.indiamart.com/">Help</a> <a href="https://help.indiamart.com/user-feedback/">Feedback</a> <a href="https://help.indiamart.com/complaint-registration/">Complaints</a> <a href="https://corporate.indiamart.com/customer-care-services/">Customer Care</a>'+IMhome_jobs+'<a href="https://corporate.indiamart.com/branch-offices/">Contact Us</a></li><li class="cf_wdth"><div class="cf_lihd"><a href="https://seller.indiamart.com" class="ch_supplier_head">Suppliers Tool Kit</a></div><span id="ch_free_web"><a href="https://seller.indiamart.com/" class="ch_free_web">Sell on IndiaMART</a></span> <a href="https://seller.indiamart.com/bltxn/?pref=recent" class="bl_log_link">Latest BuyLead</a> <a href="https://corporate.indiamart.com/quick-learn/">Learning Centre</a> <a href="https://seller.indiamart.com/pwim/invoice/whatispwim/?bannerid=cntrlfooter" id="pypd_footer" class="disNone">Pay With IndiaMART</a></li><li class="cf_wdth"><div class="cf_lihd"><a href="https://my.indiamart.com" class="ch_buyers_head">Buyers Tool Kit</a></div><a href="https://my.indiamart.com/buyertools/postbl" class="ch_post_buy">Post Your Requirement</a> <a href="https://my.indiamart.com/buyertools/myproductbuy" class="mang_pro">Products You Buy</a> <a href="https://www.indiamart.com/search.html">Search Products &amp; Suppliers</a> <a href="https://paywith.indiamart.com?bannerid=cntrlfooter"  id="pay_footer">Pay With IndiaMART</a></li><li class="last"><div class="cf_lihd">Events</div><a href="https://10times.com/tradeshows" target="_blank">Trade Shows</a> <a href="https://10times.com/conferences" target="_blank">Conferences</a> <a href="https://10times.com/events/by-country" target="_blank">Events by Country</a></li></ul>';
        let webAddress=location.hostname;let UrlPri =webAddress.match(/^dev/)?"dev-":(webAddress.match(/^stg/))?"stg-":""; this.c_imesh = (typeof(getCookie("ImeshVisitor")) !== "undefined")?getCookie("ImeshVisitor"):'';let pv_count=0;if(getCookie("xnHist") > ""){    
        if(getCookieValByKey("xnHist", "pv") !=""){pv_count=getCookieValByKey("xnHist", "pv")}}
        let o = new Date;
        o.setTime(o.getTime() + (30*60*1000));
        if(getCookie("sessid") && getCookie("sessid").length > 0){
            let spv1 = getCookie("sessid").split('='); 
            this.rspv = parseInt(spv1[1]);
            this.newVal = "spv="+ ++this.rspv;
        }
        else{
            this.newVal = "spv=1";
        }
        this.callConversionCode();
        this.activeFooterOnReady();
    }

    callIdentifyPopup(){
        let match=window.location.href.match(/back=1/) ;
        if((this.c_imesh == '' || this.c_imesh==null) && (this.rspv == 2 || this.rspv == 4 || this.rspv == 6)&& match==null){
            $.ajaxSetup({ cache: true }); $.getScript("https://"+UrlPri+"utils.imimg.com/globalhf/identified_popup.js",function(){getIdentifiedPopUpHTMLForm1(); setTimeout(function(){identify_Banner()},3000);});
            $('#IdentifiedPopUpHTML').on("click","#countrySuggesterIdenPop",function(){changePopUpInput(identifiedPopName,1);});is_form_open=0; }
    }     
    activeFooterOnReady(){
        let o = new Date;
        o.setTime(o.getTime() + (30*60*1000));
        if(typeof(jQuery) === 'function'){
            document.cookie = "sessid="+this.newVal + ";expires=" + o.toGMTString() + ";domain=.indiamart.com;path=/;"
            //callIdentifyPopup();
            let ipv = getCookieValByKey("xnHist", "ipv");
            let fpv = getCookieValByKey("xnHist", "fpv");
            let glUserId = getCookieValByKey("ImeshVisitor", "glid");
            let name = getCookieValByKey("ImeshVisitor", "mb1");
            let modid = glmodid;
            let email = getCookieValByKey("ImeshVisitor", "em");
            let city = getCookieValByKey("ImeshVisitor", "ct");
            let ph_country = getCookieValByKey("ImeshVisitor", "phcc");
            let cn_iso = getCookieValByKey("ImeshVisitor", "iso");
            //Mobile Verification Popup for 3rd and 5th Page view
            //  if(((ipv == 2)||(ipv==4))&& (!(window.location.href.indexOf("my") > -1))) {  
            //      let screen = 'VER';
            //      if (name!=''&& getparamVal(pop_imesh, "phcc") == '91' && getparamVal(pop_imesh, "uv") != 'V'){        
            //          $.getScript("https://"+UrlPri+"utils.imimg.com/header/js/imlogin.js", function(){ send_otp(glUserId,modid,name,ph_country,'121',cn_iso,'2','4',screen);
            //          });
            //      }
            // }   
        } else{ setTimeout(function(){activeFooterOnReady()}, 50);}
    }

    recordInboundLinkS_bounce(category, action, label, value, noninteraction) { _gaq.push(['_trackEvent', window.location.href , action, label, value, noninteraction]); }
    recordOutboundLink3(category, action){_gaq.push(['_trackEvent', category, action, 'trackPageviewParam']);}
    callConversionCode()
    {
        /* <![CDATA[ */
        let google_conversion_id = 1067418746;
        let google_custom_params = window.google_tag_params;
        let google_remarketing_only = true;/* ]]> */
        $.getScript( "https://www.googleadservices.com/pagead/conversion.js" );
        $('.cf_ftlk ul li a').on('click',function(){let value=$(this).text();_gaq.push(['_trackEvent', 'IM Global Footer ', window.location.host, value, 0]); }); 
    }

    render(){
        return(
            <div>
                <div class="cf_clb cf_footer"><div class="cf_ftHd"><div class="cf_wd"><div class="cf_social">Follow us on: <a href="https://www.facebook.com/IndiaMART" class="cf_fb" target="_blank">Facebook</a> <a href="https://twitter.com/IndiaMART" class="tw_ft" target="_blank">Twitter</a> <a href="https://www.linkedin.com/company/indiamart-intermesh-limited/" class="cf_lkd_in" target="_blank">linkedin</a> </div><div class="cf_goMob cf_rht">Go Mobile: <a href="https://itunes.apple.com/us/app/indiamart-buy-sell-products/id668561641?mt=8" class="cf_iOS" target="_blank">iOS App</a> <a href="https://play.google.com/store/apps/details?id=com.indiamart.m" class="cf_anrd" target="_blank">Android App</a><a href="https://m.indiamart.com/" class="cf_mSit" target="_blank">https://m.indiamart.com</a></div><span class="cf_fhd">We are here to help you!</span></div></div><div class="cf_wd cf_ftlk" id="sag"></div><div class="cf_cryt"><div class="cf_wd"><span class="cf_rht"><a href="https://www.indiamart.com/terms-of-use.html">Terms of Use</a> - <a href="https://www.indiamart.com/privacy-policy.html">Privacy Policy</a> - <a href="https://www.indiamart.com/link-to-us.html">Link to Us</a></span><span>Copyright &copy; 1996-2022 IndiaMART InterMESH Ltd. All rights reserved.</span></div></div><div class="chat_window psRght"></div></div>
                <div id="IdentifiedPopUpHTML"></div>
                <NoScript><div class="disInline"><img height="1" width="1" class="brdNone" alt="google" src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/1067418746/?value=0&amp;guid=ON&amp;script=0"/></div></NoScript><NoScript><img height="1" width="1" alt="facebook" class="disNone" src="https://www.facebook.com/tr?id=1000024446685311&amp;ev=PixelInitialized" /></NoScript>
            </div>
        )
    }
    componentDidMount(){
        this.startingcall();
    }
}