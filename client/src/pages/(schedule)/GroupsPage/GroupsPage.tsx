import { FC } from "react";

import { Helmet } from "react-helmet";

import { Groups } from "components/schedule/Groups";

const GroupsPage: FC = () => {
    return (
        <>
            <Meta />
            <Groups />;
        </>
    );
};

export default GroupsPage;

function Meta() {
    return (
        <Helmet>
            <title>Schedule | Groups</title>
            <meta name="description" content="Группы" />
        </Helmet>
    );
}
