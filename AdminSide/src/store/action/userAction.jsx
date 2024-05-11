import instanceAxios from "../../config/axios";



export const asyncGetUserLogin = () => async (dispatch) => {
    try {
        const {data} = await instanceAxios.get('/foodCategory');
        console.log(data)
        dispatch(getUserLogeIn)
    } catch (error) {
        console.log('error', error);
    }
};