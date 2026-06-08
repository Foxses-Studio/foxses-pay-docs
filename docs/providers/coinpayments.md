---
id: coinpayments
title: CoinPayments
sidebar_position: 7
---

CoinPayments crypto payment integration — accept 700+ cryptocurrencies.

## Installation

```bash
npm install @foxses/pay-coinpayments
```

## How It Works

CoinPayments uses HMAC-signed API calls:

1. **Create Transaction** — signed POST to CoinPayments API → get `checkout_url`
2. **Redirect** user to the CoinPayments checkout page
3. **User pays** with crypto
4. **CoinPayments confirms** on-chain
5. **Verify** — check transaction info via API or IPN

## Configuration

```ts
gateway.use("coinpayments", {
  publicKey: "YOUR_PUBLIC_KEY",               // required
  privateKey: "YOUR_PRIVATE_KEY",             // required
  successUrl: "https://yoursite.com/success", // required
  failureUrl: "https://yoursite.com/cancel",  // required
  ipnUrl: "https://yoursite.com/ipn",         // optional
});
```

| Field | Type | Description |
|-------|------|-------------|
| `publicKey` | string | CoinPayments public key |
| `privateKey` | string | CoinPayments private key (HMAC signing) |
| `successUrl` | string | Redirect after payment |
| `failureUrl` | string | Redirect on cancel |
| `ipnUrl` | string | IPN callback URL (optional) |

## Getting API Keys

1. Go to [coinpayments.net](https://www.coinpayments.net)
2. **Account → API Keys → Generate New Key**
3. Enable permissions: `Create Transaction`, `Get Transaction Info`

## Create Payment

```ts
const payment = await gateway.createPayment("coinpayments", {
  amount: 50,
  currency: "USD",                      // pricing currency
  orderId: "ORDER-001",
  customerEmail: "user@example.com",    // optional
});
```

**Response:**
```ts
{
  transactionId: "TXID123ABC",          // CoinPayments transaction ID
  provider: "coinpayments",
  amount: 50,
  currency: "USD",
  status: "pending",
  checkoutUrl: "https://www.coinpayments.net/index.php?cmd=checkout&id=TXID123ABC",
}
```

## Verify Payment

```ts
const result = await gateway.verifyPayment("coinpayments", {
  transactionId: "TXID123ABC",
});
```

**Response:**
```ts
{
  transactionId: "TXID123ABC",
  provider: "coinpayments",
  amount: 50,
  currency: "BTC",
  status: "completed",
}
```

## Get Payment Status

```ts
const status = await gateway.getPaymentStatus("coinpayments", "TXID123ABC");
```

## Status Mapping

| CoinPayments Status Code | Description | foxses-pay Status |
|--------------------------|-------------|-------------------|
| `-2` | Timed out | `failed` |
| `-1` | Cancelled | `failed` |
| `0` | Waiting | `pending` |
| `1` | Coin confirmed, awaiting exchange | `pending` |
| `2` | Complete (queued) | `completed` |
| `3` | Pending (exchange) | `pending` |
| `100` | Complete | `completed` |

## IPN Webhook

CoinPayments sends IPN notifications to your `ipnUrl`.

```ts
app.post("/coinpayments/ipn", express.urlencoded({ extended: false }), async (req, res) => {
  const crypto = require("crypto");

  // Verify IPN signature
  const hmac = req.headers.hmac as string;
  const body = new URLSearchParams(req.body).toString();
  const expected = crypto
    .createHmac("sha512", process.env.CP_IPN_SECRET)
    .update(body)
    .digest("hex");

  if (hmac !== expected) {
    return res.status(400).send("Invalid signature");
  }

  const { status, item_number, txn_id } = req.body;

  if (parseInt(status) >= 100 || parseInt(status) === 2) {
    await fulfillOrder(item_number, txn_id);
  }

  res.sendStatus(200);
});
```

**To get IPN secret:**
1. CoinPayments → **Account → Merchant & IPN Settings**
2. Set your IPN Secret

## Supported Cryptocurrencies

700+ cryptos including:

| Crypto | Symbol |
|--------|--------|
| Bitcoin | BTC |
| Ethereum | ETH |
| Litecoin | LTC |
| Ripple | XRP |
| Tether | USDT |
| Monero | XMR |
| Dogecoin | DOGE |
| Dash | DASH |

Full list: [coinpayments.net/supported-coins](https://www.coinpayments.net/supported-coins)

## Important Notes

- **No programmatic refunds** — refund manually from the CoinPayments dashboard.
- **currency2** — by default the same as `currency` (buyer pays in same coin). You can pass `pay_currency` in metadata to accept a different crypto.
- **Transaction expires** in 24 hours by default.

## Credentials

Get from [coinpayments.net → Account → API Keys](https://www.coinpayments.net/acct-api-keys)
