import '../css/error.css'
import React, { Component } from 'react';

export class error extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="errorDiv"><div class="f24"><img src="https://my.imimg.com/gifs_new/tdr-alert.gif"/><br/>Something is Wrong.</div><p>Sorry for the inconvenience.</p><br/><br/><br/><a href = "javascript:void(0);" onclick={() => window.location.reload(true)} class="btn-buyer">Try Again</a></div>
        )
    }
}