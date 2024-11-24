const API_KEY = prompt("Enter your API token here");

function fetchVacationPlan() {
    const userMessage = `
    You are a vacation planning assistant. Using the details provided below, generate a complete vacation plan:
    - Destination: [Insert destination]
    - Start Date: [Insert start date]
    - End Date: [Insert end date]
    - Number of Travelers: [Insert number of travelers]
    - Interests: [Insert interests]

    Requirements:
    1. Provide a day-by-day itinerary, tailored to the specific destination and interests.
    2. Each day should include:
       - Unique activities.
       - Recommendations for breakfast, lunch, and dinner with specific restaurant names or food types.
    3. Highlight any local events, festivals, or cultural experiences happening during the travel dates.
    4. Suggest appropriate transportation options within the destination, such as public transit or car rentals, if relevant.
    5. Include 2-3 travel tips related to the destination, such as packing advice, local customs, or weather expectations.

    Notes:
    - Ensure all recommendations are specific to the destination.
    - Avoid providing instructions for how to create a plan.
    - Do not end the response with any extraneous text like "user" or unrelated comments.
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
            max_tokens: 1000,
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
