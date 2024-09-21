import { Input } from '@/components/Input';
import styles from './Register.module.scss';
import { BrandSection } from '@/components/BrandSection';

const Register = () => {
	return (
		<div className={styles.grid}>
			<BrandSection />
			<div className={styles.grid__form}>
				<Input.TextField id="register-email" label="Email" />
				<Input.TextField
					type="password"
					id="register-password"
					label="Password"
				/>
				<Input.TextField
					type="password"
					id="register-repassword"
					label="Password Again"
				/>
			</div>
		</div>
	);
};

export default Register;
