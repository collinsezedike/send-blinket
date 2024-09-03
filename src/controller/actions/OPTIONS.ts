import { Request, Response } from "express";
import { ACTIONS_CORS_HEADERS } from "@solana/actions";

const OPTIONS = async (req: Request, res: Response) => {
	return res.set(ACTIONS_CORS_HEADERS);
};

export default OPTIONS;
