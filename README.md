# LeadHub

## Getting Started

1. Run `npm install`
2. Create `.env` from `.env.example`
3. Run `npm run dev`

## Google Sheets Setup

This app can push `Complete Purchase` form submissions to Google Sheets through a Google Apps Script webhook.

Set this variable in `.env`:

```env
VITE_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Use this Google Apps Script:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.senderNumber || '',
    data.transactionId || '',
    data.paymentMethod || '',
    data.paymentNumber || '',
    data.price || '',
    data.submittedAt || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Create a sheet named `Leads`, then deploy the Apps Script as a Web App:

1. `Deploy > New deployment`
2. Type: `Web app`
3. Execute as: `Me`
4. Who has access: `Anyone`
5. Copy the `/exec` URL into `.env`

Recommended sheet columns:

1. `Created At`
2. `Name`
3. `Email`
4. `Sender Number`
5. `Transaction ID`
6. `Payment Method`
7. `Payment Number`
8. `Amount`
9. `Submitted At`
