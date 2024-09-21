import styles from './TextField.module.scss';

type Props = {
	id: string;
	label?: string;
	type?: string;
};

export const TextField = ({ id, label, type = 'text' }: Props): JSX.Element => {
	return (
		<div className={styles.input}>
			{label && <span className={styles.input__label}>{label}</span>}
			<input className={styles.input__field} type={type} id={id} />
		</div>
	);
};
