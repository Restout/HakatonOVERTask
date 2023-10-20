import { FC } from "react";

import { useParams } from "react-router-dom";

import { Schedule } from "components/schedule/Schedule";

const SchedulePage: FC = () => {
    const { groupId } = useParams();

    if (!groupId) return null;

    return (
        <div>
            <Schedule groupId={groupId} />
        </div>
    );
};

export default SchedulePage;
