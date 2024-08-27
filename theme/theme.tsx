import { CardComponent } from './additions/card/card';
import { badgeStyles } from './components/badge';
import { buttonStyles } from './components/button';
import { inputStyles } from './components/input';
import { linkStyles } from './components/link';
import { progressStyles } from './components/progress';
import { switchStyles } from './components/switch';
import { textareaStyles } from './components/textarea';
import { breakpoints } from './foundations/breakpoints';
import { globalStyles } from './styles';
import { extendTheme, HTMLChakraProps, ThemingProps } from '@chakra-ui/react';

export default extendTheme(
  { breakpoints }, // breakpoints
  globalStyles,
  badgeStyles, // badge styles
  buttonStyles, // button styles
  linkStyles, // link styles
  progressStyles, // progress styles
  inputStyles, // input styles
  textareaStyles, // textarea styles
  switchStyles, // switch styles
  CardComponent, // card component
);

export interface CustomCardProps extends HTMLChakraProps<'div'>, ThemingProps {}
