import { setRobotData } from "../app/actions/robots.action";
import robotReducer from "../app/reducers/robots.reducer";
import ActionTypes from "../constants/ActionTypes";
import RobotDataService from "../services/robots.service";
import http from "../http-common";
import axios from "axios";

it('should create an action with SET_ROBOTS_DATA type', () => {
    const data = [
        {
            "id": "4a1cd335-656e-5f2b-b34f-d79266886eca",
            "name": "Simone",
            "configuration": {
              "hasSentience": false,
              "hasWheels": false,
              "hasTracks": true,
              "numberOfRotors": 1,
              "colour": "blue"
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
              "colour": "blue"
            },
            "statuses": ["loose screw", "paint scratched", "rusty", "on fire"]
          },
    ];
    const expectation = {
        type: ActionTypes.SET_ROBOTS_DATA,
        data
    };

    expect(setRobotData(data)).toEqual(expectation);
});

// get robots
it('should handle setting robot list', () => {
  const initialState = {
      robotList: [],
      shipmentList: [],
      retrievedBatch: false,
      hasExtinguished: false,
      hasRecycled: false,
  };

  const data = [
    {
        "id": "4a1cd335-656e-5f2b-b34f-d79266886eca",
        "name": "Simone",
        "configuration": {
          "hasSentience": false,
          "hasWheels": false,
          "hasTracks": true,
          "numberOfRotors": 1,
          "colour": "blue"
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
          "colour": "blue"
        },
        "statuses": ["loose screw", "paint scratched", "rusty", "on fire"]
      },
  ];

  const expectation = {
      robotList: data,
      retrievedBatch: true,
      hasExtinguished: false,
      hasRecycled: false,
  };

  expect(
      robotReducer(initialState, {
          type: ActionTypes.SET_ROBOTS_DATA,
          data,
      })
  ).toEqual(expectation);
});

// extinguish
// should call an API and remove 'on fire'
it('should handle extinguish', () => {
    const initialState = {
        robotList: [
              {
                "id": "f89dc624-a93e-585a-b3b0-a1f0c2abee96",
                "name": "Narciso",
                "configuration": {
                  "hasSentience": true,
                  "hasWheels": false,
                  "hasTracks": false,
                  "numberOfRotors": 4,
                  "colour": "blue"
                },
                "statuses": ["loose screw", "paint scratched", "rusty", "on fire"]
              },
        ],
        shipmentList: [],
        retrievedBatch: true,
        hasExtinguished: false,
        hasRecycled: false,
    };

    const expectation = {
        robotList: [
              {
                "id": "f89dc624-a93e-585a-b3b0-a1f0c2abee96",
                "name": "Narciso",
                "configuration": {
                  "hasSentience": true,
                  "hasWheels": false,
                  "hasTracks": false,
                  "numberOfRotors": 4,
                  "colour": "blue"
                },
                "statuses": ["loose screw", "paint scratched", "rusty"]
              },
        ],
        shipmentList: [],
        retrievedBatch: true,
        hasExtinguished: false,
        hasRecycled: false,
    };

    expect(
        robotReducer(initialState, {
            type: ActionTypes.DO_EXTINGUISH,
            id: 0,
        })
    ).toEqual(expectation);
});
