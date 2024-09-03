import { Request, Response } from "express";
import {
	PublicKey,
	Connection,
	Transaction,
	clusterApiUrl,
	ParsedAccountData,
} from "@solana/web3.js";
import {
	ActionPostRequest,
	ActionPostResponse,
	ACTIONS_CORS_HEADERS,
	createPostResponse,
} from "@solana/actions";
import { SEND_TOKEN_ADDRESS } from "../../../utils";
import {
	createAssociatedTokenAccount,
	createTransferInstruction,
	getAssociatedTokenAddress,
	getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";

const POST = async (req: Request, res: Response) => {
	try {
		let { amount }: any = req.query;
		if (!amount?.toString().trim()) {
			throw new Error("`amount` parameter is required");
		}
		amount = parseFloat(amount);
		if (Number.isNaN(amount)) {
			throw new Error("Invalid `amount` parameter");
		}

		const request: ActionPostRequest = req.body;
		if (!request?.account?.trim()) {
			throw new Error("`account` field is required");
		}

		let sender: any;
		let recipient: any = req.query.recipient;
		try {
			sender = new PublicKey(request.account);
			recipient = new PublicKey(recipient);
		} catch (err: any) {
			throw new Error(
				"invalid account or recipient address provided: not a valid public key"
			);
		}

		const connection = new Connection(clusterApiUrl("devnet"));
		const mint_address = new PublicKey(SEND_TOKEN_ADDRESS);

		const senderATA = await getOrCreateAssociatedTokenAccount(
			connection,
			sender,
			mint_address,
			sender
		);
		const recipientATA = await getOrCreateAssociatedTokenAccount(
			connection,
			sender,
			mint_address,
			recipient
		);

		const checkDecimals = await connection.getParsedAccountInfo(
			mint_address
		);
		const tokenDecimal = checkDecimals.value
			? ((checkDecimals.value.data as ParsedAccountData).parsed.info
					.decimals as number)
			: 9;
		console.log(`Number of Decimals: ${tokenDecimal}`);

		const adjustedAmount = Math.floor(amount * Math.pow(10, tokenDecimal));
		console.log(adjustedAmount)

		const { blockhash } = await connection.getLatestBlockhash("confirmed");
		const transaction = new Transaction();
		transaction.recentBlockhash = blockhash;
		transaction.feePayer = sender;
		transaction.add(
			createTransferInstruction(
				senderATA.address,
				recipientATA.address,
				sender,
				adjustedAmount
			)
		);

		const payload: ActionPostResponse = await createPostResponse({
			fields: {
				transaction,
				message: "Hello from the other end of the blink. 👀",
			},
		});
		return res.set(ACTIONS_CORS_HEADERS).status(200).json(payload);
	} catch (err: any) {
		return res.set(ACTIONS_CORS_HEADERS).status(400).json(err.message);
	}
};

export default POST;
