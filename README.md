# Cohere API

A simple interface to interact with the Cohere API for natural language processing.

## Version

1.0.0

## Features

- Sends prompts to the Cohere API for AI-generated responses.
- Validates the length of prompts (max 2000 characters).
- Implements event handling for "error" and "debug".
- Optional terminal exit behavior after execution.

## Installation

To install the required dependencies, run:

```bash
npm install
```

## Usage

### Import the CohereAPI

```javascript
const { CohereAPI } = require('cohere-api');
```

### Create an Instance

Create a new instance of the `CohereAPI`:

```javascript
const ai = new CohereAPI({ apiKey: 'YourApiKeyHere', maxTokens: 1000 });
```

### Set Up Event Handlers

You can set up handlers for "error" and "debug" events:

```javascript
ai.on("error", (errorMessage) => {
    console.error("Error Event Triggered:", errorMessage);
});

ai.on("debug", (debugMessage) => {
    console.log("Debug Event Triggered:", debugMessage);
});
```

### Sending a Prompt

To send a prompt and get a response from the AI:

```javascript
ai.execute("What are the health benefits of green tea?")
    .then(response => {
        console.log("AI Response:", response);
    })
    .catch(error => {
        console.error("Error:", error);
    });
```

## API Methods

### `send(prompt)`

Sends a prompt to the Cohere API and returns the generated response. It validates the prompt length before making the API call.

**Parameters:**

- `prompt` (string): The text to send to the AI.

### `execute(prompt)`

Executes the `send` method and logs the response. It will exit the process based on the `noExit` flag set during instantiation.

**Parameters:**

- `prompt` (string): The text to send to the AI.

### `on(event, callback)`

Registers a callback for a specified event.

**Parameters:**

- `event` (string): The event to listen for. Supported events: `error`, `debug`.
- `callback` (function): The function to call when the event is triggered.

## Error Handling

If an error occurs while sending the prompt or processing the response, an "error" event will be triggered, and the message can be handled in the callback.

## Debugging

Debug messages can be emitted using the "debug" event, allowing you to track the internal state and flow of operations.

## License

This project is licensed under the ISC License.

## Author

Leonel Joel <floresgaunal@gmail.com>
```

### Summary of Changes
- **Overview**: Added an overview of the `CohereAPI` functionality.
- **Installation Instructions**: Included instructions for installing dependencies.
- **Usage**: Provided examples of how to create an instance, set up event handlers, and send prompts.
- **API Methods**: Documented the main methods (`send`, `execute`, `on`) and their parameters.
- **Error Handling**: Explained how to handle errors through events.
- **Debugging**: Explained the debug event usage.
