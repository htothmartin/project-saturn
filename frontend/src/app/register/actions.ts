import { z, type ZodError } from 'zod';

const lowerCaseRegex = /[a-z]+/;
const upperCaseRegex = /[A-Z]+/;
const numberRegex = /[0-9]+/;
const specialRegex = /[!@#$%^&*(),.?":{}|<>]/;

const schema = z
	.object({
		email: z.string().email('Please enter a valid email address!'),
		firstname: z.string().min(1, 'Please enter your firstname.'),
		lastname: z.string().min(1, 'Please enter your lastname.'),
		password: z
			.string()
			.min(1, 'Please enter a password!')
			.min(8, 'Password should minimum 8 characther!')
			.refine((value) => lowerCaseRegex.test(value), {
				message: 'The password must contain atleast one lowercase character.',
			})
			.refine((value) => upperCaseRegex.test(value), {
				message: 'The password must contain atleast one uppercase character.',
			})
			.refine((value) => numberRegex.test(value), {
				message: 'The password must contain atleast one number.',
			})
			.refine((value) => specialRegex.test(value), {
				message: 'The password must contain atleast one special character.',
			}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'The passwords must match.',
		path: ['confirmPassword'],
	});

type Fields = {
	email: string;
	firstname: string;
	lastname: string;
	password: string;
	confirmPassword: string;
};

type FormState = {
	message: string;
	errors: Record<keyof Fields, string> | undefined;
	fieldValues: Fields;
};

export const registerUser = async (
	prevState: FormState,
	formData: FormData,
): Promise<FormState> => {
	const email = formData.get('register-email') as string;
	const firstname = formData.get('register-firstname') as string;
	const lastname = formData.get('register-lastname') as string;
	const password = formData.get('register-password') as string;
	const confirmPassword = formData.get('register-confirmPassword') as string;

	try {
		schema.parse({
			email,
			firstname,
			lastname,
			password,
			confirmPassword,
		});

		return {
			message: 'success',
			errors: undefined,
			fieldValues: {
				email: '',
				firstname: '',
				lastname: '',
				password: '',
				confirmPassword: '',
			},
		};
	} catch (error) {
		const zodError = error as ZodError;
		const errorMap = zodError.flatten().fieldErrors;

		return {
			message: 'error',
			errors: {
				email: errorMap.email?.[0] ?? '',
				firstname: errorMap.firstname?.[0] ?? '',
				lastname: errorMap.lastname?.[0] ?? '',
				password: errorMap.password?.[0] ?? '',
				confirmPassword: errorMap.confirmPassword?.[0] ?? '',
			},
			fieldValues: {
				email: email,
				firstname: firstname,
				lastname: lastname,
				password: password,
				confirmPassword: confirmPassword,
			},
		};
	}
};
