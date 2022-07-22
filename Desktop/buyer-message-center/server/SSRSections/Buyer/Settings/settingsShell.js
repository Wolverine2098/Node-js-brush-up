let GblComFunc = require('../../../GblComFunc'),
   chunkVersion = require('../../../version.json'),
   appShell = GblComFunc.APP_SHELL_STRUCTURE();
let mnMinbase = 'https://my.imimg.com';
import { PWAAppState } from '../../../../src/Redux/store';
typeof (process.env.NODE_ENV_M) == 'undefined' ? mnMinbase = '' : process.env.NODE_ENV_M == 'dev' ? mnMinbase = 'https://dev-my.imimg.com' : process.env.NODE_ENV_M == 'stg' ? mnMinbase = 'https://stg-my.imimg.com' : mnMinbase = 'https://my.imimg.com';

function preloadedChunks() {
   // console.log(process.env.NODE_ENV_M);
   // console.log(mnMinbase);
   return (` 
   <!-- <link rel="manifest" href="/manifest.json" crossorigin="use-credentials" > -->
   <link rel="preconnect" href="https://${process.env.NODE_ENV_M == 'dev' ? 'dev-': process.env.NODE_ENV_M == 'stg' ? 'stg-' : ''}my.imimg.com/" crossorigin > 
   <link rel="preconnect" href="https://geoip.imimg.com" crossorigin >
   
   <link rel="preload" href="${mnMinbase + '/pwagifs/BuyerSettings.pwa' + chunkVersion["jsChunks"] + '.js'}" as="script" >
   <link rel="preload" href="${mnMinbase + '/pwagifs/BuyerSettings.pwa' + chunkVersion["cssChunks"] + '.css'}" as="style">
   <link rel="preload" href="${mnMinbase + '/pwagifs/main-min_' + chunkVersion["main_min"] + '.js'}" as="script" >
      
   <script async="" type="text/javascript" src="https://www.googletagmanager.com/gtm.js?id=GTM-NR4G&l=imgtm">

   `);
}

