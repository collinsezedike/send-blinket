import express, { Express } from "express";

import router from "./router";
import { PORT } from "./utils";

const app: Express = express();

app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
	console.log(`[server]: Server is running on port ${PORT}`);
});
