import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../app/store';
import RobotsDataService from "../../services/robots.service";
import RobotData from '../../types/robot.type';
import { setRobotData } from "../../app/actions/robots.action";

type Props = {};

const RobotList: FC<Props> = (props) => {
    const { robots } = useSelector<RootState, any>((state) => state.robots);
    const dispatch = useDispatch();

    const retrieveRobots = () => {
        RobotsDataService.getAll()
          .then((response: any) => {
              const robotList = response.data.slice(0, 10);
              dispatch(
                  setRobotData(robotList)
              );
              console.log(robotList);
          })
          .catch((e: Error) => {
            console.log(e);
          });
    }

    // qa stage 1 - extinguish on fire robots
    // call an API for each robot

    // qa stage 2 - recycling robots
    // provide an array to an API

    // display 2 sets of qa approved lists

    useEffect(() => {
        retrieveRobots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {
                robots && robots.map((robot: RobotData, index: number) => (
                    <div>{robot.name}</div>
                ))
            }
        </div>
    );
};

export default RobotList;