import Axios from "axios";

export const setDataTour = (page) => (dispatch) => {
    Axios.get(`http://localhost:4000/v1/pesona-malang/tours`)
    .then(result => {
        const responseAPI = result.data;
        dispatch({type: "UPDATE_DATA_TOUR", payload: responseAPI.data});
        dispatch({
            type: "UPDATE_PAGE",
            payload: {
                currentPage: responseAPI.current_page,
                totalPage: Math.ceil(responseAPI.total_data / responseAPI.per_page)
            }
        })
    })
    .catch(err => {
        console.log('error: ', err);
    })
}
