---
id: cryptomus
title: Cryptomus
sidebar_position: 8
---

Cryptomus crypto payment integration — accept 100+ cryptocurrencies with a simple hosted checkout page.

## Installation

```bash
npm install @foxses/pay-cryptomus
```

## How It Works

Cryptomus uses a hosted invoice page:

1. **Create Invoice** — POST to Cryptomus API → get `url`
2. **Redirect** user to the Cryptomus hosted checkout
3. **User pays** with any supported crypto
4. **Cryptomus confirms** on-chain
5. **Verify** — check invoice status via API or webhook

## Configuration

```ts
gateway.use("cryptomus", {
  merchantId: "YOUR_MERCHANT_UUID",           // required
  apiKey: "YOUR_PAYMENT_API_KEY",             // required
  successUrl: "https://yoursite.com/success", // required
  failureUrl: "https://yoursite.com/cancel",  // required
});
```

| Field | Type | Description |
|-------|------|-------------|
| `merchantId` | string | Your Merchant UUID from Cryptomus dashboard |
| `apiKey` | string | Payment API key from Cryptomus dashboard |
| `successUrl` | string | Redirect after successful payment |
| `failureUrl` | string | Redirect when user cancels |

## Getting Credentials

1. Go to [cryptomus.com](https://cryptomus.com) → Log in
2. **Settings → API keys**
3. Copy your **Merchant UUID** and **Payment API key**

## Authentication

Cryptomus uses HMAC-MD5 signature:

```
sign = MD5( base64(requestBody) + apiKey )
```

foxses-pay handles this automatically — you don't need to generate signatures manually.

## Create Payment

```ts
const payment = await gateway.createPayment("cryptomus", {
  amount: 50,
  currency: "USD",       // fiat pricing currency
  orderId: "ORDER-001",
});
```

**Response:**
```ts
{
  transactionId: "8b03432e-385b-4670-8d06-064591096795", // invoice UUID
  provider: "cryptomus",
  amount: 50,
  currency: "USD",
  status: "pending",
  checkoutUrl: "https://pay.cryptomus.com/pay/8b03432e-...",
}
```

## Verify Payment

```ts
const result = await gateway.verifyPayment("cryptomus", {
  transactionId: "8b03432e-385b-4670-8d06-064591096795", // uuid from createPayment
});
```

**Response:**
```ts
{
  transactionId: "8b03432e-385b-4670-8d06-064591096795",
  provider: "cryptomus",
  amount: 50,
  currency: "USD",
  status: "completed",
}
```

## Get Payment Status

```ts
const status = await gateway.getPaymentStatus("cryptomus", "INVOICE_UUID");
```

## Status Mapping

| Cryptomus Status | foxses-pay Status |
|-----------------|-------------------|
| `waiting` | `pending` |
| `confirm_check` | `pending` |
| `check` | `pending` |
| `wrong_amount` | `pending` |
| `wrong_amount_waiting` | `pending` |
| `paid` | `completed` |
| `paid_over` | `completed` |
| `cancel` | `failed` |
| `fail` | `failed` |
| `system_fail` | `failed` |
| `refund_process` | `refunded` |
| `refund_paid` | `refunded` |

## Webhook Handling

Cryptomus sends webhook callbacks when payment status changes.

### Setup

1. Go to **Cryptomus Dashboard → Settings → Webhooks**
2. Add your callback URL

### Handler

```ts
app.post("/cryptomus/webhook", express.json(), async (req, res) => {
  const crypto = require("crypto");

  // Verify signature
  const { sign, ...body } = req.body;
  const encoded = Buffer.from(JSON.stringify(body)).toString("base64");
  const expected = crypto
    .createHash("md5")
    .update(encoded + process.env.CRYPTOMUS_API_KEY)
    .digest("hex");

  if (sign !== expected) {
    return res.status(400).send("Invalid signature");
  }

  const { status, order_id, uuid } = req.body;

  if (status === "paid" || status === "paid_over") {
    await fulfillOrder(order_id, uuid);
  }

  res.sendStatus(200);
});
```

## Invoice Lifetime

By default, invoices expire after **1 hour** (3600 seconds). The user must pay before expiry.

## Supported Cryptocurrencies

100+ cryptos including:

| Crypto | Symbol |
|--------|--------|
| Bitcoin | BTC |
| Ethereum | ETH |
| Tether | USDT |
| Tron | TRX |
| BNB | BNB |
| Solana | SOL |
| Litecoin | LTC |
| Dogecoin | DOGE |

## Important Notes

- **No programmatic refunds** — refund manually from the Cryptomus dashboard.
- **Signature** is generated automatically by foxses-pay using MD5(base64(body) + apiKey).
- **order_id** must be unique per transaction (1–128 chars, alphanumeric with `_` and `-`).

## Credentials

Get from [cryptomus.com → Settings → API Keys](https://app.cryptomus.com/settings)
