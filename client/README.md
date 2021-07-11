# Client Dashboard

## Installation

npm install

npm start

## Features

**A dashboard in tabular format for monitoring Aldo's stores shoes inventory.**

The dashboard has the following features:

- Highlights with an animation every new shoe inventory received
- Alerts in a snack notification every time a shoe inventory goes bellow a "warning" level (defaults at 20)
- Identifies in red when a shoe inventory goes bellow a "critical" level (defaults at 5) and in orange when it goes bellow a "warning" level
- Counts the amount of inventory with "warning" and "critical" levels
- Sums all inventory in a given store
- Possibility to search for a store or model in order to enable specific stock analysis
- Option to enable shoe transfers suggestion from one store to another according to the inventory available (the suggestion is presented only if the recipient stock is bellow "critical" level and the sender is well above the "warning" level)

## To Do

- More testing
- Improve shoe transfer suggestions algorithm
- Move webSocketConnect from index.js to a saga
- CRUD for managing stores and models