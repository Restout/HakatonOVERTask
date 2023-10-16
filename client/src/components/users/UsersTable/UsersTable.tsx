import { FC } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./usersTable.module.scss";

const UsersTable: FC = () => {
    return (
        <table className={styles.table}>
            <TableHead />
            <TableBody bids={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]} />
        </table>
    );
};

export default UsersTable;

function TableHead() {
    return (
        <thead className={styles.tableHead}>
            <tr>
                <th style={{ width: 70 }}>id</th>
                <th>дата рождения</th>
                <th>ФИО</th>
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
                <tr key={value} onClick={() => navigate(`${value}`)}>
                    <td data-label>13</td>
                    <td data-label>13.13.1313</td>
                    <td data-label>Легендов Михуил Бэкэндович</td>
                    <td data-label>mi.xuil@mail.ru</td>
                    <td data-label>+1313131313</td>
                    <td data-label>Студент</td>
                </tr>
            ))}
        </tbody>
    );
}
