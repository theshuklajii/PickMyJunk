import '../../styles/global.css';

function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button className={`btn ${variant === 'secondary' ? 'btn-secondary' : ''}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;