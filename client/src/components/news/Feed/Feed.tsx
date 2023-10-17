import { FC, useEffect } from "react";

import { api } from "api";

import { Container } from "components/shared/Container";
import { Title } from "components/ui/typography/Title";

import image from "assets/img/test-image.jpg";

import { Post } from "./Post";
import styles from "./feed.module.scss";

interface Props {}

const Feed: FC<Props> = () => {
    useEffect(() => {
        (async () => {
            try {
                const response = await api.get("/news?page=1&limit=10");
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <section>
            <Container>
                <Title className={styles.title}>Новости и события</Title>
                <ul className={styles.feedList}>
                    <li>
                        <Post
                            date="2020-19-10"
                            src={image}
                            text="Everyday thundercats coloring book yuccie woke. Ugh pok pok taxidermy pabst enamel pin edison bulb farm-to-table"
                            title="Semiotics fixie four, next level woke"
                        />
                    </li>
                    <li>
                        <Post
                            date="2020-19-10"
                            src={image}
                            text="Everyday thundercats coloring book yuccie woke. Ugh pok pok taxidermy pabst enamel pin edison bulb farm-to-table"
                            title="Semiotics fixie four, next level woke"
                        />
                    </li>
                    <li>
                        <Post
                            date="2020-19-10"
                            src={image}
                            text="Everyday thundercats coloring book yuccie woke. Ugh pok pok taxidermy pabst enamel pin edison bulb farm-to-table"
                            title="Semiotics fixie four, next level woke"
                        />
                    </li>
                    <li>
                        <Post
                            date="2020-19-10"
                            src={image}
                            text="Everyday thundercats coloring book yuccie woke. Ugh pok pok taxidermy pabst enamel pin edison bulb farm-to-table"
                            title="Semiotics fixie four, next level woke"
                        />
                    </li>
                    <li>
                        <Post
                            date="2020-19-10"
                            src={image}
                            text="Everyday thundercats coloring book yuccie woke. Ugh pok pok taxidermy pabst enamel pin edison bulb farm-to-table"
                            title="Semiotics fixie four, next level woke"
                        />
                    </li>
                    <li>
                        <Post
                            date="2020-19-10"
                            src={image}
                            text="Everyday thundercats coloring book yuccie woke. Ugh pok pok taxidermy pabst enamel pin edison bulb farm-to-table"
                            title="Semiotics fixie four, next level woke"
                        />
                    </li>
                    <li>
                        <Post
                            date="2020-19-10"
                            src={image}
                            text="Everyday thundercats coloring book yuccie woke. Ugh pok pok taxidermy pabst enamel pin edison bulb farm-to-table"
                            title="Semiotics fixie four, next level woke"
                        />
                    </li>
                </ul>
            </Container>
        </section>
    );
};

export default Feed;
