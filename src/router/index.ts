import express, { Router, Request, Response } from "express";
import { actionsJson, actions } from "../controller";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
	res.send("Kamino Blinks: GM!");
});

router.route("/actions.json").options(actionsJson.OPTIONS).get(actionsJson.GET);
router.route("/api/actions").options(actions.OPTIONS).get(actions.home.GET);
router
	.route("/api/actions/send")
	.get(actions.send.GET)
	.options(actions.OPTIONS)
	.post(actions.send.POST);

// router
// 	.route("/api/actions/swap")
// 	.options(actions.OPTIONS)
// 	.post(actions.swap.POST);

export default router;
