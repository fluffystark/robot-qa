import ActionTypes from "../../constants/ActionTypes";

export function setRobotData(data: any) {
    return {
        type: ActionTypes.SET_ROBOTS_DATA,
        data,
    };
}

export function doExtinguish(id: string) {
    return {
        type: ActionTypes.DO_EXTINGUISH,
        id,
    };
}

export function doRecycle(data: Array<string>) {
    return {
        type: ActionTypes.DO_RECYCLE,
        data,
    };
}
