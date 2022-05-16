import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../app/store';
import RobotsDataService from "../../services/robots.service";
import { RobotData } from '../../types/robot.type';
import { setRobotData, doExtinguish, checkExtinguish, doRecycle } from "../../app/actions/robots.action";
import Robot from "../molecules/robot.component";

type Props = {};

const RobotList: FC<Props> = (props) => {
    const { robotList, retrievedBatch, hasExtinguished, hasRecycled } = useSelector<RootState, any>((state) => state.robots);
    const dispatch = useDispatch();
    const [forShipment, setForShipment] = useState([]);

    const retrieveRobots = () => {
        RobotsDataService.getAll()
          .then((response: any) => {
              const robots = response.data.slice(0, 10);
              dispatch(
                  setRobotData(robots)
              );
          })
          .catch((e: Error) => {
            console.log(e);
          });
    }

    // qa stage 1 - extinguish on fire robots
    // call an API for each robot
    const extinguishRobots = () => {
        robotList.forEach((robot: RobotData, index: number) => {
            const hasSentience = robot.configuration.hasSentience;
            const onFire = robot.statuses.find((status: string) => status === "on fire");

            if (hasSentience && onFire) {
                console.log("check");
                RobotsDataService.extinguish(robot.id)
                  .then((response: any) => {
                        dispatch(
                            doExtinguish(index)
                        );
                  })
                  .catch((e: Error) => {
                    console.log(e);
                  });
            }

        });
        dispatch(checkExtinguish());
    }

    const recycleRobots = () => {
        const recycledRobots: Array<string> = [];
        const passedRobots: Array<RobotData> = [];
        robotList.forEach((robot: RobotData, index: number) => {
            if (
                (robot.configuration.numberOfRotors > 8 || robot.configuration.numberOfRotors < 3)
                || (robot.configuration.numberOfRotors > 0 && robot.configuration.colour === "blue")
                || (robot.configuration.hasWheels && robot.configuration.hasTracks)
                || (robot.configuration.hasWheels && robot.statuses.find((status: string) => status !== "rusty"))
                || (robot.configuration.hasSentience && robot.statuses.find((status: string) => status !== "loose screws"))
                || (robot.statuses.find((status: string) => status === "on fire"))
            ) {
                recycledRobots.push(robot.id);
            } else {
                passedRobots.push(robot);
            }
        })
        console.log(recycledRobots, passedRobots);
    
        if (recycledRobots.length > 0) {
            RobotsDataService.recycle({
                recycleRobots: recycledRobots
            }).then((response: any) => {
                console.log(passedRobots);
                dispatch(doRecycle(passedRobots));
            })
            .catch((e: Error) => {
              console.log(e);
            })
        }
    }

    useEffect(() => {
        retrieveRobots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (retrievedBatch) {
            if (!hasExtinguished) {
                extinguishRobots();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [retrievedBatch]);

    // qa stage 2 - recycling robots
    // provide an array to an API
    useEffect(() => {
        if (hasExtinguished) {
            if (!hasRecycled) {
                recycleRobots();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasExtinguished]);

    // display 2 sets of qa approved lists

    return (
        <div className="robot-list row">
            <div className="col-md-6">
                <div>
                    <h3>Passed QA</h3>
                    {
                        robotList && robotList.map((robot: RobotData, index: number) => {
                            if (robot.statuses.length === 0) {
                                return (
                                    <Robot key={robot.id} robot={robot} />
                                );
                            }
                        })
                    }
                </div>
                <div>
                    <h3>Spare</h3>
                    {
                        robotList && robotList.map((robot: RobotData, index: number) => {
                            if (robot.statuses.length > 0) {
                                return (
                                    <Robot key={robot.id} robot={robot} />
                                );
                            }
                        })
                    }
                </div>
            </div>
            <div className="col-md-6">
                <h3>For Shipment</h3>
            </div>
        </div>
    );
};

export default RobotList;