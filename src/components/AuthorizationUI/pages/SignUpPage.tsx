import React, { useState } from "react";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, RouteComponentProps } from "react-router-dom";

import FieldTitle from "../../Feature/FieldTitle/FieldTitle";
import TextFields from "../../General/Fields/TextFields";
import FieldContainer from "../../Feature/FieldContainer/FieldContainer";
import FieldErrorMessage from "../../Feature/FieldErrorMessage/FieldErrorMessage";
import Button from "../../General/Button/Button";
import {
	emailValidator,
	maxLength,
	minLength,
	nameValidator,
	passwordValidator,
	required,
} from "../../../helper/validator";
import useManager from "../../../hooks/stores/useManager/useManager";

const SignUpPage: React.FC<RouteComponentProps> = ({ history }) => {
	const [isFocus, setIsFocus] = useState<boolean>(false);

	const { postToRegister, getCurrentUser } = useManager.useContainer();

	const {
		register,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm<RegisterForm>({
		mode: "all",
		defaultValues: { email: "", password: "" },
	});

	const onSubmit: SubmitHandler<RegisterForm> = async (formValue) => {
		await postToRegister.noisy(formValue);
		await getCurrentUser.noisy();
		history.push("/");
		reset();
	};

	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
			className={classNames("w-96", "shadow-md", "rounded-2xl", "p-6")}
		>
			<React.Fragment>
				<div className={classNames("mb-4")}>
					<FieldTitle>暱稱</FieldTitle>
					<FieldContainer error={errors["name"]}>
						<TextFields
							as="text"
							register={register("name", {
								required,
								minLength: minLength(3),
								maxLength: maxLength(12),
								validate: nameValidator,
							})}
						/>
					</FieldContainer>
					<FieldErrorMessage errors={errors} name="name" />
				</div>
				<div className={classNames("mb-4")}>
					<FieldTitle>Email</FieldTitle>
					<FieldContainer error={errors["email"]}>
						<TextFields
							as="text"
							register={register("email", {
								required,
								validate: emailValidator,
							})}
						/>
					</FieldContainer>
					<FieldErrorMessage errors={errors} name="email" />
				</div>
				<div className={classNames("mb-12")}>
					<FieldTitle>Password</FieldTitle>
					<FieldContainer error={errors["password"]}>
						<TextFields
							type={isFocus ? "password" : "text"}
							onFocus={() => setIsFocus(true)}
							autoComplete="new-password"
							as="text"
							register={register("password", {
								required,
								validate: passwordValidator,
							})}
						/>
					</FieldContainer>
					<FieldErrorMessage errors={errors} name="password" />
				</div>
				<Button
					type="submit"
					className={classNames("bg-pink-400", "text-white")}
				>
					註冊
				</Button>
				<p className={classNames("text-xs", "mt-2", "text-center")}>
					已經有帳號了嗎？趕快
					<Link className={classNames("text-pink-400")} to="/sign_in">
						登入
					</Link>
					吧！
				</p>
			</React.Fragment>
		</form>
	);
};

export default SignUpPage;
