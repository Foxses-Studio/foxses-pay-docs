---
id: paypal
title: PayPal
sidebar_position: 10
---

PayPal payment integration — accept card payments and PayPal wallet payments globally.

## Installation

```bash
npm install @foxses/pay-paypal
```

## How It Works

PayPal uses OAuth 2.0 + Orders API v2:

1. **Get Token** — exchange clientId/clientSecret for OAuth token (auto-handled)
2. **Create Order** — POST to PayPal → get approval `checkoutUrl`
3. **Redirect** user to PayPal checkout
4. **User approves** payment on PayPal
5. **Capture** — foxses-pay automatically captures after redirect
6. **Verify** — retrieve order to confirm completion

## Configuration

```ts
gateway.use("paypal", {
  clientId: "YOUR_CLIENT_ID",                 // required
  clientSecret: "YOUR_CLIENT_SECRET",         // required
  successUrl: "https://yoursite.com/success", // required
  failureUrl: "https://yoursite.com/cancel",  // required
  sandbox: true,                              // true = sandbox, false = production
});
```

| Field | Type | Description |
|-------|------|-------------|
| `clientId` | string | PayPal app Client ID |
| `clientSecret` | string | PayPal app Client Secret |
| `successUrl` | string | Redirect after user approves |
| `failureUrl` | string | Redirect when user cancels |
| `sandbox` | boolean | `true` = sandbox, `false` = production |

## Getting Credentials

1. Go to [developer.paypal.com](https://developer.paypal.com)
2. **Apps & Credentials → Create App**
3. Copy **Client ID** and **Client Secret**
4. Use **Sandbox** credentials for testing, **Live** for production

## Create Payment

```ts
const payment = await gateway.createPayment("paypal", {
  amount: 29.99,
  currency: "USD",
  orderId: "ORDER-001",
  customerEmail: "user@example.com", // optional
});
```

**Response:**
```ts
{
  transactionId: "8MD12345XY678901A",   // PayPal Order ID
  provider: "paypal",
  amount: 29.99,
  currency: "USD",
  status: "pending",
  checkoutUrl: "https://www.sandbox.paypal.com/checkoutnow?token=8MD12345XY678901A",
}
```

## Verify Payment

Call after PayPal redirects to your `successUrl` with `?token=ORDER_ID`:

```ts
// successUrl receives: /success?token=8MD12345XY678901A&PayerID=XXXXX
const orderId = req.query.token as string;

const result = await gateway.verifyPayment("paypal", {
  transactionId: orderId,
});

console.log(result.status);        // "completed"
console.log(result.transactionId); // capture ID (for refunds)
```

## Get Payment Status

```ts
const status = await gateway.getPaymentStatus("paypal", "ORDER_ID");
```

## Refund Payment

**Requires Capture ID** — from `verifyPayment` response `transactionId`.

```ts
// Full refund
const refund = await gateway.refundPayment("paypal", {
  transactionId: "CAPTURE_ID",
});

// Partial refund
const refund = await gateway.refundPayment("paypal", {
  transactionId: "CAPTURE_ID",
  amount: 15.00,
  reason: "Customer requested",
});
```

## Status Mapping

| PayPal Status | foxses-pay Status |
|--------------|-------------------|
| `CREATED` | `pending` |
| `SAVED` | `pending` |
| `APPROVED` | `pending` |
| `COMPLETED` | `completed` |
| `VOIDED` | `cancelled` |
| `PAYER_ACTION_REQUIRED` | `pending` |

## Webhook Handling

```ts
app.post("/paypal/webhook", express.json(), async (req, res) => {
  const { event_type, resource } = req.body;

  if (event_type === "PAYMENT.CAPTURE.COMPLETED") {
    const orderId = resource.supplementary_data?.related_ids?.order_id;
    await fulfillOrder(orderId);
  }

  res.sendStatus(200);
});
```

## Supported Currencies

PayPal supports 25+ currencies. Common ones:

| Currency | Code |
|----------|------|
| US Dollar | USD |
| Euro | EUR |
| British Pound | GBP |
| Canadian Dollar | CAD |
| Australian Dollar | AUD |

Full list: [developer.paypal.com/docs/reports/reference/currencies](https://developer.paypal.com/docs/reports/reference/currencies/)

## Test Accounts (Sandbox)

1. Go to [developer.paypal.com → Sandbox → Accounts](https://developer.paypal.com/dashboard/accounts)
2. Use the pre-created **buyer** sandbox account to test payments

## Credentials

Get from [developer.paypal.com → Apps & Credentials](https://developer.paypal.com/dashboard/applications/sandbox)
