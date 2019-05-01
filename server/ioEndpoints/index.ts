import {Socket} from "socket.io";
import {digest} from "./digest/events";

export const ioEndpoints = (io: Socket) => {
    digest(io);
}