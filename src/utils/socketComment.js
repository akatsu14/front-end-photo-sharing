import { io } from "socket.io-client";

// export const BaseUrl = "http://localhost:8081";
// export const socketChat = io.connect("http://localhost:3000");
// export const socketComment = io.connect("http://localhost:8080");

// export const BaseUrl = "http://26.208.114.46:8081";
// export const socketChat = io.connect("http://26.208.114.46:3000");
// export const socketComment = io.connect("http://26.208.114.46:8080");

export const BaseUrl = "https://dxfz3n-8081.csb.app";
export const socket = io.connect("https://dxfz3n-3000.csb.app");
export const socketComment = io.connect("https://dxfz3n-8080.csb.app");
