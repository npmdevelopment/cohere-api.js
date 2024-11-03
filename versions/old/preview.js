const { CohereAPI } = require("./main");

const ai = new CohereAPI({ apiKey: "Your API Key here", noExit: false });

// Setting up the event handlers
ai.on("error", (errorMessage) => {
    console.error("Error Event Triggered:", errorMessage);
});

ai.on("debug", (debugMessage) => {
    console.log("Debug Event Triggered:", debugMessage);
});

// Using the AI instance
ai.execute("Hello")
.then(response => {
    console.log("AI Response:", response);
})
.catch(error => {
    console.error("Error:", error);
});

