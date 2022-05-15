import { setRobotData } from "../app/actions/robots.action";

it('should create an action with SET_ROBOTS_DATA type', () => {
    const value = 5;
    const expectation = [
        {
            "id": "4a1cd335-656e-5f2b-b34f-d79266886eca",
            "name": "Simone",
            "configuration": {
              "hasSentience": false,
              "hasWheels": false,
              "hasTracks": true,
              "numberOfRotors": 1,
              "Colour": "blue"
            },
            "statuses": ["rusty", "loose screw", "loose screw"]
          },
          {
            "id": "f89dc624-a93e-585a-b3b0-a1f0c2abee96",
            "name": "Narciso",
            "configuration": {
              "hasSentience": true,
              "hasWheels": false,
              "hasTracks": false,
              "numberOfRotors": 4,
              "Colour": "blue"
            },
            "statuses": ["loose screw", "paint scratched", "rusty", "on fire"]
          },
    ];

    expect(setRobotData(value)).toEqual(expectation);
});

// extinguish
// should call an API and remove 'on fire'