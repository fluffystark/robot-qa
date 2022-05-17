import ActionTypes from "../../constants/ActionTypes";

export function setRobotData(data: any) {
    return {
        type: ActionTypes.SET_ROBOTS_DATA,
        data,
    };
}

export function doExtinguish(id: number) {
    return {
        type: ActionTypes.DO_EXTINGUISH,
        id,
    };
}

export function doRecycle(data: any) {
    return {
        type: ActionTypes.DO_RECYCLE,
        data,
    };
}

export function checkExtinguish() {
    return {
        type: ActionTypes.CHECK_EXTINGUISH
    };
}

export function addToShipment(id: string) {
    return {
        type: ActionTypes.ADD_TO_SHIPMENT,
        id,
    };
}

export function removeFromShipment(id: string) {
    return {
        type: ActionTypes.REMOVE_FROM_SHIPMENT,
        id,
    };
}

export function createShipment() {
    return {
        type: ActionTypes.SEND_SHIPMENT,

    };
}