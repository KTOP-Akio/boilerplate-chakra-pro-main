'use client';

import { Image } from './Image';
import { chakra, useColorMode } from '@chakra-ui/system';
import { ComponentProps } from 'react';

type AvatarImageProps = Partial<
  ComponentProps<typeof Image> & {
    showBorder?: boolean;
  }
>;

export function NextAvatar({
  src,
  showBorder,
  alt = '',
  style,
  ...props
}: AvatarImageProps) {
  const { colorMode } = useColorMode();

  return (
    <Image
      {...props}
      {...(showBorder
        ? {
            border: '2px',
            borderColor: colorMode === 'dark' ? '#120F43' : 'white',
          }
        : {})}
      alt={alt}
      objectFit={'fill'}
      src={src}
      style={{ ...style, borderRadius: '50%' }}
    />
  );
}

export const ChakraNextAvatar = chakra(NextAvatar, {
  shouldForwardProp: (prop) =>
    ['width', 'height', 'src', 'alt', 'layout'].includes(prop),
});
