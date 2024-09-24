'use client';

import { Input } from '@/components/Input';
import styles from './Register.module.scss';
import { BrandSection } from '@/components/BrandSection';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { registerUser } from './actions';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';

const initialState = {
	message: '',
	errors: undefined,
	fieldValues: {
		email: '',
		firstname: '',
		lastname: '',
		password: '',
		confirmPassword: '',
	},
};

const Register = () => {
	const [state, formAction] = useFormState(registerUser, initialState);
	const { pending } = useFormStatus();
	const formRef = useRef<HTMLFormElement>(null);

	console.log(state);

	useEffect(() => {
		if (state.message === 'success') {
			formRef?.current?.reset();
		}
	}, [state]);

	return (
		<div className={styles.grid}>
			<BrandSection />
			<form className={styles.grid__form} action={formAction} ref={formRef}>
				<div className={styles.grid__signin}>
					<h1>Sign In</h1>
				</div>
				<Input.TextField
					id="register-email"
					name="register-email"
					label="Email"
					errorMessage={state.errors?.email}
				/>
				<Input.TextField
					id="register-firstname"
					name="register-firstname"
					label="First name"
					errorMessage={state.errors?.firstname}
				/>
				<Input.TextField
					id="register-lastname"
					name="register-lastname"
					label="Last name"
					errorMessage={state.errors?.lastname}
				/>
				<Input.TextField
					type="password"
					id="register-password"
					name="register-password"
					label="Password"
					errorMessage={state.errors?.password}
				/>
				<Input.TextField
					type="password"
					id="register-confirmPassword"
					name="register-confirmPassword"
					label="Password Again"
					errorMessage={state.errors?.confirmPassword}
				/>
				<Button.Primary type="submit" disabled={pending}>
					Login
				</Button.Primary>
				<p className={styles.register__link}>
					You already have an accounct? Sign in <Link href="/login">here</Link>!
				</p>
			</form>
		</div>
	);
};

export default Register;
