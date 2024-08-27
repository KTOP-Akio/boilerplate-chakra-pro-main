'use client';

import Card from '@/components/card/Card';
import LineChart from '@/components/charts/LineChart';
import { lineChartDataMain } from '@/variables/charts';
import { lineChartOptionsMain } from '@/variables/charts';
import { Flex, useColorModeValue, Text, Box, Icon } from '@chakra-ui/react';
import { MdInsights } from 'react-icons/md';

function OverallRevenue() {
  const newOptions = {
    ...lineChartOptionsMain,
    // colors: ['var(--color-500)' ],
  };

  const bg = useColorModeValue('secondaryGray.300', 'secondaryGray.700');
  const textColor = useColorModeValue('#120F43', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  return (
    <Card h="381px" p="24px">
      <Flex align="center" gap="12px">
        <Flex
          h={'56px'}
          w={'56px'}
          justifyContent="center"
          alignItems={'center'}
          rounded="full"
          fontSize="36px"
          color={brandColor}
          bg={bg}
        >
          <Icon as={MdInsights} w="24px" h="24px" />
        </Flex>
        <Box>
          <Text as="h5" fontSize={'sm'} fontWeight="500" color="gray.700">
            Credits usage in the last year
          </Text>
          <Text color={textColor} mt="4px" fontSize="24px" fontWeight={'700'}>
            149,758
          </Text>
        </Box>
      </Flex>

      {/* Charts */}
      <Flex
        w="100%"
        h="100%"
        flex={{ sm: 'wrap', lg: 'nowrap' }}
        overflow={{ '2xl': 'hidden' }}
      >
        <Box w="100%" h="100%">
          <LineChart chartData={lineChartDataMain} chartOptions={newOptions} />
        </Box>
      </Flex>
    </Card>
  );
}

export default OverallRevenue;
