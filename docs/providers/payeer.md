---
id: payeer
title: Payeer
sidebar_position: 11
---

Payeer payment integration — accept USD, EUR, RUB and crypto payments via Payeer merchant gateway.

## Installation

```bash
npm install @foxses/pay-payeer
```

## How It Works

Payeer uses a form-based redirect (similar to SSLCommerz):

1. **Build signed URL** — foxses-pay generates a SHA256-signed checkout URL
2. **Redirect** user to Payeer checkout page
3. **User pays** via Payeer balance, card, or crypto
4. **Payeer POSTs** to your `statusUrl` with payment result (IPN)
5. **Verify** — validate IPN signature and update order

## Configuration

```ts
gateway.use("payeer", {
  merchantId: "P1000000",                      // required — your Payeer account ID
  secretKey: "YOUR_SECRET_KEY",                // required
  successUrl: "https://yoursite.com/success",  // required
  failureUrl: "https://yoursite.com/cancel",   // required
  statusUrl: "https://yoursite.com/payeer/ipn", // optional — IPN callback
});
```

| Field | Type | Description |
|-------|------|-------------|
| `merchantId` | string | Your Payeer account ID (e.g. `P1000000`) |
| `secretKey` | string | Secret key from merchant settings |
| `successUrl` | string | Redirect after successful payment |
| `failureUrl` | string | Redirect when user cancels |
| `statusUrl` | string | Server-to-server IPN callback URL (optional) |

## Getting Credentials

1. Go to [payeer.com](https://payeer.com) → Log in
2. **Merchant → Add store**
3. Set your store name, success/fail/status URLs
4. Copy your **Account ID** (merchantId) and **Secret Key**

## Create Payment

```ts
const payment = await gateway.createPayment("payeer", {
  amount: 10,
  currency: "USD",    // USD, EUR, or RUB
  orderId: "ORDER-001",
});
```

**Response:**
```ts
{
  transactionId: "ORDER-001",
  provider: "payeer",
  amount: 10,
  currency: "USD",
  status: "pending",
  checkoutUrl: "https://payeer.com/merchant/?m_shop=P1000000&m_orderid=ORDER-001&...",
}
```

Redirect the user to `checkoutUrl`.

## Verify Payment (IPN Handler)

Payeer sends a POST request to your `statusUrl` when payment completes.

```ts
app.post("/payeer/ipn", express.urlencoded({ extended: false }), async (req, res) => {
  const result = await gateway.verifyPayment("payeer", {
    transactionId: req.body.m_orderid,
    ...req.body,  // pass all IPN fields for signature verification
  });

  if (result.status === "completed") {
    await fulfillOrder(req.body.m_orderid);
    res.send(`${req.body.m_orderid}|success`);
  } else {
    res.send(`${req.body.m_orderid}|error`);
  }
});
```

> **Important:** Your IPN response must be `ORDER_ID|success` or `ORDER_ID|error`.

## Signature

Payeer uses SHA256 for signing:

```
sign = SHA256(merchantId:orderId:amount:currency:base64(description):secretKey).toUpperCase()
```

foxses-pay generates this automatically. For IPN verification, the formula adds more fields:

```
sign = SHA256(operation_id:ps:op_date:pay_date:shop:orderid:amount:curr:base64(desc):status:secretKey).toUpperCase()
```

## IPN Fields

| Field | Description |
|-------|-------------|
| `m_operation_id` | Payeer operation ID |
| `m_orderid` | Your order ID |
| `m_amount` | Amount paid |
| `m_curr` | Currency |
| `m_status` | `success` or `fail` |
| `m_sign` | Signature to verify |

## Status Mapping

| Payeer IPN Status | foxses-pay Status |
|-------------------|-------------------|
| `success` | `completed` |
| `fail` | `failed` |

## Supported Currencies

| Currency | Code |
|----------|------|
| US Dollar | USD |
| Euro | EUR |
| Russian Ruble | RUB |

## Important Notes

- **No programmatic refunds** — refund manually from the Payeer dashboard.
- **IPN required** for reliable payment confirmation — redirect-based success is not guaranteed.
- `statusUrl` must be publicly accessible (not localhost).

## Credentials

Get from [payeer.com → Merchant settings](https://payeer.com/en/account/merchant/)
