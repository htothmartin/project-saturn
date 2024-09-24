import styles from './ErrorMessage.module.scss';

type Props = {
	value: string;
};

export const ErrorMessage = ({ value }: Props): JSX.Element => {
	return (
		<div className={styles.error}>
			<div className={styles.message}>{value}</div>
		</div>
	);
};
