import Image from 'next/image';
import styles from './Blob.module.css';

interface BlobProps {
  src: string;
  width: number;
  height: number;
  className?: string;
  animate?: boolean;
  delay?: number;
  opacity?: number;
  sizes?: string;
}

export function Blob({ src, width, height, className = '', animate = false, delay = 0, opacity = 1, sizes }: BlobProps) {
  return (
    <div 
      className={`${styles.blobWrapper} ${className}`}
      style={{ opacity, animationDelay: `${delay}ms` }}
      data-animate={animate}
      aria-hidden="true"
    >
      <Image 
        src={src} 
        alt="" 
        width={width} 
        height={height} 
        sizes={sizes}
        className={styles.blobImg}
      />
    </div>
  );
}
