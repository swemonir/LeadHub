const GOOGLE_SHEETS_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL?.trim();

type LeadPayload = {
  name: string;
  email: string;
  senderNumber: string;
  transactionId: string;
  paymentMethod: string;
  paymentNumber: string;
  price: string;
};

export async function sendLeadToGoogleSheets(payload: LeadPayload) {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    return;
  }

  const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString()
    })
  });

  if (response.type !== 'opaque' && !response.ok) {
    throw new Error('Could not save your details. Please try again.');
  }
}
