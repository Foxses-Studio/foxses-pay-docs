---
id: coinbase
title: Coinbase Commerce
sidebar_position: 5
---

Coinbase Commerce crypto payment integration — accept BTC, ETH, USDC, LTC and 10+ cryptocurrencies globally.

## Installation

```bash
npm install @foxses/pay-coinbase
```

## How It Works

Coinbase Commerce uses a hosted checkout page:

1. **Create Charge** — POST to Coinbase API → get `hosted_url`
2. **Redirect** user to Coinbase hosted checkout
3. **User pays** with any supported crypto
4. **Coinbase confirms** payment on-chain
5. **Verify** — check charge status via API or webhook

## Configuration

```ts
gateway.use("coinbase", {
  apiKey: "YOUR_COINBASE_COMMERCE_API_KEY",   // required
  successUrl: "https://yoursite.com/success", // required
  failureUrl: "https://yoursite.com/cancel",  // required
  webhookSecret: "YOUR_WEBHOOK_SECRET",       // optional
});
```

| Field | Type | Description |
|-------|------|-------------|
| `apiKey` | string | Coinbase Commerce API key |
| `successUrl` | string | Redirect after successful payment |
| `failureUrl` | string | Redirect when user cancels |
| `webhookSecret` | string | For webhook signature verification (optional) |

## Getting API Key

1. Go to [commerce.coinbase.com](https://commerce.coinbase.com)
2. **Settings → API keys → Create an API key**
3. Copy the key to your config

## Create Payment

```ts
const payment = await gateway.createPayment("coinbase", {
  amount: 29.99,
  currency: "USD",                        // fiat pricing currency
  orderId: "ORDER-001",
  customerEmail: "user@example.com",      // optional
  customerName: "John Doe",               // optional
});
```

**Response:**
```ts
{
  transactionId: "ABCD1234",              // Coinbase charge code
  provider: "coinbase",
  amount: 29.99,
  currency: "USD",
  status: "pending",
  checkoutUrl: "https://commerce.coinbase.com/charges/ABCD1234",
}
```

## Verify Payment

```ts
const result = await gateway.verifyPayment("coinbase", {
  transactionId: "ABCD1234",  // charge code from createPayment
});
```

**Response:**
```ts
{
  transactionId: "ABCD1234",
  provider: "coinbase",
  amount: 29.99,
  currency: "USD",
  status: "completed", // "pending" | "completed" | "failed" | "cancelled"
}
```

## Get Payment Status

```ts
const status = await gateway.getPaymentStatus("coinbase", "ABCD1234");
```

## Status Mapping

| Coinbase Status | foxses-pay Status |
|----------------|-------------------|
| `NEW` | `pending` |
| `PENDING` | `pending` |
| `CONFIRMED` | `completed` |
| `COMPLETED` | `completed` |
| `RESOLVED` | `completed` |
| `EXPIRED` | `cancelled` |
| `CANCELED` | `cancelled` |
| `FAILED` | `failed` |

## Webhook Handling

Coinbase sends server-to-server events when payment status changes.

### Setup

1. Go to [commerce.coinbase.com](https://commerce.coinbase.com) → **Settings → Webhook subscriptions**
2. Add endpoint: `https://yoursite.com/coinbase/webhook`
3. Copy the **Webhook Shared Secret** to your config as `webhookSecret`

### Handler

```ts
app.post(
  "/coinbase/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const signature = req.headers["x-cc-webhook-signature"] as string;
    const body = req.body.toString();

    // Verify signature manually
    const crypto = require("crypto");
    const expected = crypto
      .createHmac("sha256", process.env.COINBASE_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    if (signature !== expected) {
      return res.status(400).send("Invalid signature");
    }

    const event = JSON.parse(body);

    if (event.event.type === "charge:confirmed") {
      const charge = event.event.data;
      const orderId = charge.metadata.orderId;
      // Fulfill order
      await fulfillOrder(orderId);
    }

    res.sendStatus(200);
  }
);
```

## Supported Cryptocurrencies

| Crypto | Symbol |
|--------|--------|
| Bitcoin | BTC |
| Ethereum | ETH |
| USD Coin | USDC |
| Litecoin | LTC |
| Bitcoin Cash | BCH |
| Dogecoin | DOGE |
| Dai | DAI |
| Apecoin | APE |

> Full list on [Coinbase Commerce dashboard](https://commerce.coinbase.com)

## Important Notes

- **No programmatic refunds** — Coinbase Commerce does not support API refunds. Refund manually from the dashboard.
- **Charge expires in 1 hour** — if the user doesn't pay within 1 hour, the charge expires.
- **Crypto price is calculated at checkout** — the fiat amount you set is converted to crypto at the time of checkout.

## Credentials

Get from [commerce.coinbase.com → Settings → API Keys](https://commerce.coinbase.com/settings/security)
