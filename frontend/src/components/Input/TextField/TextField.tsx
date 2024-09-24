import { ErrorMessage } from '@/components/ErrorMessage';
import styles from './TextField.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

type Props = {
	id: string;
	name: string;
	label?: string;
	type?: string;
	errorMessage?: string;
};

export const TextField = ({
	id,
	name,
	label,
	type = 'text',
	errorMessage,
}: Props): JSX.Element => {
	return (
		<div className={styles.input}>
			{label && <span className={styles.input__label}>{label}</span>}
			<input
				className={clsx(styles.input__field, { [styles.error]: errorMessage })}
				type={type}
				id={id}
				name={name}
			/>
			{errorMessage && <ErrorMessage value={errorMessage} />}
		</div>
	);
};
