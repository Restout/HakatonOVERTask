import { FC, useImperativeHandle, useState } from "react";

import axios from "axios";
import {
    Control,
    FieldError as FieldErrorType,
    RegisterOptions,
    SubmitHandler,
    UseFormRegister,
    useForm,
} from "react-hook-form";
import { Link } from "react-router-dom";

import { Alert } from "components/ui/Alert";
import { Button } from "components/ui/Button";
import { FieldError } from "components/ui/FieldError";
import { FieldGroup } from "components/ui/FieldGroup";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";

import useFocus from "hooks/shared/useFocus";

import { formErrors } from "constants/formErrors";
import { SIGN_UP_PATH } from "constants/routesPathnames";

import styles from "./signInPage.module.scss";

interface SignInState {
    email: string;
    password: string;
}

interface FieldProps {
    register: UseFormRegister<SignInState>;
    error?: FieldErrorType;
    control?: Control<SignInState>;
}

const SignInPage: FC = () => {
    const [error, setError] = useState<string | null>(null);
    const {
        handleSubmit: submitHandlerWrapper,
        register,
        reset,
        control,
        formState: { errors },
    } = useForm<SignInState>();

    const handleSubmit: SubmitHandler<SignInState> = async (data) => {
        console.log(data);
        // const response = await axios.post("/hackathon/auth/login");
    };

    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Вход</h1>
                <form
                    className={styles.form}
                    onSubmit={submitHandlerWrapper(handleSubmit)}
                >
                    <Email register={register} error={errors.email} />
                    <Password register={register} error={errors.password} />
                    <Button
                        className={styles.button}
                        variant="dark-blue"
                        type="submit"
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

function Email({ register, error }: FieldProps) {
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
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Password({ register, error }: FieldProps) {
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
                {...register("password", fieldOptions)}
                id="password"
                type="password"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}
