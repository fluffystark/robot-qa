import React, { FC } from "react";
import { RobotData } from '../../types/robot.type';

type Props = {
    robot: RobotData
};

const Robot: FC<Props> = (props) => {
    const { robot } = props;

    return (
        <div className="robot">
            <div>
                ID: <strong>{robot.id}</strong>
            </div>
            <div>
                Name: <strong>{robot.name}</strong>
            </div>
            <div className="robot__configuration">
                <div className="robot__configuration__title">Configurations</div>
                <div>hasSentience: <strong>{robot.configuration.hasSentience.toString()}</strong></div>
                <div>hasWheels: <strong>{robot.configuration.hasWheels.toString()}</strong></div>
                <div>hasTracks: <strong>{robot.configuration.hasTracks.toString()}</strong></div>
                <div>numberOfRotors: <strong>{robot.configuration.numberOfRotors}</strong></div>
                <div>colour: <strong>{robot.configuration.colour}</strong></div>
            </div>
            <button>Add to shipment</button>
        </div>
    );
};

export default Robot;