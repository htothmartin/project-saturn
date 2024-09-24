import styles from './Primary.module.scss';

type Props = {
  children: string;
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
};

export const Primary = ({ children, type, disabled }: Props): JSX.Element => {
  console.log(disabled);
  return (
    <button type={type} className={styles.primary} aria-disabled={disabled}>
      {children}
    </button>
  );
};
