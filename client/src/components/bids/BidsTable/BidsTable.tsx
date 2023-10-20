import { FC } from "react";

import cn from "clsx";
import { useNavigate } from "react-router-dom";

import { Badge, BadgeVariantType } from "components/shared/Badge";

import { formatDate } from "utils/formatDate";

import { IApplicationContacts } from "types/application.interface";

import { BidStatus } from "constants/bidsStatus";

import styles from "./bidsTable.module.scss";

interface Props {
    isDisabled: boolean;
    bids: IApplicationContacts[];
}

const BidsTable: FC<Props> = ({ isDisabled, bids }) => {
    return (
        <table className={styles.table}>
            <TableHead />
            <TableBody bids={bids} isDisabled={isDisabled} />
        </table>
    );
};

export default BidsTable;

function TableHead() {
    return (
        <thead className={styles.tableHead}>
            <tr>
                <th>ФИО</th>
                <th>Дата</th>
                <th>Направление</th>
                <th>Email</th>
                <th>Телефон</th>
                <th>статус</th>
            </tr>
        </thead>
    );
}

function TableBody({
    bids,
    isDisabled,
}: {
    bids: IApplicationContacts[];
    isDisabled: boolean;
}) {
    const navigate = useNavigate();

    return (
        <tbody className={cn(styles.tableBody, isDisabled && styles.disabled)}>
            {bids.map((bid) => (
                <tr
                    key={bid.applicationID}
                    onClick={() => navigate(`/bids/${bid.applicationID}`)}
                >
                    <td data-label>
                        {bid.lastName} {bid.firstName} {bid.fatherName}
                    </td>
                    <td data-label>{formatDate(bid.dateOfChange).date}</td>
                    <td data-label>{bid.courseName}</td>
                    <td data-label>{bid.email}</td>
                    <td data-label>{bid.phone}</td>
                    <td data-label>
                        <StatusBadge status={bid.status} />
                    </td>
                </tr>
            ))}
        </tbody>
    );
}

function StatusBadge({ status }: { status: BidStatus }) {
    let badgeVariant: BadgeVariantType = "info";

    switch (status) {
        case BidStatus.FOR_APPROVAL:
            badgeVariant = "info";
            break;
        case BidStatus.UNDER_CONSIDERATION:
            badgeVariant = "warning";
            break;
        case BidStatus.REGISTERED:
            badgeVariant = "success";
            break;
        case BidStatus.REJECTED:
            badgeVariant = "danger";
            break;
    }

    return <Badge variant={badgeVariant}>{status}</Badge>;
}
