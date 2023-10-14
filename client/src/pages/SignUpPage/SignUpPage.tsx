import { FC, useImperativeHandle } from "react";

import {
    Control,
    Controller,
    FieldError as FieldErrorType,
    RegisterOptions,
    SubmitHandler,
    UseFormRegister,
    useForm,
} from "react-hook-form";

import { Button } from "components/ui/Button";
import { DateInput } from "components/ui/DateInput";
import { FieldError } from "components/ui/FieldError";
import { FieldGroup } from "components/ui/FieldGroup";
import { FieldRow } from "components/ui/FieldRow";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";

import useFocus from "hooks/shared/useFocus";

import { formErrors } from "constants/formErrors";

import styles from "./signUpPage.module.scss";

export interface SignUpState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    birthdate: Date;
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
        reset,
        control,
        formState: { errors },
    } = useForm<SignUpState>();

    const handleSubmit: SubmitHandler<SignUpState> = (data: SignUpState) => {
        console.log(data);
    };

    return (
        <div className={styles.page}>
            <form
                className={styles.form}
                onSubmit={submitHandlerWrapper(handleSubmit)}
            >
                <FieldRow>
                    <FirstName register={register} error={errors.firstName} />
                    <LastName register={register} error={errors.lastName} />
                </FieldRow>
                <FieldRow>
                    <Email register={register} error={errors.email} />
                    <Phone register={register} error={errors.phone} />
                </FieldRow>
                <Birthdate
                    register={register}
                    error={errors.birthdate}
                    control={control}
                />
                <FieldRow>
                    <Password register={register} error={errors.password} />
                    <PasswordConfirm
                        register={register}
                        error={errors.passwordConfirm}
                    />
                </FieldRow>
            </form>
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

function Birthdate({ control }: FieldProps) {
    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="birthdate">
                Дата рождения
            </Label>
            <Controller
                name="birthdate"
                control={control}
                render={({ field: { value, onChange, ...field } }) => {
                    return (
                        <DateInput
                            {...field}
                            selected={value}
                            onChange={(date) => onChange(date)}
                            id="birthdate"
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
                type="number"
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
                Пароль
            </Label>
            <Input
                className={styles.input}
                placeholder="Пароль"
                {...register("passwordConfirm", fieldOptions)}
                id="passwordConfirm"
                type="number"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}
