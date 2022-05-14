import ActionTypes from "../../constants/ActionTypes";

export function setRobotData(data: any) {
    return {
        type: ActionTypes.SET_ROBOTS_DATA,
        data,
    };
}
