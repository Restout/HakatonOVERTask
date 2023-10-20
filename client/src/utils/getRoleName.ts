import { Role } from "constants/role.enum";

export const getRoleName = (role: Role) => {
    switch (role) {
        case Role.ADMIN:
            return "Администратор";
        case Role.ENROLLEE:
            return "Абитуриент";
        case Role.STUDENT:
            return "Студент";
        case Role.SELLECTION_COMMITE:
            return "Сотрудник приемной комиссии";
        case Role.SUPERVISOR:
            return "Куратор";
        case Role.TEACHER:
            return "Преподаватель";
        case Role.MANAGER:
            return "Руководитель";
    }
};
