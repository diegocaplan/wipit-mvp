import io from "socket.io-client";

let socket = io("//localhost:3001",{
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

export default socket;
