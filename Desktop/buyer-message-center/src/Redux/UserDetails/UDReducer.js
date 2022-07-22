let userdet = {
    data:{},
    userDetData: false,
    loader:1,
    fail:0
};

const UDreducer = (state = userdet, action) =>{
    switch(action.type){
        case "FETCH_UD_SUCCESS":
            return{
                ...state,
                data: {...action.payload},
                userDetData: true,
                loader:0
            }

        case "FETCH_UD_FAILURE":
            return{
                ...state,
                fail:1,
                loader:0
            }

        default: return(state);
    }
};

export default UDreducer;


