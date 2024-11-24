const API_KEY = prompt("Enter your API token here");

function fetchVacationPlan() {
    const userMessage = `
        Plan a vacation for the following details:
        - Destination, Start Date, End Date, Number of Travelers, Interests
        Requirements for the plan:
        - provide a day-by-day itinerary with unique activities relevant to the destination and interests.
        - Include dining recommendations (breakfast, lunch, and dinner) for each day. 
        - Mention local events, festivals, or cultural highlights during the travel dates. 
        - Return the plan as a JSON string in this format.
        - Tailor the plan to the provided interests and number of travellers. 
        - Avoid asking for more input; assume all details are given.
        - avoid  ending the generated message with "user"
        
    `;

    return fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct/v1/chat/completions", {
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
        .then(suggestionData => suggestionData.choices[0].message.content)
        .catch(error => {
            console.error(error);
            throw new Error("Failed to fetch vacation plan.");
        });
}
