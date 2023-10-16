import { FC } from "react";

import { useNavigate } from "react-router-dom";

import { Badge } from "components/shared/Badge";

import styles from "./bidsTable.module.scss";

const BidsTable: FC = () => {
    return (
        <table className={styles.table}>
            <TableHead />
            <TableBody bids={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]} />
        </table>
    );
};

export default BidsTable;

function TableHead() {
    return (
        <thead className={styles.tableHead}>
            <tr>
                <th style={{ width: 70 }}>id</th>
                <th style={{ width: 110 }}>дата</th>
                <th style={{ width: 170 }}>услуга</th>
                <th>имя</th>
                <th>email</th>
                <th>телефон</th>
                <th style={{ width: 150 }}>статус</th>
            </tr>
        </thead>
    );
}

function TableBody({ bids }: { bids: number[] }) {
    const navigate = useNavigate();

    return (
        <tbody className={styles.tableBody}>
            {bids.map((value) => (
                <tr key={value} onClick={() => navigate(`/bids/${value}`)}>
                    <td data-label>13</td>
                    <td data-label>13.13.1313</td>
                    <td data-label>Что-то</td>
                    <td data-label>Легендов Михуил</td>
                    <td data-label>mi.xuil@mail.ru</td>
                    <td data-label>+1313131313</td>
                    <td data-label>
                        {value % 3 === 0 && (
                            <Badge variant="success">Зарегистрирована</Badge>
                        )}
                        {value % 3 === 1 && (
                            <Badge variant="warning">На согласовании</Badge>
                        )}
                        {value % 3 === 2 && (
                            <Badge variant="danger">Отклонена</Badge>
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    );
}
