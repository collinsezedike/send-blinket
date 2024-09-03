import { Request, Response } from "express";
import { NextAction, ACTIONS_CORS_HEADERS } from "@solana/actions";

const URL_PATH = "/api/actions/send";

const GET = async (req: Request, res: Response) => {
	const payload: NextAction = {
		type: "action",
		icon: "https://ucarecdn.com/7aa46c85-08a4-4bc7-9376-88ec48bb1f43/-/preview/880x864/-/quality/smart/-/format/auto/",
		title: "SEND $SEND",
		description:
			"Specify the amount of $SEND token you wish to transfer and the recipient address",
		label: "$SEND IT!",
		links: {
			actions: [
				{
					href: `${URL_PATH}?amount={amount}&recipient={recipient}`,
					label: `Send $SEND`,
					parameters: [
						{
							name: "amount",
							label: "Enter $SEND amount",
							required: true,
						},
						{
							name: "recipient",
							label: "Enter reecipient address",
							required: true,
						},
					],
				},
			],
		},
	};
	return res.set(ACTIONS_CORS_HEADERS).json(payload);
};

export default GET;
