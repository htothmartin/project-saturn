import { Circles, SaturnLogo } from '@/assets';
import styles from './BrandSection.module.scss';

export const BrandSection = (): JSX.Element => {
	return (
		<div className={styles.logo}>
			<SaturnLogo size={300} />
			<p>Project Saturn</p>
			<p className={styles.motto}>For the best projects.</p>
			<div className={styles.circles}>
				<Circles size={1024} />
			</div>
		</div>
	);
};
