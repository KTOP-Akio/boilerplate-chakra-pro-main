import Card from '@/components/card/Card';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  PaginationState,
  createColumnHelper,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import React from 'react';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

type RowObj = {
  checked?: string;
  email: string;
  provider: string;
  created: string;
  lastsigned: string;
  uuid: string;
  menu?: string;
};

function CheckTable(props: { tableData: any }) {
  const { tableData } = props;
  const textColor = useColorModeValue('#120F43', 'white');
  const textColorSecondary = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.200');
  const grayLight = useColorModeValue('gray.200', 'white');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  let defaultData = tableData;
  const [globalFilter, setGlobalFilter] = React.useState('');
  // const createPages = (count: number) => {
  //   let arrPageCount = [];

  //   for (let i = 1; i <= count; i++) {
  //     arrPageCount.push(i);
  //   }

  //   return arrPageCount;
  // };
  const columns = [
    columnHelper.accessor('checked', {
      id: 'checked',
      header: () => (
        <Box w="max-content">
          <Checkbox me="10px" />
        </Box>
      ),
      cell: (info: any) => (
        <Flex w="max-content" alignItems="center">
          <Checkbox
            defaultChecked={info.getValue()[1]}
            colorScheme="brand"
            me="10px"
          />
        </Flex>
      ),
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.500"
        >
          EMAIL ADDRESS
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('created', {
      id: 'created',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.500"
        >
          CREATED
        </Text>
      ),
      cell: (info: any) => (
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('provider', {
      id: 'provider',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.500"
        >
          PROVIDER
        </Text>
      ),
      cell: (info: any) => (
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('lastsigned', {
      id: 'lastsigned',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.500"
        >
          LAST SIGN IN
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('uuid', {
      id: 'uuid',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.500"
        >
          USER UID
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {info.getValue()}
        </Text>
      ),
    }),
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData]);
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 11,
    });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <Card w="100%" h="100%" overflow={'auto'} p="0px">
      <Box mt="20px" overflowX={{ base: 'scroll', xl: 'hidden' }}>
        <Table w="100%">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr
                key={headerGroup.id}
                borderBottom="1px solid"
                borderColor="gray.200"
                p="20px"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      cursor="pointer"
                      borderBottom="1px solid"
                      borderColor={borderColor}
                      pb="14px"
                      ps="24px"
                      pe="16px"
                      textAlign={'start'}
                    >
                      <Flex
                        alignItems={'center'}
                        justifyContent="space-between"
                        fontSize="12px"
                        color={textColorSecondary}

                        // gray 1
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table
              .getRowModel()
              .rows.slice(0, 7)
              .map((row) => {
                return (
                  <Tr key={row.id} px="24px">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td
                          key={cell.id}
                          w="max-content"
                          borderBottom="1px solid"
                          borderColor={borderColor}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
        {/* pagination */}
        <Flex
          mt="8px"
          w="100%"
          h="80px"
          alignItems={'center'}
          justifyContent="space-between"
          px="24px"
        >
          {/* left side */}
          <Flex alignItems={'center'} gap="12px">
            <Text color={textColorSecondary} fontWeight="500" fontSize="sm">
              Showing 6 rows per page
            </Text>
          </Flex>
          {/* right side */}
          <Flex alignItems="center" gap="8px">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              variant="transparent"
              display={'flex'}
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              bg="transparent"
              p="8px"
              fontSize={'18px'}
              color="gray.700"
            >
              <MdChevronLeft />
            </Button>

            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              variant="transparent"
              display={'flex'}
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              bg="transparent"
              p="8px"
              fontSize={'18px'}
              color="gray.700"
            >
              <MdChevronRight />
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Card>
  );
}

export default CheckTable;
const columnHelper = createColumnHelper<RowObj>();
