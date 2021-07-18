import { Validate } from "react-hook-form";

const nameRegEx =
	/^(?=.{2,12}$)(?![_.])(?!.*[_.]{2})[\u4E00-\u9FFFa-zA-Z0-9._]+(?<![_.])$/;

const passwordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/;

const emailRegEX =
	// eslint-disable-next-line
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const required = "此為必填欄位";

export const nameValidator: Validate<string> = (value) =>
	nameRegEx.test(value) ? undefined : "請輸入2~12個字以內的 中英數字。";

export const emailValidator: Validate<string> = (value) =>
	emailRegEX.test(value) ? undefined : "請輸入正確的Email";

export const passwordValidator: Validate<string> = (value) =>
	passwordRegEx.test(value) ? undefined : "密碼請包含8~16碼大小寫英文及數字";

export const minLength = (value: number) => ({
	value,
	message: `請輸入至少${4}個字`,
});

export const maxLength = (value: number) => ({
	value,
	message: `最多輸入${12}個字`,
});
