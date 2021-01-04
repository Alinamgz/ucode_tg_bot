require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
const baseUrl = "https://api.telegram.org";

const respArr = ["Hello", "Idi rabotat\'", ""];

app.get("/", (req, res) => res.send("Hello Gogi sho kak"));

app.use(require("body-parser").json());

app.post("/:token/setWebhook", (req, res) => {
	console.log("\t=== ch ===" + req.body.url);
	console.log(`${req.params.token}\n\n${process.env.TG_BOT_TOKEN} `);
	if (
		req.body &&
		req.body.url &&
		req.params.token === process.env.TG_BOT_TOKEN
	) {
		console.log("\tama tuta");
		axios
			.post(`${baseUrl}/bot${req.params.token}/setWebhook`, {
				url: req.body.url,
			})
			.then((resp) => console.log(resp.body.url))
			.catch((err) => console.log(err));
	}
	res.send("OK Gogi");
});

app.post("/handler", (req, res) => {
	res.send("Nu sho");
	console.log(`\tNu Sho\n`);
	console.log(req.body);
	axios
		.post(`${baseUrl}/bot${process.env.TG_BOT_TOKEN}/sendMessage`, {
			chat_id: req.body.message.chat.id,
			text: "Hello",
		})
		.then((resp) => console.log("success"));
});

app.listen(port, () => {
	console.log(`Listeninng on port ${port}`);
});
