import { Request, Response } from "express";
import {
	PublicKey,
	Connection,
	Transaction,
	clusterApiUrl,
} from "@solana/web3.js";
import {
	ActionPostRequest,
	ActionPostResponse,
	ACTIONS_CORS_HEADERS,
	createPostResponse,
	NextAction,
	NextActionLink,
} from "@solana/actions";

const URL_PATH = "/api/actions";

const POST = async (req: Request, res: Response) => {
	try {
		const request: ActionPostRequest = req.body;
		if (!request?.account?.trim()) {
			throw new Error("`account` field is required");
		}

		let account: PublicKey;
		try {
			account = new PublicKey(request.account);
		} catch (err: any) {
			throw new Error("invalid account provided: not a valid public key");
		}

		const connection = new Connection(clusterApiUrl("devnet"));
		const { blockhash } = await connection.getLatestBlockhash("confirmed");
		const transaction = new Transaction();
		transaction.feePayer = account;
		transaction.recentBlockhash = blockhash;

		const { action }: any = req.query;
		let next: NextActionLink;
		switch (action?.toString().trim()) {
			case "":
				throw new Error("No action was selected.");
			case "send":
				next = { type: "post", href: `${URL_PATH}/send` };
				break;
			case "swap":
				next = { type: "post", href: `${URL_PATH}/swap` };
				break;
			case "stake":
				next = { type: "post", href: `${URL_PATH}/stake` };
				break;
			default:
				throw new Error("invalid action");
		}

		const payload: ActionPostResponse = await createPostResponse({
			fields: { transaction, links: { next } },
		});
		return res.set(ACTIONS_CORS_HEADERS).status(200).json(payload);
	} catch (err: any) {
		return res.set(ACTIONS_CORS_HEADERS).status(400).json(err.message);
	}
};

export default POST;
