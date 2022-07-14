# project18-Valex


## Create a card

```http
POST /createCard
```

### Request:

**Body**:
- `employeeId` - `Integer` / **Required - employee id**
- `cardType` - `string` / **Required - `Valid types: [groceries, restaurant, transport, education, health]`**

**Headers**:
- `x-api-key` - `string` / **Required - api key**

`Registred API KEY: zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0`

</br>

#### Response:

```json
{
	"number": "1111 1111 1111 1111",
	"cardholderName": "NAME N LASTNAME",
	"securityCode": "111",
	"expirationDate": "01/27",
	"isVirtual": false,
	"isBlocked": false,
	"type": "cardType"
}
```

#

### Activate a card

```http
PUT /activateCard
```

#### Request:

**Body**:
- `id` - `Integer` / **Required - card id**
- `securityCode` - `string` / **Required - `number w/ length:3`**
- `password` - `string` / **Required - `number w/ length:4`**

#

### Block a card

```http
PUT /blockCard
```

#### Request:

**Body**:
- `id` - `Integer` / **Required - card id**
- `password` - `string` / **Required - `number w/ length:4`**


#

### Unblock a card

```http
PUT /unblockCard
```

#### Request:

**Body**:
- `id` - `Integer` / **Required - card id**
- `password` - `string` / **Required - `number w/ length:4`**


#

### Recharge a card

```http
POST /recharge
```

#### Request:

**Headers**:
- `x-api-key` - `string` / **Required - api key**

`Registred API KEY: zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0`

**Body**:
- `id` - `Integer` / **Required - card id**
- `amount` - `Integer` / **Required**

#

### Card payment

```http
POST /pay
```

#### Request:

**Body**:
- `id` - `Integer` / **Required - card id**
- `password` - `string` / **Required - `number w/ length:4`**
- `businessId` - `Integer` / **Required - business id**
- `amount` - `Integer` / **Required**

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`

`SECRET_KEY = any string`

</br>

## Run Locally

Clone the project

```bash
$ git clone https://github.com/Joaosarm/project18-Valex.git

$ cd $project18-Valex

$ npm install

$ npm start
```

</br>
