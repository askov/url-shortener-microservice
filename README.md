# URL Shortener Microservice

Project built for [https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/url-shortener-microservice](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/url-shortener-microservice)

User story:

- I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`
- If I pass an invalid URL that doesn't follow the `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}` HINT: to be sure that the submitted url points to a valid site you can use the function `dns.lookup(host, cb)` from the dns core module.
- When I visit the shortened URL, it will redirect me to my original link.

# Usage
## Setup
- `git clone https://github.com/askov/url-shortener-microservice`
- `cd url-shortener-microservice`
- `npm i`
- `npm dev`

With default settings you can reach app at http://localhost:3000

## Tests
- `npm test`

## Env
In order to have working hrefs, set HOST in .env

