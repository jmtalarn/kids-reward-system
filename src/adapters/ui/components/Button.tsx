import { useEffect, useState, ComponentProps, forwardRef } from 'react';
import styles from './Button.module.css';

const RippleButton = forwardRef<HTMLButtonElement, ComponentProps<'button'>>(({ children, className, onClick, title, ...rest }, ref) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  const classNames = [className, styles['ripple-button']].filter(Boolean).join(" ");

  return (
    <button
      ref={ref}
      title={title}
      className={classNames}
      {...rest}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick && onClick(e);
      }}
    >
      {isRippling ? (
        <span
          className={styles.ripple}
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : (
        ''
      )}
      <span className={styles.content}>{children}</span>
    </button>
  );
});

export default RippleButton;
