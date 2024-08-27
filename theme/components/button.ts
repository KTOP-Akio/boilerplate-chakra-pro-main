import { mode } from '@chakra-ui/theme-tools';
export const buttonStyles = {
  components: {
    Button: {
      baseStyle: {
        borderRadius: '16px',
        boxShadow: '45px 76px 113px 7px rgba(112, 144, 176, 0.08)',
        transition: '.25s all ease',
        boxSizing: 'border-box',
        _focus: {
          boxShadow: 'none',
        },
        _active: {
          boxShadow: 'none',
        },
      },
      variants: {
        transparent: (props: any) => ({
          bg: mode('transparent', 'transparent')(props),
          color: mode('#120F43', 'white')(props),
          boxShadow: 'none',
          _focus: {
            bg: mode('none', 'whiteAlpha.200')(props),
          },
          _active: {
            bg: mode('gray.200', 'whiteAlpha.200')(props),
          },
          _hover: {
            boxShadow: 'unset',
            bg: mode('gray.100', 'whiteAlpha.100')(props),
          },
        }),
        a: (props: any) => ({
          bg: mode('transparent', 'transparent')(props),
          color: mode('transparent', 'transparent')(props),
          padding: 0,
          _focus: {
            bg: mode('transparent', 'transparent')(props),
          },
          _active: {
            bg: mode('transparent', 'transparent')(props),
          },
          _hover: {
            boxShadow: 'unset',
            textDecoration: 'underline',
            bg: mode('transparent', 'transparent')(props),
          },
        }),
        primary: (props: any) => ({ 
          bg:"linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important",
          color: 'white',
          boxShadow: 'none',
          _focus: {
            bg: mode(
              'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
            )(props),
          },
          _active: {
            bg: mode(
              'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
            )(props),
          },
          _hover: {
            boxShadow: '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
            bg: mode(
              'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
            )(props),
          },
        }),
        green: (props: any) => ({ 
          bg:"linear-gradient(180deg, #38A169 0%, #25855A 100%) !important",
          color: 'white',
          boxShadow: 'none',
          _focus: {
            bg: mode(
              'linear-gradient(180deg, #38A169 0%, #25855A 100%)',
              'linear-gradient(180deg, #38A169 0%, #25855A 100%)',
            )(props),
          },
          _active: {
            bg: mode(
              'linear-gradient(180deg, #38A169 0%, #25855A 100%)',
              'linear-gradient(180deg, #38A169 0%, #25855A 100%)',
            )(props),
          },
          _hover: {
            boxShadow: '0px 18px 23.143px -8.571px rgba(56, 161, 105, 0.48) !important',
            bg: mode(
              'linear-gradient(180deg, #38A169 0%, #25855A 100%)',
              'linear-gradient(180deg, #38A169 0%, #25855A 100%)',
            )(props),
          },
        }),
        red: (props: any) => ({
          bg: mode('red.50', 'whiteAlpha.100')(props),
          color: mode('red.600', 'white')(props),
          boxShadow: 'none',
          _focus: {
            bg: mode('red.50', 'whiteAlpha.100')(props),
          },
          _active: {
            bg: mode('red.50', 'whiteAlpha.100')(props),
          },
          _hover: {
            bg: mode('red.100', 'whiteAlpha.200')(props),
          },
        }),
        chakraLinear: (props: any) => ({
          bg: mode(
            'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
            'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
          )(props),
          color: 'white',
          boxShadow: 'none',
          _focus: {
            bg: mode(
              'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
              'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
            )(props),
          },
          _active: {
            bg: mode(
              'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
              'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
            )(props),
          },
          _hover: {
            boxShadow:
              '0px 21px 27px -10px rgba(67, 200, 192, 0.47) !important',
            bg: mode(
              'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
              'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
            )(props),
          },
        }),
        api: (props: any) => ({
          bg: mode('#120F43', 'whiteAlpha.200')(props),
          color: mode('white', 'white')(props),
          _focus: {
            bg: mode('#120F43', 'whiteAlpha.200')(props),
          },
          _active: {
            bg: mode('#120F43', 'whiteAlpha.400')(props),
          },
          _hover: {
            bg: mode('navy.800', 'whiteAlpha.300')(props),
            boxShadow: 'unset',
          },
        }),
        brand: (props: any) => ({
          bg: mode('brand.500', 'brand.400')(props),
          color: 'white',
          _focus: {
            bg: mode('brand.500', 'brand.400')(props),
          },
          _active: {
            bg: mode('brand.500', 'brand.400')(props),
          },
          _hover: {
            bg: mode('brand.600', 'brand.400')(props),
            boxShadow: '0px 21px 27px -10px rgba(96, 60, 255, 0.48)',
          },
        }),
        darkBrand: (props: any) => ({
          bg: mode('brand.900', 'brand.400')(props),
          color: 'white',
          _focus: {
            bg: mode('brand.900', 'brand.400')(props),
          },
          _active: {
            bg: mode('brand.900', 'brand.400')(props),
          },
          _hover: {
            bg: mode('brand.800', 'brand.400')(props),
          },
        }),
        lightBrand: (props: any) => ({
          bg: mode('#F2EFFF', 'whiteAlpha.100')(props),
          color: mode('brand.500', 'white')(props),
          _focus: {
            bg: mode('#F2EFFF', 'whiteAlpha.100')(props),
          },
          _active: {
            bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
          },
          _hover: {
            bg: mode('secondaryGray.400', 'whiteAlpha.200')(props),
          },
        }),
        light: (props: any) => ({
          bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
          color: mode('#120F43', 'white')(props),
          _focus: {
            bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
          },
          _active: {
            bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
          },
          _hover: {
            bg: mode('secondaryGray.400', 'whiteAlpha.200')(props),
          },
        }),
        action: (props: any) => ({
          fontWeight: '500',
          borderRadius: '50px',
          bg: mode('secondaryGray.300', 'brand.400')(props),
          color: mode('brand.500', 'white')(props),
          _focus: {
            bg: mode('secondaryGray.300', 'brand.400')(props),
          },
          _active: {
            bg: mode('secondaryGray.300', 'brand.400')(props),
          },
          _hover: {
            bg: mode('gray.200', 'brand.400')(props),
          },
        }),
        setup: (props: any) => ({
          fontWeight: '600',
          borderRadius: '50px',
          bg: mode('transparent', 'brand.400')(props),
          border: mode('1px solid', '0px solid')(props),
          borderColor: mode('secondaryGray.400', 'transparent')(props),
          color: mode('#120F43', 'white')(props),
          _focus: {
            bg: mode('transparent', 'brand.400')(props),
          },
          _active: { bg: mode('transparent', 'brand.400')(props) },
          _hover: {
            bg: mode('gray.200', 'brand.400')(props),
          },
        }),
         outline: (props: any) => ({
          fontWeight: '600',
          borderRadius: '50px',
          bg: mode('transparent', 'brand.400')(props),
          border: mode('1px solid', '0px solid')(props),
          borderColor: mode('white', 'transparent')(props),
          color: "white" ,
          _focus: {
            bg: mode('whiteAlpha.400', 'whiteAlpha.400')(props),
          },
          _active: { bg: mode('whiteAlpha.400', 'whiteAlpha.400')(props) },
          _hover: {
            bg: mode('whiteAlpha.300', 'whiteAlpha.300')(props),
          },
        }),
        reset: (props: any) => ({
          fontWeight: '500',    
          bg:"#FFF5F5 !important",
          color:"red.500",
          borderRadius:"45px",
          _hover:{bg: '#FEEFEE !important'}, 
          _active:{ bg: '#FFF5F5 !important'},
          _focus:{bg: '#FEEFEE !important' },   
        }),
        secondary: (props:any) => ({
          bg: "#ffffff33 !important",
          color: "white",
          _focus: {
            bg: mode("#ffffff33", "#ffffff33")(props),
          },
          _active: {
            bg: mode("whiteAlpha.400", "whiteAlpha.400")(props),
          },
          _hover: {
            bg: mode("#ffffff4d", "#ffffff4d")(props),
          },
        }),
        black: (props:any) => ({
          bg:"navy.700",
          color: mode("white", "white")(props),
          _focus: {
            bg: mode("navy.700", "navy.700")(props),
          },
          _active: {
            bg: mode("navy.700", "navy.700")(props),
          },
          _hover: {
            bg: mode("navy.700", "navy.700")(props),
            boxShadow: "0px 18px 23px -8.57px rgba(10, 8, 38, 0.40) !important",
          },
        }),
        checkout: (props:any) => ({
          bg:"#120F43 !important",
          color: mode("white", "white")(props),
          _focus: {
            bg: mode("#120F43 !important", "#120F43 !important")(props),
          },
          _active: {
            bg: mode("#120F43 !important", "#120F43 !important")(props),
          },
          _hover: {
            bg: mode("#120F43 !important", "#120F43 !important")(props),
            boxShadow: "0px 18px 23px -8.57px rgba(10, 8, 38, 0.40) !important",
          },
        }),
        checkoutDark: (props:any) => ({
          bg:"#FFFFFF33 !important",
          color: mode("white", "white")(props),
          _focus: {
            bg: mode("#FFFFFF33 !important", "#FFFFFF33 !important")(props),
          },
          _active: {
            bg: mode("#FFFFFF33 !important", "#FFFFFF33 !important")(props),
          },
          _hover: {
            bg: mode("#FFFFFF33 !important", "#FFFFFF33 !important")(props),
            boxShadow: "0px 18px 23px -8.57px rgba(10, 8, 38, 0.40) !important",
          },
        }),
      },
    },
    MenuButton: {
      baseStyle: {
        borderRadius: '16px',
        transition: '.25s all ease',
        boxSizing: 'border-box',
        _focus: {
          boxShadow: 'none',
        },
        _active: {
          boxShadow: 'none',
        },
      },
      variants: {
        transparent: (props: any) => ({
          bg: mode('transparent', 'transparent')(props),
          color: mode('#120F43', 'white')(props),
          boxShadow: 'none',
          _focus: {
            bg: mode('gray.300', 'whiteAlpha.200')(props),
          },
          _active: {
            bg: mode('gray.300', 'whiteAlpha.200')(props),
          },
          _hover: {
            boxShadow: 'unset',
            bg: mode('gray.200', 'whiteAlpha.100')(props),
          },
        }),
        primary: (props: any) => ({
          bg: mode(
            'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
            'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
          )(props),
          color: 'white',
          boxShadow: 'none',
          _focus: {
            bg: mode(
              'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
            )(props),
          },
          _active: {
            bg: mode(
              'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
            )(props),
          },
          _hover: {
            boxShadow: '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
            bg: mode(
              'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
              'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
            )(props),
            _disabled: {
              bg: mode(
                'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
                'linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              )(props),
            },
          },
        }),
        chakraLinear: (props: any) => ({
          bg: mode(
            'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
            'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
          )(props),
          color: 'white',
          boxShadow: 'none',
          _focus: {
            bg: mode(
              'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
              'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
            )(props),
          },
          _active: {
            bg: mode(
              'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
              'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
            )(props),
          },
          _hover: {
            boxShadow:
              '0px 21px 27px -10px rgba(67, 200, 192, 0.47) !important',
            bg: mode(
              'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
              'linear-gradient(15.46deg, #7BCBD4 0%, #29C6B7 100%)',
            )(props),
          },
        }),
        outline: () => ({
          borderRadius: '16px',
        }),
        api: (props: any) => ({
          bg: mode('#120F43', 'white')(props),
          color: mode('white', '#120F43')(props),
          _focus: {
            bg: mode('#120F43', 'white')(props),
          },
          _active: {
            bg: mode('#120F43', 'white')(props),
          },
          _hover: {
            bg: mode('navy.800', 'whiteAlpha.800')(props),
            boxShadow: 'unset',
          },
        }),
        brand: (props: any) => ({
          bg: mode('brand.500', 'brand.400')(props),
          color: 'white',
          _focus: {
            bg: mode('brand.500', 'brand.400')(props),
          },
          _active: {
            bg: mode('brand.500', 'brand.400')(props),
          },
          _hover: {
            bg: mode('brand.600', 'brand.400')(props),
            boxShadow: '0px 21px 27px -10px rgba(96, 60, 255, 0.48)',
          },
        }),
        darkBrand: (props: any) => ({
          bg: mode('brand.900', 'brand.400')(props),
          color: 'white',
          _focus: {
            bg: mode('brand.900', 'brand.400')(props),
          },
          _active: {
            bg: mode('brand.900', 'brand.400')(props),
          },
          _hover: {
            bg: mode('brand.800', 'brand.400')(props),
          },
        }),
        lightBrand: (props: any) => ({
          bg: mode('#F2EFFF', 'whiteAlpha.100')(props),
          color: mode('brand.500', 'white')(props),
          _focus: {
            bg: mode('#F2EFFF', 'whiteAlpha.100')(props),
          },
          _active: {
            bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
          },
          _hover: {
            bg: mode('secondaryGray.400', 'whiteAlpha.200')(props),
          },
        }),
        light: (props: any) => ({
          bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
          color: mode('#120F43', 'white')(props),
          _focus: {
            bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
          },
          _active: {
            bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
          },
          _hover: {
            bg: mode('secondaryGray.400', 'whiteAlpha.200')(props),
          },
        }),
        action: (props: any) => ({
          fontWeight: '500',
          borderRadius: '50px',
          bg: mode('secondaryGray.300', 'brand.400')(props),
          color: mode('brand.500', 'white')(props),
          _focus: {
            bg: mode('secondaryGray.300', 'brand.400')(props),
          },
          _active: {
            bg: mode('secondaryGray.300', 'brand.400')(props),
          },
          _hover: {
            bg: mode('gray.200', 'brand.400')(props),
          },
        }),
        setup: (props: any) => ({
          fontWeight: '500',
          borderRadius: '50px',
          bg: mode('transparent', 'brand.400')(props),
          border: mode('1px solid', '0px solid')(props),
          borderColor: mode('secondaryGray.400', 'transparent')(props),
          color: mode('#120F43', 'white')(props),
          _focus: {
            bg: mode('transparent', 'brand.400')(props),
          },
          _active: { bg: mode('transparent', 'brand.400')(props) },
          _hover: {
            bg: mode('gray.200', 'brand.400')(props),
          },
        }),
      },
    },
  },
};
