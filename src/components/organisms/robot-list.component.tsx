import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../app/store';
import RobotsDataService from "../../services/robots.service";
import { RobotData } from '../../types/robot.type';
import { setRobotData, doExtinguish, checkExtinguish, doRecycle,createShipment } from "../../app/actions/robots.action";
import Robot from "../molecules/robot.component";

const RobotList: FC = () => {
    const { robotList, retrievedBatch, hasExtinguished, hasRecycled, shipmentList } = useSelector<RootState, any>((state) => state.robots);
    const dispatch = useDispatch();

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

    // Send shipment function
    const sendShipment = () => {
        RobotsDataService.createShipment(shipmentList)
        .then((response: any) => {
            dispatch(createShipment());
            retrieveRobots();
        })
        .catch((e: Error) => {
          console.log(e);
        });
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

    return (
        <div className="robot-list row">
            <div className="col-md-6">
                <div className="robot-list__sublist passed">
                    <h3>Passed QA</h3>
                    {
                        robotList && robotList.length > 0 ? robotList.map((robot: RobotData, index: number) => {
                            if (robot.statuses.length === 0 && !robot.forShipment) {
                                return (
                                    <Robot key={robot.id} robot={robot} />
                                );
                            } else {
                                return null;
                            }
                        }) : (
                            <div>No Robot qualified for Passed QA</div>
                        )
                    }
                </div>
                <hr/>
                <div className="robot-list__sublist spare">
                    <h3>Factory Seconds</h3>
                    {
                        robotList && robotList.length > 0 ? robotList.map((robot: RobotData, index: number) => {
                            if (robot.statuses.length > 0 && !robot.forShipment) {
                                return (
                                    <Robot key={robot.id} robot={robot} />
                                );
                            } else {
                                return null;
                            }
                        }) : (
                            <div>No Robot qualified for Factory Seconds</div>
                        )
                    }
                </div>
            </div>
            <div className="col-md-6">
                <h3>Ready to Ship</h3>
                <button onClick={sendShipment} disabled={shipmentList && shipmentList.length === 0}>
                    Send shipment
                </button>
                {
                    shipmentList && shipmentList.length > 0 ? shipmentList.map((id: string, index: number) => {
                        const robot = robotList.find( (robot: RobotData, index: number) => robot.id === id );
                        return (
                            <Robot key={robot.id} robot={robot} />
                        );
                    }) : (
                        <div>No Robots for Shipment</div>
                    )
                }
            </div>
        </div>
    );
};

export default RobotList;