import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "node:stream";
import Stripe from "stripe";
import stripe from "../../services/stripe";

async function buffer(readable: Readable) {
	const chunks = [];

	for await (const chuck of readable) {
		chunks.push(typeof chuck === "string" ? Buffer.from(chuck) : chuck)
	}

	return Buffer.concat(chunks)
}

export const config = {
	api: {
		bodyParser: false
	}
}

const relevantEvents = new Set(['checkout.session.completed'])

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const buf = await buffer(req)
		const secret = req.headers['stripe-signature']

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
		} catch (err) {
			return res.status(400).send(`Webhook error: ${err.message}`)
		}

		const { type } = event;

		if (relevantEvents.has(type)) {
			console.log('evento recebido', event)
		}

		res.json({ received: true })
	} else {
		res.setHeader('Allow', "POST");
		res.status(405).end("Method not allowed")
	}
}
