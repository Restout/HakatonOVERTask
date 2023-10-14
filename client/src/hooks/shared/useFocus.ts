import { useEffect, useRef } from "react";

const useFocus = <T extends HTMLElement>() => {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, []);

    return ref;
};

export default useFocus;
