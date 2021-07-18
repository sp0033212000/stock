import React, { useState } from "react";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import useManager from "../../../hooks/stores/useManager/useManager";

import {
	emailValidator,
	passwordValidator,
	required,
} from "../../../helper/validator";

import FieldTitle from "../../Feature/FieldTitle/FieldTitle";
import TextFields from "../../General/Fields/TextFields";
import FieldContainer from "../../Feature/FieldContainer/FieldContainer";
import FieldErrorMessage from "../../Feature/FieldErrorMessage/FieldErrorMessage";
import Button from "../../General/Button/Button";

const SignInPage: React.FC = () => {
	const [isFocus, setIsFocus] = useState<boolean>(false);

	const { postToSignInUser } = useManager.useContainer();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Pick<RegisterForm, "email" | "password">>({
		mode: "all",
		defaultValues: { email: "", password: "" },
	});

	const onSubmit: SubmitHandler<Pick<RegisterForm, "email" | "password">> =
		async (formValue) => {
			await postToSignInUser.noisy(formValue);
		};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={classNames("w-96", "shadow-md", "rounded-2xl", "p-6")}
		>
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
			<Button type="submit" className={classNames("bg-pink-400", "text-white")}>
				登入
			</Button>
			<p className={classNames("text-xs", "mt-2", "text-center")}>
				沒有帳號嗎？趕快去
				<Link className={classNames("text-pink-400")} to="/sign_up">
					註冊
				</Link>
				吧！
			</p>
		</form>
	);
};

export default SignInPage;
