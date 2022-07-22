import { browserHistory } from 'react-router';

export const goToRoute = (pathTo) => {
    browserHistory.push(pathTo);
}

export const goToMcat = (pathTo,type = "path",returnPath = false) =>{
    //Pass type : "object" if url has params append
    let pathObj;
   
    if(type == "object"){
        pathObj = pathTo;
        pathObj.pathname = pathTo.pathname;
    }
    else{
        pathObj = {
            pathname : pathTo,
        }
    }

    pathObj.state = {isMcat :true};
    if(returnPath){
        return pathObj
    }
    else
    browserHistory.push(pathObj)
}