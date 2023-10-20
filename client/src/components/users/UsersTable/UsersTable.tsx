import { FC } from "react";

import cn from "clsx";
import { useNavigate } from "react-router-dom";

import { formatDate } from "utils/formatDate";
import { getRoleName } from "utils/getRoleName";

import { IUser } from "types/user.interface";

import styles from "./usersTable.module.scss";

interface Props {
    users: IUser[];
    isDisabled: boolean;
}

const UsersTable: FC<Props> = ({ users, isDisabled }) => {
    return (
        <table className={styles.table}>
            <TableHead />
            <TableBody users={users} isDisabled={isDisabled} />
        </table>
    );
};

export default UsersTable;

function TableHead() {
    return (
        <thead className={styles.tableHead}>
            <tr>
                <th>ФИО</th>
                <th>email</th>
                <th>телефон</th>
                <th>дата рождения</th>
                <th style={{ width: 150 }}>статус</th>
            </tr>
        </thead>
    );
}

function TableBody({
    users,
    isDisabled,
}: {
    users: IUser[];
    isDisabled: boolean;
}) {
    const navigate = useNavigate();

    return (
        <tbody className={cn(styles.tableBody, isDisabled && styles.disabled)}>
            {users.map((user) => (
                <tr key={user.id} onClick={() => navigate(`${user.id}`)}>
                    <td data-label>
                        {user.lastName} {user.firstName} {user.fatherName}
                    </td>
                    <td data-label>{user.email}</td>
                    <td data-label>{user.phone}</td>
                    <td data-label>{formatDate(user.birthday).date}</td>
                    <td data-label>{getRoleName(user.role)}</td>
                </tr>
            ))}
        </tbody>
    );
}
