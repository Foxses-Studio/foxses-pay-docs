---
id: binance
title: Binance Pay
sidebar_position: 9
---

Binance Pay payment integration — accept BTC, ETH, BNB, USDT and 70+ cryptocurrencies via Binance's hosted checkout.

## Installation

```bash
npm install @foxses/pay-binance
```

## How It Works

Binance Pay uses a hosted checkout page:

1. **Create Order** — POST to Binance Pay API → get `checkoutUrl`
2. **Redirect** user to Binance hosted checkout
3. **User pays** via Binance app or wallet
4. **Binance confirms** the transaction
5. **Verify** — query order status via API or webhook

## Configuration

```ts
gateway.use("binance", {
  apiKey: "YOUR_CERTIFICATE_SN",              // required — Certificate SN from Binance
  secretKey: "YOUR_SECRET_KEY",              // required — Secret key from Binance
  successUrl: "https://yoursite.com/success", // required
  failureUrl: "https://yoursite.com/cancel",  // required
});
```

| Field | Type | Description |
|-------|------|-------------|
| `apiKey` | string | Certificate SN from Binance merchant dashboard |
| `secretKey` | string | Secret key for HMAC-SHA512 signing |
| `successUrl` | string | Redirect after successful payment |
| `failureUrl` | string | Redirect when user cancels |

## Getting Credentials

1. Go to [merchant.binance.com](https://merchant.binance.com)
2. Log in with your Binance account
3. **API Management → Create API**
4. Copy **Certificate SN** → use as `apiKey`
5. Copy **Secret Key** → use as `secretKey`

## Authentication

Binance Pay uses HMAC-SHA512 signature:

```
payload  = timestamp + "\n" + nonce + "\n" + requestBody + "\n"
signature = HMAC-SHA512(payload, secretKey).toUpperCase()
```

foxses-pay generates the signature automatically on every request.

## Create Payment

```ts
const payment = await gateway.createPayment("binance", {
  amount: 10,
  currency: "USDT",        // any Binance Pay supported crypto
  orderId: "ORDER001",     // max 32 chars, alphanumeric only
});
```

**Response:**
```ts
{
  transactionId: "29383937493038367",  // Binance prepayId
  provider: "binance",
  amount: 10,
  currency: "USDT",
  status: "pending",
  checkoutUrl: "https://pay.binance.com/checkout/...",
}
```

> Redirect the user to `checkoutUrl` — they can pay via the Binance app or any Binance-supported wallet.

## Verify Payment

```ts
const result = await gateway.verifyPayment("binance", {
  transactionId: "29383937493038367",  // prepayId from createPayment
});
```

**Response:**
```ts
{
  transactionId: "29383937493038367",
  provider: "binance",
  amount: 10,
  currency: "USDT",
  status: "completed",
}
```

## Get Payment Status

```ts
const status = await gateway.getPaymentStatus("binance", "PREPAY_ID");
```

## Status Mapping

| Binance Pay Status | foxses-pay Status |
|-------------------|-------------------|
| `INITIAL` | `pending` |
| `PENDING` | `pending` |
| `PAID` | `completed` |
| `CANCELED` | `cancelled` |
| `EXPIRED` | `cancelled` |
| `ERROR` | `failed` |
| `REFUNDING` | `refunded` |
| `REFUNDED` | `refunded` |

## Webhook Handling

Binance Pay sends server notifications when payment status changes.

### Setup

1. Binance Merchant Dashboard → **API Management → Webhook URL**
2. Set your webhook URL: `https://yoursite.com/binance/webhook`

### Handler

```ts
app.post("/binance/webhook", express.json(), async (req, res) => {
  const crypto = require("crypto");

  // Verify signature
  const timestamp = req.headers["binancepay-timestamp"] as string;
  const nonce = req.headers["binancepay-nonce"] as string;
  const signature = req.headers["binancepay-signature"] as string;
  const body = JSON.stringify(req.body);

  const payload = `${timestamp}\n${nonce}\n${body}\n`;
  const expected = crypto
    .createHmac("sha512", process.env.BINANCE_SECRET_KEY)
    .update(payload)
    .digest("hex")
    .toUpperCase();

  if (signature !== expected) {
    return res.status(400).send("Invalid signature");
  }

  const { bizStatus, data } = req.body;

  if (bizStatus === "PAY_SUCCESS") {
    const { merchantTradeNo, prepayId } = JSON.parse(data);
    await fulfillOrder(merchantTradeNo);
  }

  res.json({ returnCode: "SUCCESS", returnMessage: null });
});
```

## Supported Cryptocurrencies

70+ cryptos including:

| Crypto | Symbol |
|--------|--------|
| Tether | USDT |
| BNB | BNB |
| Bitcoin | BTC |
| Ethereum | ETH |
| USD Coin | USDC |
| Binance USD | BUSD |
| Dogecoin | DOGE |
| Shiba Inu | SHIB |

## Order ID Rules

- Max **32 characters**
- **Alphanumeric only** (a-z, A-Z, 0-9) — no spaces, dashes, or special chars
- Must be **unique** per transaction

foxses-pay automatically strips non-alphanumeric characters and truncates to 32 chars.

## Important Notes

- **No programmatic refunds** — refund manually from the Binance merchant dashboard.
- **Order expires** — Binance Pay orders expire after a set time (configurable in dashboard).
- **Timestamp must be within 1 second** of Binance server time — foxses-pay uses `Date.now()` which should be accurate.

## Credentials

Get from [merchant.binance.com → API Management](https://merchant.binance.com/en/dashboard/api-management)
