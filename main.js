document.addEventListener("DOMContentLoaded", () => {
    const destinationInput = document.querySelector("#Destination");
    const startDayInput = document.querySelector("#startDay");
    const endDayInput = document.querySelector("#endDay");
    const peopleInput = document.querySelector("#People");
    const interestsInput = document.querySelector("#interests");
    const generateButton = document.querySelector("#generateButton");
    const generatedText = document.querySelector("#generatedText");

    generateButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission

        // Collect user input
        const destination = destinationInput.value;
        const startDay = startDayInput.value;
        const endDay = endDayInput.value;
        const people = peopleInput.value;
        const interests = interestsInput.value;

        if (!destination || !startDay || !endDay || !people || !interests) {
            generatedText.textContent = "Please fill in all fields before generating a plan.";
            return;
        }

        // Prepare user message content
        const userMessage = `
            Plan a vacation for the following details:
            - Destination: ${destination}
            - Start Date: ${startDay}
            - End Date: ${endDay}
            - Number of Travelers: ${people}
            - Interests: ${interests}
        `;

        // Override the logSuggestion function in huggingface.js
        logSuggestion = function () {
            fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "meta-llama/Llama-3.1-8B-Instruct",
                    messages: [
                        {
                            role: "user",
                            content: userMessage
                        }
                    ],
                    max_tokens: 500,
                    stream: false
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(suggestionData => {
                    const suggestion = suggestionData.choices[0].message.content;
                    generatedText.textContent = suggestion;
                })
                .catch(error => {
                    console.error(error);
                    generatedText.textContent = "Failed to generate a vacation plan. Please try again.";
                });
        };

        // Call the modified logSuggestion function
        logSuggestion();
    });
});

