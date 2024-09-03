import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const PROGRAM_ACCOUNT = process.env.PROGRAM_ACCOUNT || "";
export const RPC_URL = process.env.RPC_URL || "";
export const SEND_TOKEN_ADDRESS = "SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa";
// export const SEND_TOKEN_ADDRESS =
// 	"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"; // Devnet USDC
