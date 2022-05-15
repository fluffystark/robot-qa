export interface RobotData {
    id: string,
    name: string,
    configuration: {
        hasSentience: boolean,
        hasWheels: boolean,
        hasTracks: boolean,
        numberOfRotors: number,
        Colour: 'blue' | 'red' | 'black' | 'white',
    },
    statuses: ("on fire" | "rusty" | "loose screw" | "paint scratched")[],
}

export interface RobotDefaultState {
    robotList: Array<RobotData>,
    retrievedBatch: boolean,
    hasExtinguished: boolean,
    hasRecycled: boolean,
}
