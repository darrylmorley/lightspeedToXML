# lightspeedToXML

lightspeedToXML is a simple Node.js script that retrieves product data from your Lightspeed account and creates an XML file from the results.

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine.

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/darrylmorley/lightspeedToXML.git
   ```

---

2. Navigate & Install dependencies:

```
cd lightspeedToXML
 npm install
```

---

3. Create a .env file in the project root directory and set the following environment variables with your Lightspeed API credentials:

```
LIGHTSPEED_ACCOUNT_ID=your_account_id
LIGHTSPEED_CLIENT_ID=your_client_id
LIGHTSPEED_CLIENT_SECRET=your_client_secret
LIGHTSPEED_REFRESH_TOKEN=your_refresh_token
```

---

## Usage

Run the script:

```
npm run start
```

## The generated XML file can be used for various purposes, such as feeding product information to other systems or platforms.

## Acknowledgments

[Lightspeed API](https://developers.lightspeedhq.com/ecom/introduction/introduction/): Documentation for the Lightspeed API.
[slugify](https://www.npmjs.com/package/slugify): Used for generating slugs from product descriptions.
[xml](https://www.npmjs.com/package/xml): Used for creating XML documents.

---

## Contributing

Contributions are welcome! Feel free to open issues or pull requests to improve this project.

Version History
0.1.0 (Your Release Date): Initial release.
