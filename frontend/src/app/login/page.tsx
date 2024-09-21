import { Input } from '@/components/Input';
import styles from './Login.module.scss';
import { BrandSection } from '@/components/BrandSection';

const Login = () => {
	return (
		<div className={styles.grid}>
			<BrandSection />
			<div className={styles.grid__form}>
				<Input.TextField id="login-email" label="Email" />
				<Input.TextField type="password" id="login-password" label="Password" />
			</div>
		</div>
	);
};

export default Login;
