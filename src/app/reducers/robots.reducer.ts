import ActionTypes from "../../constants/ActionTypes";
import { RobotDefaultState, RobotData } from "../../types/robot.type";

const defaultState = {
    robotList: [],
    shipmentList: [],
    retrievedBatch: false,
    hasExtinguished: false,
    hasRecycled: false,
};

export function extinguish(list: Array<RobotData>, id: number) {
    const statuses = list[id].statuses.filter((status: string) => status !== "on fire");
    list[id] = {
        ...list[id],
        statuses: [...statuses]
    }

    return list
}

export function addToShipment(robotList: Array<RobotData>,shipmentList: Array<string>, id: string) {
    const robotIndex = robotList.findIndex( robot => robot.id === id );
    const robot = {...robotList[robotIndex]};

    if (robot && !robot.forShipment) {
        robot.forShipment = true;
        shipmentList.push(id);
        robotList[robotIndex] = robot;
    }
    return {
        robotList: [
            ...robotList
        ],
        shipmentList: [
            ...shipmentList
        ]
    };
}

export function removeFromShipment(robotList: Array<RobotData>,shipmentList: Array<string>, id: string) {
    const robotIndex = robotList.findIndex( robot => robot.id === id );
    const shipmentIndex = shipmentList.findIndex( robotId => robotId === id );
    const robot = {...robotList[robotIndex]};

    robot.forShipment = false;
    shipmentList.splice(shipmentIndex, 1)
    robotList[robotIndex] = robot;
    return {
        robotList: [
            ...robotList
        ],
        shipmentList: [
            ...shipmentList
        ]
    };
}

function robotReducer(state : RobotDefaultState = defaultState, action: any) {
    switch (action.type) {
        case ActionTypes.SET_ROBOTS_DATA:
            return {
                ...state,
                robotList: action.data,
                retrievedBatch: true,
            };
        case ActionTypes.DO_EXTINGUISH:
            return {
                ...state,
                robotList: [
                    ...extinguish([...state.robotList], action.id)
                ],
            };
        case ActionTypes.CHECK_EXTINGUISH:
            return {
                ...state,
                hasExtinguished: true,
            };
        case ActionTypes.DO_RECYCLE:
            return {
                ...state,
                robotList: action.data,
                hasRecycled: true,
            };
        case ActionTypes.ADD_TO_SHIPMENT:
            return {
                ...state,
                ...addToShipment(
                    [...state.robotList],
                    [...state.shipmentList],
                    action.id
                )
            };
        case ActionTypes.REMOVE_FROM_SHIPMENT:
            return {
                ...state,
                ...removeFromShipment(
                    [...state.robotList],
                    [...state.shipmentList],
                    action.id
                )
            };
        case ActionTypes.SEND_SHIPMENT:
            return {
                ...defaultState,
            };
        default:
            return state;
    }
}

export default robotReducer;
