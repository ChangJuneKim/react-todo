import styles from './Button.module.css';

const Button = ({ children, type, onClick, disabled }) => {
  return (
    <button
      //
      className={styles.button}
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled || false}
    >
      {children}
    </button>
  );
};
export default Button;
