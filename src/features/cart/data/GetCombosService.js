import {ResponseResultError, ResponseResultSuccess} from "./../../../utils/ResponseResult";

export const GetCombosService = async () => {
    try {
        const response = await fetch("combo_data.json");
        const data = await response.json();
        return ResponseResultSuccess(data)
    } catch (error) {
        return ResponseResultError(error)
    }
}