import { Request, Response } from "express";
import { ActionGetResponse, ACTIONS_CORS_HEADERS } from "@solana/actions";

const URL_PATH = "/api/actions/";

const GET = async (req: Request, res: Response) => {
	const payload: ActionGetResponse = {
		icon: "https://ucarecdn.com/7aa46c85-08a4-4bc7-9376-88ec48bb1f43/-/preview/880x864/-/quality/smart/-/format/auto/",
		title: "SEND FINANCE",
		description:
			"Send, swap and stake $SEND tokens without switching tabs.",
		label: "$SEND IT!",
		links: {
			actions: [
				{ href: `${URL_PATH}?action=send`, label: "Send" },
				{ href: `${URL_PATH}?action=swap`, label: "Swap" },
				{ href: `${URL_PATH}?action=stake`, label: "Stake" },
			],
		},
	};
	return res.set(ACTIONS_CORS_HEADERS).json(payload);
};

export default GET;
