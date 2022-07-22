let Bs_initialstate = {
    bs_mp_data:{},
    loader:1,
    fail:0
};

const bsmp_reducer = (state = Bs_initialstate, action) =>{
    switch(action.type){
        case "FETCH_BS_REQUEST":
            return{
                ...state,
                loader:1
            }

        case "FETCH_BS_SUCCESS":
            return{
                ...state,
                bs_mp_data: action.payload,
                loader:0
            }

        case "FETCH_BS_FAILURE":
            return{
                ...state,
                fail:1,
                loader:0
            }

        default: return(state);
    }
};

export default bsmp_reducer;


