import styles from './Input.module.css';

const Input = ({ id, type, label, placeholder, register, errors, message }) => {
  return (
    <>
      <div className={styles.label}>
        <label htmlFor={id}>{label}</label>
        {errors[id] && <span>{message}</span>}
      </div>
      <input type={type} id={id} placeholder={placeholder} {...register(id)} />
    </>
  );
};
export default Input;
