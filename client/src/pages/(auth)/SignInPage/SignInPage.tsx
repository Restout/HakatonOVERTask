import { FC, useImperativeHandle } from "react";

import { useMutation } from "@tanstack/react-query";
import {
    Control,
    FieldError as FieldErrorType,
    RegisterOptions,
    SubmitHandler,
    UseFormRegister,
    useForm,
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "components/ui/Button";
import { FieldError } from "components/ui/FieldError";
import { FieldGroup } from "components/ui/FieldGroup";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";

import { setUser } from "store/user/userSlice";

import useFocus from "hooks/shared/useFocus";
import useTypedDispatch from "hooks/shared/useTypedDispatch";

import UserService from "services/UserService";

import { LoginCredentials } from "types/user.interface";

import { formErrors } from "constants/formErrors";
import { HOME_PATH, SIGN_UP_PATH } from "constants/routesPathnames";

import styles from "./signInPage.module.scss";

interface SignInState {
    email: string;
    password: string;
}

interface FieldProps {
    register: UseFormRegister<SignInState>;
    error?: FieldErrorType;
    control?: Control<SignInState>;
    isDisabled?: boolean;
}

const SignInPage: FC = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(
        (credentials: LoginCredentials) => UserService.login(credentials),
        {
            onSuccess(response) {
                dispatch(setUser(response.data));
                navigate(HOME_PATH);
                const token = response.headers.authorization.split(" ")[1];
                localStorage.setItem("accessToken", token);
            },
        },
    );

    const {
        handleSubmit: submitHandlerWrapper,
        register,
        reset,
        formState: { errors },
    } = useForm<SignInState>();

    const handleSubmit: SubmitHandler<SignInState> = async (data) => {
        const email = data.email.trim();
        const password = data.password.trim();

        if (!email || !password) {
            return;
        }

        mutate({ email, password });
        reset();
    };

    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Вход</h1>
                <form
                    className={styles.form}
                    onSubmit={submitHandlerWrapper(handleSubmit)}
                >
                    <Email
                        register={register}
                        error={errors.email}
                        isDisabled={isLoading}
                    />
                    <Password
                        register={register}
                        error={errors.password}
                        isDisabled={isLoading}
                    />
                    <Button
                        className={styles.button}
                        variant="dark-blue"
                        type="submit"
                        disabled={isLoading}
                    >
                        Войти
                    </Button>
                    <footer className={styles.footer}>
                        <Link className={styles.link} to={SIGN_UP_PATH}>
                            Регистрация
                        </Link>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;

function Email({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 25;

    const emailRef = useFocus<HTMLInputElement>();

    const { ref, ...rest } = register("email", {
        required: formErrors.required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: formErrors.maxLengthLimit(LENGTH_LIMIT),
        },
    });

    useImperativeHandle(ref, () => emailRef.current);

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="email">
                Email
            </Label>
            <Input
                className={styles.input}
                {...rest}
                placeholder="Email"
                id="email"
                type="email"
                ref={emailRef}
                disabled={isDisabled}
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Password({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 25;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<SignInState, "password"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="password">
                Пароль
            </Label>
            <Input
                className={styles.input}
                placeholder="Пароль"
                disabled={isDisabled}
                {...register("password", fieldOptions)}
                id="password"
                type="password"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}
