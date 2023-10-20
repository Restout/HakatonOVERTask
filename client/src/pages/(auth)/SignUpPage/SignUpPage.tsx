import { FC, useImperativeHandle, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import {
    Control,
    Controller,
    FieldError as FieldErrorType,
    RegisterOptions,
    SubmitHandler,
    UseFormRegister,
    useForm,
} from "react-hook-form";
import { Link } from "react-router-dom";

import { Alert } from "components/ui/Alert";
import { Button } from "components/ui/Button";
import { DateInput } from "components/ui/DateInput";
import { FieldError } from "components/ui/FieldError";
import { FieldGroup } from "components/ui/FieldGroup";
import { FieldRow } from "components/ui/FieldRow";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";

import useFocus from "hooks/shared/useFocus";

import UserService from "services/UserService";

import { checkEmptyValidity } from "utils/checkEmptyValidity";
import { transformDate } from "utils/transformDate";

import { RegisterCredentials } from "types/user.interface";

import { formErrors } from "constants/formErrors";
import { SIGN_IN_PATH } from "constants/routesPathnames";

import styles from "./signUpPage.module.scss";

interface SignUpState {
    firstName: string;
    lastName: string;
    fatherName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    birthday: Date;
    phone: string;
}

interface FieldProps {
    register: UseFormRegister<SignUpState>;
    error?: FieldErrorType;
    control?: Control<SignUpState>;
}

const SignUpPage: FC = () => {
    const {
        handleSubmit: submitHandlerWrapper,
        register,
        control,
        formState: { errors },
    } = useForm<SignUpState>();

    const { mutate, isSuccess } = useMutation(
        (credentials: RegisterCredentials) => UserService.register(credentials),
    );

    const [error, setError] = useState<string | null>(null);

    const handleSubmit: SubmitHandler<SignUpState> = (data: SignUpState) => {
        setError(null);
        const firstName = data.firstName.trim();
        const lastName = data.lastName.trim();
        const fatherName = data.fatherName.trim();
        const email = data.email.trim();
        const phone = data.phone.trim();
        const password = data.password.trim();

        if (
            !checkEmptyValidity([
                firstName,
                lastName,
                fatherName,
                email,
                phone,
                password,
            ])
        ) {
            setError("Неверные форматы данных");
            return;
        }

        if (password !== data.passwordConfirm) {
            setError("Пароли должны совпадать");
        }

        const credentials: RegisterCredentials = {
            birthday: transformDate(data.birthday),
            email,
            firstName,
            lastName,
            fatherName,
            phone,
            password,
        };

        mutate(credentials);
    };

    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>
                {isSuccess && (
                    <Alert variant="success" className={styles.successAlert}>
                        <p>Регистрация прошла успешно.</p>
                        <p>
                            Перейдите <Link to={SIGN_IN_PATH}>по ссылке</Link>,
                            чтобы войти в аккаунт{" "}
                        </p>
                    </Alert>
                )}
                {!isSuccess && (
                    <>
                        <h1 className={styles.title}>Регистрация</h1>
                        <form
                            className={styles.form}
                            onSubmit={submitHandlerWrapper(handleSubmit)}
                            onChange={() => setError(null)}
                        >
                            {error && (
                                <Alert className={styles.alert} variant="error">
                                    {error}
                                </Alert>
                            )}
                            <FieldRow className={styles.row}>
                                <FirstName
                                    register={register}
                                    error={errors.firstName}
                                />
                                <LastName
                                    register={register}
                                    error={errors.lastName}
                                />
                            </FieldRow>
                            <FieldRow className={styles.row}>
                                <Patronymic
                                    register={register}
                                    error={errors.fatherName}
                                />
                                <Email
                                    register={register}
                                    error={errors.email}
                                />
                            </FieldRow>
                            <FieldRow className={styles.row}>
                                <Phone
                                    register={register}
                                    error={errors.phone}
                                />
                                <Birthday
                                    register={register}
                                    error={errors.birthday}
                                    control={control}
                                />
                            </FieldRow>
                            <FieldRow className={styles.row}>
                                <Password
                                    register={register}
                                    error={errors.password}
                                />
                                <PasswordConfirm
                                    register={register}
                                    error={errors.passwordConfirm}
                                />
                            </FieldRow>
                            <Button
                                className={styles.button}
                                variant="dark-blue"
                                type="submit"
                            >
                                Регистрация
                            </Button>
                            <footer className={styles.footer}>
                                <span>Уже есть аккаунт? </span>
                                <Link to={SIGN_IN_PATH}>Вход</Link>
                            </footer>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default SignUpPage;

function FirstName({ register, error }: FieldProps) {
    const LENGTH_LIMIT = 25;

    const firstNameRef = useFocus<HTMLInputElement>();

    const { ref, ...rest } = register("firstName", {
        required: formErrors.required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: formErrors.maxLengthLimit(LENGTH_LIMIT),
        },
    });

    useImperativeHandle(ref, () => firstNameRef.current);

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="firstName">
                Ваше имя
            </Label>
            <Input
                className={styles.input}
                {...rest}
                placeholder="Имя"
                id="firstName"
                type="text"
                ref={firstNameRef}
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function LastName({ register, error }: FieldProps) {
    const LENGTH_LIMIT = 25;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<SignUpState, "lastName"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="lastName">
                Ваша фамилия
            </Label>
            <Input
                className={styles.input}
                placeholder="Фамилия"
                {...register("lastName", fieldOptions)}
                id="lastName"
                type="text"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Patronymic({ register, error }: FieldProps) {
    const LENGTH_LIMIT = 25;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<SignUpState, "fatherName"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="fatherName">
                Ваше отчество
            </Label>
            <Input
                className={styles.input}
                placeholder="Отчество"
                {...register("fatherName", fieldOptions)}
                id="fatherName"
                type="text"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Email({ register, error }: FieldProps) {
    const LENGTH_LIMIT = 25;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<SignUpState, "email"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="email">
                Email
            </Label>
            <Input
                className={styles.input}
                placeholder="Email"
                {...register("email", fieldOptions)}
                id="email"
                type="email"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Phone({ register, error }: FieldProps) {
    const LENGTH_LIMIT = 25;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<SignUpState, "phone"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="phone">
                Телефон
            </Label>
            <Input
                className={styles.input}
                placeholder="Телефон"
                {...register("phone", fieldOptions)}
                id="phone"
                type="number"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Birthday({ control }: FieldProps) {
    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="birthday">
                Дата рождения
            </Label>
            <Controller
                name="birthday"
                control={control}
                render={({ field: { value, onChange, ...field } }) => {
                    return (
                        <DateInput
                            {...field}
                            selected={value}
                            onChange={(date) => onChange(date)}
                            id="birthday"
                            placeholderText="Дата рождения"
                            className={styles.date}
                        />
                    );
                }}
            />
        </FieldGroup>
    );
}

function Password({ register, error }: FieldProps) {
    const LENGTH_LIMIT = 25;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<SignUpState, "password"> = {
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

function PasswordConfirm({ register, error }: FieldProps) {
    const LENGTH_LIMIT = 25;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<SignUpState, "passwordConfirm"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="passwordConfirm">
                Повторите пароль
            </Label>
            <Input
                className={styles.input}
                placeholder="Повторите пароль"
                {...register("passwordConfirm", fieldOptions)}
                id="passwordConfirm"
                type="password"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}
