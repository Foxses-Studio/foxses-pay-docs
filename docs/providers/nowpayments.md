---
id: nowpayments
title: NOWPayments
sidebar_position: 6
---

NOWPayments crypto payment integration — accept 150+ cryptocurrencies with sandbox support.

## Installation

```bash
npm install @foxses/pay-nowpayments
```

## How It Works

NOWPayments uses a hosted invoice page:

1. **Create Invoice** — POST to NOWPayments API → get `invoice_url`
2. **Redirect** user to the NOWPayments invoice page
3. **User pays** with any supported crypto
4. **NOWPayments confirms** on-chain
5. **Verify** — check payment status via API or IPN webhook

## Configuration

```ts
gateway.use("nowpayments", {
  apiKey: "YOUR_NOWPAYMENTS_API_KEY",         // required
  successUrl: "https://yoursite.com/success", // required
  failureUrl: "https://yoursite.com/cancel",  // required
  ipnSecretKey: "YOUR_IPN_SECRET",            // optional — for IPN webhook
  sandbox: true,                              // optional, default: false
});
```

| Field | Type | Description |
|-------|------|-------------|
| `apiKey` | string | NOWPayments API key |
| `successUrl` | string | Redirect after payment |
| `failureUrl` | string | Redirect on cancel |
| `ipnSecretKey` | string | IPN secret for webhook verification (optional) |
| `sandbox` | boolean | Use sandbox environment (`true` = sandbox) |

## Getting API Key

**Production:**
1. Go to [nowpayments.io](https://nowpayments.io)
2. **Store Settings → API Keys → Add API key**

**Sandbox:**
1. Go to [sandbox.nowpayments.io](https://sandbox.nowpayments.io)
2. **Store Settings → API Keys → Add API key**

## Create Payment

```ts
const payment = await gateway.createPayment("nowpayments", {
  amount: 100,
  currency: "USD",          // fiat pricing currency
  orderId: "ORDER-001",
});
```

**Response:**
```ts
{
  transactionId: "abc123-invoice-id",
  provider: "nowpayments",
  amount: 100,
  currency: "USD",
  status: "pending",
  checkoutUrl: "https://nowpayments.io/payment/?iid=abc123",
}
```

## Verify Payment

After NOWPayments redirects or via IPN, verify using the payment ID:

```ts
const result = await gateway.verifyPayment("nowpayments", {
  transactionId: "PAYMENT_ID", // numeric payment ID
});
```

**Response:**
```ts
{
  transactionId: "5678901",
  provider: "nowpayments",
  amount: 100,
  currency: "USD",
  status: "completed",
}
```

## Get Payment Status

```ts
const status = await gateway.getPaymentStatus("nowpayments", "PAYMENT_ID");
```

## Status Mapping

| NOWPayments Status | foxses-pay Status |
|-------------------|-------------------|
| `waiting` | `pending` |
| `confirming` | `pending` |
| `confirmed` | `completed` |
| `finished` | `completed` |
| `failed` | `failed` |
| `refunded` | `refunded` |
| `expired` | `cancelled` |

## IPN Webhook (Optional)

NOWPayments sends IPN callbacks when payment status changes.

```ts
app.post("/nowpayments/ipn", express.json(), async (req, res) => {
  const crypto = require("crypto");

  // Verify IPN signature
  const sig = req.headers["x-nowpayments-sig"] as string;
  const sorted = JSON.stringify(
    Object.fromEntries(Object.entries(req.body).sort())
  );
  const expected = crypto
    .createHmac("sha512", process.env.NP_IPN_SECRET)
    .update(sorted)
    .digest("hex");

  if (sig !== expected) {
    return res.status(400).send("Invalid signature");
  }

  const { payment_status, order_id, payment_id } = req.body;

  if (payment_status === "finished") {
    await fulfillOrder(order_id);
  }

  res.sendStatus(200);
});
```

## Supported Cryptocurrencies

150+ cryptos including:

| Crypto | Symbol |
|--------|--------|
| Bitcoin | BTC |
| Ethereum | ETH |
| Tether | USDT |
| BNB | BNB |
| Solana | SOL |
| Cardano | ADA |
| Polygon | MATIC |
| Dogecoin | DOGE |

Full list: [nowpayments.io/supported-coins](https://nowpayments.io/supported-coins)

## Important Notes

- **No programmatic refunds** — refund manually from the NOWPayments dashboard.
- **Sandbox** is a separate environment at `sandbox.nowpayments.io` — needs a separate API key.
- **Underpayment** — if user pays less than required, NOWPayments marks it as partially paid. Handle via IPN.

## Credentials

- Production: [nowpayments.io → Store Settings](https://account.nowpayments.io/store-settings)
- Sandbox: [sandbox.nowpayments.io → Store Settings](https://account.sandbox.nowpayments.io/store-settings)
