import Card from '@/components/card/Card';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

const Statistics = (props: {
  icon?: JSX.Element;
  title: string;
  value: number | string;
  endContent?: JSX.Element;
}) => {
  const { icon, title, value, endContent } = props;
  const textColorSecondary = useColorModeValue('gray.700', 'white');
  const textColor = useColorModeValue('#120F43', 'white');
  return (
    <Card
      w="100%"
      justifyContent="space-between"
      borderRadius="14px"
      bg="white"
      py="30px"
    >
      <Flex gap="12px" alignItems={'center'}>
        {icon}
        <Box>
          <Text
            as="h5"
            fontSize="sm"
            fontWeight={'500'}
            color={textColorSecondary}
          >
            {title}
          </Text>
          <Text
            color={textColor}
            fontWeight="700"
            mt="4px"
            fontSize="24px"
            lineHeight={'24px'}
          >
            {value}
          </Text>
        </Box>
      </Flex>

      {endContent}
    </Card>
  );
};

export default Statistics;
