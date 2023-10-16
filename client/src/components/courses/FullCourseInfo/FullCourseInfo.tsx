import { FC } from "react";

import cn from "clsx";

import { Container } from "components/shared/Container";
import { Title } from "components/ui/typography/Title";

import styles from "./fullCourseInfo.module.scss";

interface Props {}

const FullCourseInfo: FC<Props> = () => {
    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.wrapper}>
                    <div>
                        <Subsection
                            title="О курсе"
                            content="В пределах курса будут рассмотрены простейшие гидродинамические модели вулканических извержений. Будет дано объяснение многим наблюдаемым закономерностям, связанным с периодичностью извержений и сменой их характера. В качестве примеров будут рассмотрены извержения вулканов Везувий (Италия), Шивелуч (Камчатка), Маунт Сент Хеленс (США), Суфриере-Хиллз (острова Карибского моря)."
                        />
                        <Subsection
                            title="Программа курса"
                            content="Тема 1. Введение в вулканологию. Объекты, методы и история развития вулканологии. Глубинное строение Земли (кора, мантия, ядро, литосфера и астеносфера, континентальные и океанические плиты). Источники тепла, возможность мантийной конвекции. (Плечов П.Ю.)"
                        />
                        <Subsection
                            title="Требования"
                            content="Курс рассчитан на широкую аудиторию, но требует подготовки в объёме средней школы по географии, математике, физике и химии. Отдельные темы требуют знаний математики и физики на уровне студентов первого курса естественнонаучных направлений."
                        />
                        <Subsection
                            title="Результаты обучения"
                            content="В результате прослушивания данного курса слушатели должны получить общие представления о вулканизме Земли и других тел Солнечной системы,  современных методах вулканологии и основных процессах, происходящих перед извержениями, во время извержений и послед извержений вулканов,  в том числе представляющих опасность для человека."
                        />
                    </div>
                    <div>
                        <Chief />
                        <Contacts />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default FullCourseInfo;

function Subsection({ title, content }: { title: string; content: string }) {
    return (
        <div className={styles.subsection}>
            <Title className={styles.subsectionTitle} size="middle">
                {title}
            </Title>
            <p>{content}</p>
        </div>
    );
}

function Chief() {
    return (
        <div className={styles.chiefBody}>
            <div className={styles.initials}>КК</div>
            <div className={styles.title}>
                <h4>Буенов Рамилео Амигович</h4>
                <p>Руководитель программы</p>
            </div>
        </div>
    );
}

function Contacts() {
    return (
        <div className={styles.contactsBody}>
            <h6>Контакты:</h6>
            <p>798134567</p>
            <p>ramileo@mail.com</p>
        </div>
    );
}
