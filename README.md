# Restaurant-ChatBot

<!-- Provide the missing links and do one round of editing before making the commit -->

This application is a chatbot that serves as an interface for users to make orders from an online restaurant. The responses from the chatbot are a mixture of hard-coded and AI generated replies via the [Gemini API](https://ai.google.dev/gemini-api/docs/api-overview).

## Concept

I made this project to showcase and experiment on the implementation of AI in a modern application.

-   The AI portion of the application allow for a huge plethora of options when users requests for things like dishes and meals. It also takes away most of the stress of writing hard-coded replies and takes care of edge cases where the user makes a request that is not accounted for in the programming.

-   The hard-coded portions are meant to direct the user in the natural path of usage of the application. As the AI on it's own might tend to stray the conversation in an unpredictable direction. It also accounts for the shortcomings of the AI responses, such as hallucinations and text formatting/presentation. For example, when a user makes a request for dishes, there is written code to extract the data returned by the AI which is then formatted into a list.

## Setup

This guide will walk you through setting up this project on your local environment.

> You should have [Node.js and npm](https://nodejs.org) installed on your system

1. Clone the Repository
   Open the terminal in your desired directory, and run the code below:

```bash
git clone https://github.com/Teejay128/Restaurant-ChatBot.git
```

2. Install Dependencies
   Navigate into the project directory using:

```bash
cd Restaurant-ChatBot
```

This project uses [npm packages](https://www.npmjs.com/) like, express, socket.io, and @google/generative-ai. Install them by running this code in the terminal.

```bash
npm install
```

3. Environment Variables
   Create a `.env` file for your environmental variables, in this format

```bash
PORT = ####
API_KEY = "" // Get one from here: <google gemini link>
```

4. Start The Development Server
   Run this command in the terminal to run the `index.js` file which starts the development server

```bash
npm start
```

Once the Server is up and running, open a web browser and navigate to this URL: `http://localhost:3000`.

> `3000` is the default port number, but you can change it to the value of the number you set in the `PORT` environmental variable in the previous step.

## Usage

Once the application is running, select a bot from the list provided. Each bot has different characteristics which ultimately determine the direction or style of the chat and the type of food available.

Upon selecting a bot, a table displaying the user's orders and a button to start a chat is revealed.

Click on the button, and a modal is displayed, containing a chat interface and a simple form to make your requests.

### Responses

There are two main types of responses users can get from this application:

-   Messages: This is the response returned for answers to simple questions, or for confirmation of placed orders.

-   Options: This response is returned when the user requests a list of items, such as available dishes or drinks. Users can choose an option either by selecting the number of the prefered option or clicking on it.

### Bill

A bill containing the list of dishes a user has ordered is constantly displayed and updated on the page. The user also has the option to check out their order or reset the chat and choose a different bot.

## Technologies Used and Creation Process

Here's a formatted way to add the technologies used in your chat application to a readme file:

## Tech Stack

This chat application is built using the following technologies:

### Frontend

-   HTML: Provides the structure and content of the user interface.
-   Bootstrap: A CSS framework for styling the user interface components and layout.
-   Javascript: Handles dynamic behavior of the frontend, including DOM manipulation and form submissions.

### Real-time Communication

-   Socket.IO: Enables real-time, two-way communication between the frontend and backend of the application for seamless chat functionality.

### Backend:

-   Javascript: Handles communication with the Gemini API, processes user messages and emits responses
-   Node.js: Javascript runtime environment that powers the server-side logic.
-   Express: A popular Node.js framework which was used to spin up the application server.

### AI Integration

-   Gemini API: Provides AI-generated replies for chatbot interactions.

## Notice Board

These are a list of features I plan to implement in the near future. But I won't mind it if anyone writes the code for it and makes a pull request :).

-   Login and Signup:
    -   Implement some form of authentication for users to accesss the application
-   Suggested Requests:
    -   Allow users to click on messages they can send instead of typing it out.
-   Chat Improvement:
    -   Add a spinner so the user knows their response is being handled.
    -   Couple of other changes to improve user chat experience
-   More Bot Options:
    -   There are currently only three bots, namely; American, French, and Nigerian
    -   These bots offer dishes from the respective countries
    -   Create new bots that include other diet types, countries, or restaurant type

## While You Are Here

Add a star to this project on GitHub
Visit my profile and reach out to me on social media.
Visit the [live site](https://foodgpt.onrender.com)
Create a new issue or add any suggestions
