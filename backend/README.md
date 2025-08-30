## QuickStart
The backend is hosted on local machine connected to usyd WiFi.

## API Repository

### /upload GET
Mobile client request for presigned url to upload image.

<b>Request Structure</b>
| Parameter | Required | Type
| :-- | :-- | :--
| bucket | required | string
| key | required | string

### /foodItems GET
OCR receipt image and parse through Gemini to get the array of food items on the receipt.

<b>Request Structure</b>
| Parameter | Required | Type
| :-- | :-- | :--
| bucket | required | string
| key | required | string

<b>Response Structure</b>
| Field | Type
| :-- | :--
| foodItems | List[string]