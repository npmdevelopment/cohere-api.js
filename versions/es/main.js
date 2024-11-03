import axios from 'axios';

class CohereAPI {
    constructor({ apiKey, maxTokens = 1000, noExit = false }) {
        this.apiKey = apiKey;
        this.maxTokens = maxTokens;
        this.model = 'command-xlarge-nightly'; // Set the model to use
        this.noExit = noExit; // Store noExit flag
        this.events = {
            error: null,
            debug: null
        };
    }

    on(event, callback) {
        if (event in this.events) {
            this.events[event] = callback;
        } else {
            throw new Error(`Event ${event} is not supported`);
        }
    }

    async send(prompt) {
        console.log("Sending Prompt:", prompt);
        console.log("Reviewing the Logs...");

        // Validate prompt length
        if (prompt.length > 2000) {
            const errorMessage = `Prompt exceeds maximum length of 2000 characters`;
            console.error(errorMessage);
            if (this.events.error) this.events.error(errorMessage);
            throw new Error(errorMessage);
        }

        try {
            console.log("Generating AI...");
            const response = await axios.post('https://api.cohere.ai/generate', {
                model: this.model,
                prompt: prompt,
                max_tokens: this.maxTokens,
                version: '2021-11-08' // API version
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.text) {
                console.log("AI Generated Successfully");
                return response.data.text; // Return the AI's reply
            } else {
                const errorMessage = 'No text response from AI';
                console.error(errorMessage);
                if (this.events.error) this.events.error(errorMessage);
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Error in sending request to Cohere API:', error);
            if (this.events.error) this.events.error(error.message);
            throw error; // Rethrow error for handling later
        }
    }

    async execute(prompt) {
        try {
            const reply = await this.send(prompt);
            console.log(reply); // Log the response from the AI
        } catch (error) {
            console.error('Error getting reply:', error);
        } finally {
            // Exit the process based on noExit flag
            if (!this.noExit) {
                process.exit();
            }
        }
    }
}

// Debug logging can be added as needed
function logDebug(message) {
    console.log(`DEBUG: ${message}`);
}

console.log(`Made with Cohere API.
Version: 1.0.0
Using Message Normal.
Used ES Module.
`);

export { CohereAPI };
