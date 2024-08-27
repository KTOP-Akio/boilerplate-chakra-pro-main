import { IoIosStar } from 'react-icons/io';
import { Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';

export default function Ratings(props: {
  dark?: boolean;
  stats: string;
  stars?: 1 | 2 | 3 | 4 | 5;
  rating: string | number;
}) {
  const { rating, stats, stars  } = props;
  const gray = useColorModeValue('whiteAlpha.300', 'gray.200');
  const textColor = useColorModeValue('navy.900', 'white');
  return (
    <Flex direction="column" align="center" justify="center">
      <Text color={gray} mt={{base:"12px", lg:"40px"}} mb="10px" justifySelf={'center'} fontWeight='500' 
      >
        {stats}
      </Text>
      {stars === 1 ? (
        <Flex align="center" justify={{ base: 'center', md: 'flex-start' }}>
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" color={gray} />
          <Icon as={IoIosStar} h="22px" w="22px" color={gray} />
          <Icon as={IoIosStar} h="22px" w="22px" color={gray} />
          <Icon as={IoIosStar} h="22px" w="22px" me="8px" color={gray} />
          <Text fontWeight="bold" my="2px" fontSize="lg" color={textColor}>
            {rating}
          </Text>
        </Flex>
      ) : stars === 2 ? (
        <Flex align="center" justify={{ base: 'center', md: 'flex-start' }}>
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" color={gray} />
          <Icon as={IoIosStar} h="22px" w="22px" color={gray} />
          <Icon as={IoIosStar} h="22px" w="22px" me="8px" color={gray} />
          <Text fontWeight="bold" my="2px" fontSize="lg" color={textColor}>
            {rating}
          </Text>
        </Flex>
      ) : stars === 3 ? (
        <Flex align="center" justify={{ base: 'center', md: 'flex-start' }}>
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" color={gray} />
          <Icon as={IoIosStar} h="22px" w="22px" me="8px" color={gray} />
          <Text fontWeight="bold" my="2px" fontSize="lg" color={textColor}>
            {rating}
          </Text>
        </Flex>
      ) : stars === 4 ? (
        <Flex align="center" justify={{ base: 'center', md: 'flex-start' }}>
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" me="8px" color={gray} />
          <Text fontWeight="bold" my="2px" fontSize="lg" color={textColor}>
            {rating}
          </Text>
        </Flex>
      ) : stars === 5 ? (
        <Flex align="center" justify={{ base: 'center', md: 'flex-start' }}>
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" me="8px" color="#F6AD55" />
          <Text fontWeight="bold" my="2px" fontSize="lg" color={textColor}>
            {rating}
          </Text>
        </Flex>
      ) : (
        <Flex align="center" justify={{ base: 'center', md: 'flex-start' }}>
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" color="#F6AD55" />
          <Icon as={IoIosStar} h="22px" w="22px" me="8px" color="#F6AD55" />
          <Text fontWeight="bold" my="2px" fontSize="lg" color={textColor}>
            {rating}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
