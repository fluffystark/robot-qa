export default interface RobotData {
    id: string,
    name: string,
    configuration: {
        hasSentience: boolean,
        hasWheels: boolean,
        hasTracks: boolean,
        numberOfRotors: number,
        Colour: 'blue' | 'red' | 'black' | 'white',
    },
    statuses: {
        [index: string]: 'on fire' | 'rusty' | 'loose screw' | 'paint scratched'
    },
}
