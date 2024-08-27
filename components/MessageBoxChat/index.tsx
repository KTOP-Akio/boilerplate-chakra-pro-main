import Card from '@/components/card/Card';
import { useColorModeValue } from '@chakra-ui/system';
import ReactMarkdown from 'react-markdown';

export default function MessageBox(props: { output: string }) {
  const { output } = props;
  const bgColor = useColorModeValue('white', 'whiteAlpha.100');
  const textColor = useColorModeValue('#120F43', 'white');
  const borderWidth = useColorModeValue('1px', '0px');
  return (
    <Card
      display={output ? 'flex' : 'none'}
      p="22px"
      maxH="max-content"
      color={textColor}
      bg={bgColor}
      backdropBlur="xl"
      borderWidth={borderWidth}
      fontSize={{ base: 'sm', md: '16px' }}
      lineHeight={{ base: '24px', md: '26px' }}
      fontWeight={'500'}
    >
      <ReactMarkdown className="font-medium">
        {output ? output : ''}
      </ReactMarkdown>
    </Card>
  );
}
