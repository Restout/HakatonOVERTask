import { FC } from "react";

import { useParams } from "react-router-dom";

import { Schedule } from "components/schedule/Schedule";
import { Helmet } from "react-helmet";

const SchedulePage: FC = () => {
    const { groupId } = useParams();

    if (!groupId) return null;

    return (
        <div>
            <Meta groupName={groupId} />
            <Schedule groupId={groupId} />
        </div>
    );
};

export default SchedulePage;

function Meta({ groupName }: { groupName: string }) {
    return (
        <Helmet>
            <title>Schedule | {groupName}</title>
            <meta
                name="description"
                content={`Расписание занятий группы ${groupName}`}
            />
        </Helmet>
    );
}
