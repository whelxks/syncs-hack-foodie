## QuickStart
The backend is hosted on local machine connected to usyd WiFi.<br>
Configure the client to hit the private IP and port 3008.

## API Repository

### /upload GET
API to request for presigned url to upload image.

<b>Request Structure</b>
| Parameter | Required | Type
| :-- | :-- | :--
| bucket | required | string
| key | required | string

### /itemModel GET
API to prefill the item form from image

<b>Request Structure</b>
| Parameter | Required | Type
| :-- | :-- | :--
| bucket | required | string
| key | required | string

<b>Response Structure</b>
| Field | Type
| :-- | :--
| title | string
| category | Literal['Electronics', 'Fashion', 'Food & Drinks', 'Furniture', 'Education', 'Others']
| condition | Literal['new', 'well_used', 'heavy used']
| description | string