function SettingsShellStruct() {
   let crumbsObj = [
      {
         "@context": "https://schema.org",
         "@type": "WebSite",
         "name": "IndiaMART",
         "alternateName": "IndiaMART InterMESH Ltd",
         "url": "https://m.indiamart.com/",
         "potentialAction": [
            {
               "@type": "SearchAction",
               "target": "https://dir.indiamart.com/search.mp?ss={search_term_string}",
               "query-input": "required name=search_term_string"
            },
            {
               "@type": "SearchAction",
               "target": "https://m.indiamart.com/isearch.php?s={search_term_string}",
               "query-input": "required name=search_term_string"
            },
            {
               "@type": "SearchAction",
               "target": "android-app://com.indiamart.m/https/m.indiamart.com/isearch.php?s={search_term_string}",
               "query-input": "required name=search_term_string"
            }
         ]
      },
      {
         "@context": "https://schema.org",
         "@type": "Organization",
         "name": "IndiaMART",
         "url": "https://m.indiamart.com/",
         "logo": "https://my.imimg.com/gifs/indiamartlogo.jpg",
         "contactPoint": [
            {
               "@type": "ContactPoint",
               "telephone": "+91-96-9696-9696",
               "contactType": "customer service"
            }
         ],
         "sameAs": [
            "https://www.facebook.com/IndiaMART",
            "https://twitter.com/IndiaMART",
            "https://www.linkedin.com/company/indiamart-intermesh-limited/",
            "https://www.youtube.com/user/indiamart",
            "https://en.wikipedia.org/wiki/IndiaMART",
            "https://www.instagram.com/indiamart/"
         ]
      }
   ];
   appShell.FOOTER_LINK = 'https://www.indiamart.com';
   appShell.FOOTER = 'DEFAULT';
   appShell.STATUS = 200;
   appShell.TITLE = '<title>Welcome to My IndiaMART</title>';
   appShell.SEARCHBAR = 'DEFAULT';
   appShell.META = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"><meta name="language" content="en"/><meta property="og:title" content="IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer" /><meta property="og:type" content="website" /><meta property="og:url" content="https://m.indiamart.com" /><meta property="og:site_name" content="IndiaMART" /><meta property="og:image" content="https://my.imimg.com/gifs/iml300.png" /><meta property="og:image:url" content="https://my.imimg.com/gifs/iml300.png" /><meta property="og:image:width" content="300" /><meta property="og:image:height" content="300" /><meta property="og:description" content="IndiaMART.com is India\'s largest online marketplace that assists manufacturers, suppliers exporters to trade with each other at a common, reliable & transparent platform. Largest free online business directory & yellow page with listing of 1,945,000 Indian & International companies. Find here quality products, trade leads, manufacturers, suppliers, exporters & international buyers." ><meta name="description" content="IndiaMART.com is India\'s largest online marketplace that assists manufacturers, suppliers exporters to trade with each other at a common, reliable & transparent platform. Largest free online business directory & yellow page with listing of 1,945,000 Indian & International companies. Find here quality products, trade leads, manufacturers, suppliers, exporters & international buyers."><meta name="keywords" content="Business directory, business directory in india, business e-commerce, business listings, business website, business marketplace, companies business listings, companies database india, companies directory, companies directory india, directory of companies, directory of indian companies, e-commerce in india, electronic trade &amp; commerce, electronic trade and commerce, exporter importer directory, exporters business directory, exporters in india, free business listings, free business listings in india, free business marketplace, free indian companies business listings, free manufacturers directory india, importers, india business directory, india export import, india importers, indiamart, indian business, Indian companies directory, indian exporters, indian exporters directory, indian manufacturers directory, indian market, indian service providers, manufacturers directory, manufacturers in india, online business directory, online marketplace,suppliers directory, yellow pages">';
   appShell.CANONICAL_LINKS = '<link rel="canonical" href="https://www.indiamart.com/"><link rel="alternate" href="https://m.indiamart.com/" media="only screen and (max-width:640px)"><link rel="alternate" href="android-app://com.indiamart.m/https/m.indiamart.com/"><link rel="apple-touch-icon" href="https://my.imimg.com/apple-touch-icon.png"><link rel="apple-touch-icon-precomposed" href="https://my.imimg.com/apple-touch-icon-precomposed.png">';
   appShell.LOADER = 'DEFAULT';
   appShell.HEAD_SCRIPTS = `${preloadedChunks()}<script type='application/ld+json'>` + JSON.stringify(crumbsObj) + `</script>
      <style>
      .imliteiconContainer{text-align:center;text-transform:capitalize;display:inline-block}.imliteicon{display:inline;height:50px;top:-25px;left:40%;position:absolute}.imgolite{color:#2e3192;bottom:0;padding:10px;font-size:15px}.fw{font-weight:700}.cross_grey{width:22px;height:28px;right:4%;background-position:-156px -25px;z-index:100;top:5%;position:absolute;background:#fff;border:0}.pf{position:fixed}.offlinepop{box-sizing:border-box;box-shadow:0 2px 4px 0 #000;bottom:45px;left:0;width:100%;font-size:14px;padding:0 10px;transform:translateY(100%);z-index:1000;background:#323232;color:#f1f1f1}.pd15{padding:15px}.dib{display:inline-block}.ml5{margin-left:5px}.pl10{padding-left:10px}.por,.pr{position:relative}
      
      .pbrNB input[type=tel]:focus,.pbrNB input[type=text]:focus{box-shadow:0 0 10px #fff;border:1px solid #10a699}
      
      .prPd{padding:0 28px 0 10px}.stp1,.stp2,.stp3{width:30px;height:26px;margin:0 auto 5px}.stp1{background-position:4px -152px}.stp2{background-position:-42px -152px}.stp3{background-position:-91px -152px}.ln13{line-height:13px}.pbrNB input::-webkit-input-placeholder{font-size:16px}.pbrNB input::-moz-placeholder{font-size:16px}.pbrNB input::-webkit-input-placeholder{font-size:16px}.pbrNB{background-color:#0e2b54;background-image:linear-gradient(#0e2b54,#192036)}.pbrNB input::-moz-input-placeholder{font-size:16px}.pbrNB .err{color:#ffeb54;font-size:12px;padding:5px 0 12px}
      
      .mb10{margin-bottom:10px}.clrw{color:#fff!important}.pdb5{padding-bottom:5px}.pdt5{padding-top:5px}.bgmim{background-color:#00a699}.fs16{font-size:16px}.compCl{background-color:#15746d;background-image:linear-gradient(to right,#00a699 ,#15746d)}.compBl{background-color:#2f3394;background-image:linear-gradient(to right,#5058bc ,#2f3394)}.w45{width:45%}.m10{margin:7px}.mnH240{min-height:240px}.bgBlu{background-color:#2e3192}*{margin:0;padding:0;box-sizing:border-box;outline:0;border:none}@keyframes ripple{0%,35%{transform:scale(0);opacity:1}50%{transform:scale(1.5);opacity:.8}100%{opacity:0;transform:scale(4)}}.compCl{background-color:#15746d;background-image:linear-gradient(to right,#00a699 ,#15746d)}.compCl.ripple:active{background:radial-gradient(circle,transparent 1%,#000 1%) center/15000% #000;background-size:100%;transition:background 0s}.compCl.ripple:hover{background:radial-gradient(circle,transparent 1%,#15746d 1%) center/15000% #00a699}compCl:active{animation:ripple .3s ease-out;background:radial-gradient(circle,transparent 1%,#157#000D 1%) center/15000% #000}.pdt10{padding-top:10px}.pdb10{padding-bottom:10px}.ml10{margin-left:10px}.mr10{margin-right:10px}.clrb{color:#333}.pd5{padding:5px}.mt5{margin-top:5px}.fl{float:left}.db{display:block}.pr10{padding-right:10px}.clrBl{color:#2e3192}.clr99{color:#999}.wrapper{background-color:#efefef}.bxrd4{border-radius:4px}.vat{vertical-align:top}.mt60{margin-top:60px}.bxrd100{border-radius:100%}.bxsh15{box-shadow:0 0 10px rgba(0,0,0,.15)}.poa{position:absolute}.cntr{left:0;right:0;top:0;bottom:0;margin:auto}.clr5a{color:#5a5a5b}.bxsdw{box-shadow:0 1px 2px rgba(0,0,0,.2)}.bxrd20{border-radius:20px}.pdtb105{padding:10px 5px;}.ma{margin-left:auto;margin-right:auto}.w70{width:70%}.w50{width:50%}.bxdw2{box-shadow:0 0 3px rgba(0,0,0,.25)}.brd5{border-radius:10px}.fs15{font-size:15px}.txtElip{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.oh{overflow:hidden}.dn{display:none}.mbg{background:rgba(51,51,51,.96);display:none;height:100%;left:0;position:fixed;top:0;width:100%;z-index:99}.mbg.bdZ{z-index:9999!important}.w125p{width:125px}.ht125px{height:125px}.srchLoader:before{content:'';box-sizing:border-box;position:absolute;left:50%;width:30px;height:30px;margin-left:-15px;border-radius:50%;border:2px solid #ccc;border-top-color:#00a699;animation:spinner .8s linear infinite}.vSh1{fill:#00a699;opacity:.81}.vSh2{fill:#d71920}.ht60p{height:60px}.LazyLoad.is-visible{opacity:1;transition:.1s all ease-in-out;-webkit-transition:.1s all ease-in-out}.LazyLoad.is-visible+.dOff{width:0;opacity:0}.lazy{max-width:125px;max-height:125px}.extendedSctn div.extBG{background-color:#dee5ff;border-radius:10px}#new-inline-pbr.extendedSctn{padding:10px 10px 10px}.fillbtn{background-color:#2e3192!important;border:1px solid #2e3192!important}.w80{width:80%}.extendedSctn{padding:10px 10px 10px}.mbtm5{margin-bottom:5px}.fs24{font-size:24px}.fs20{font-size:20px}.btm0{bottom: 0;}.z999{z-index: 999;}.bgw{background-color: #fff;}
      .fwn {font-weight: normal;}
      </style>
      `;
   appShell.BODY_SCRIPTS = `
      window.__INITIAL_STATE__ = ${JSON.stringify(PWAAppState())};
      `
   appShell.STATE = '';
   appShell.PRE_CONNECTS = '';
}

function getSettingsPage(req, res, shellCallBck) {
   SettingsShellStruct();
   shellCallBck(res, appShell);
}


module.exports = getSettingsPage;