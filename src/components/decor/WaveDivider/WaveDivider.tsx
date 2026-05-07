import Image from 'next/image';
import styles from './WaveDivider.module.css';

interface WaveDividerProps {
  src: string;
  flip?: boolean;
  opacity?: number;
  position?: 'top' | 'bottom';
}

export function WaveDivider({ src, flip = false, opacity = 1, position = 'bottom' }: WaveDividerProps) {
  return (
    <div className={styles.waveWrapper} data-position={position} data-flip={flip} style={{ opacity }} aria-hidden="true">
      <Image src={src} alt="" fill sizes="100vw" className={styles.waveImg} />
    </div>
  );
}
