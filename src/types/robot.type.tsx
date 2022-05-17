export interface RobotData {
    id: string,
    name: string,
    configuration: {
        hasSentience: boolean,
        hasWheels: boolean,
        hasTracks: boolean,
        numberOfRotors: number,
        colour: string ,
    },
    statuses: string[],
    forShipment?: boolean,
}

export interface RobotDefaultState {
    robotList: Array<RobotData>,
    shipmentList: Array<string>,
    retrievedBatch: boolean,
    hasExtinguished: boolean,
    hasRecycled: boolean,
}
