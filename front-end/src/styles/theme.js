import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./ButtonStyles";

export const myNewTheme = extendTheme({
  colors: {
    primary: "#845EC2",
    secondary: "#FF6F91",
    highlight: "#00C9A7",
    warning: "#FFC75F",
    danger: "#C34A36",
    wipitOff: "#e97094",
    wipit: "#fc2464",
    darkerWipit: "#ef2e64",
    blueGradient: "linear-gradient(to left,#7ea1c2, #47749d)",
    blueRadialGradient: "radial-gradient(circle, rgba(126,161,194,1) 35%, rgba(71,116,157,1) 65%)",
    redGradient: "linear-gradient(to right, #fe2865 30%, #91455a 100%)",
    blueBg: "#EFF4FB"
  },
  fonts: {
    nunito: "Nunito Sans"
  },
  gradient: {
  },
  components: {
    Button,
  },
});
