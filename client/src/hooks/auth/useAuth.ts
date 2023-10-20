import useTypedSelector from "hooks/shared/useTypedSelector";

export const useAuth = () => {
    const { isAuth, user } = useTypedSelector((state) => state.user);

    return { isAuth, role: user?.role ?? null };
};
