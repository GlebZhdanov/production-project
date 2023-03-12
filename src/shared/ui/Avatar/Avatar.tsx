import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string,
  src?: string,
  size?: number,
  alt?: string,
}

export const Avatar = ({
  className, src, size, alt,
}: AvatarProps) => {
  const mods: Mods = {};

  const styles = useMemo(() => ({
    width: size || 100,
    height: size || 100,
  }), [size]);

  const { t } = useTranslation();
  return (
    <img
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, mods, [className])}
    />
  );
};
