import { darken, mode, whiten } from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props) => ({
      bg: "wipit", // Notice the use of color directly here
      color: "white",
      m: "5px",
      p: "5px",
      _hover: {
        // Notice the use of `mode` function to change color 
        // based on theme color mode
        bg: mode(whiten("wipit", 20), darken("wipit", 20))(props),
        boxShadow: "md",
      },
    }),
    secondary: (props) => ({
      bg: "wipitOff", // Notice the use of color directly here
      color: "white",
      m: "5px",
      p: "5px",
      _hover: {
        // Notice the use of `mode` function to change color 
        // based on theme color mode
        bg: mode(whiten("wipit", 20), darken("wipit", 20))(props),
        boxShadow: "md",
      },
    }),
  },
  // default values for `size` and `variant`
  defaultProps: {},
};
