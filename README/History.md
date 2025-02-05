# MentaEase API Documentation For History

## Contents

1. [SaveHistory API](#1-savehistory-api)
2. [ShowHistory API](#2-showhistory-api)
3. [ShowHistory detail API](#3-showhistory-detail-api)

## 1. SaveHistory API

**Endpoint:** `/history/save`

### Description

This API is used to save the conversation history for a user. The conversation history will be stored in the HistoryAI bucket on Supabase in JSON format. Each conversation is saved with a file name based on the user’s `email` and `sessionId`.

### Endpoint Details

- **URL**: `/history/save`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body** (JSON):
  - `email` (string): The authenticated email of the user.
  - `sessionId` (string): A unique session ID for each conversation.
  - `messages` (array): A list of messages in the conversation, each message has the following format:

### Example Request

```json
POST /history/save
{
  "email": "riski@example.com",
  "sessionId": "123e4567-e89b-12d3-a456-426614174000",
  "messages": [
    {
      "role": "user",
      "content": "I am Riski"
    },
    {
      "role": "assistant",
      "content": "Hello Riski! It's great to meet you here. What would you like to discuss about psychology or any issue you are facing? I'm here to listen and help."
    }
  ]
}

```

### Example Response

```json
{
  "message": "History saved successfully",
  "filePath": "riski@example.com/123e4567-e89b-12d3-a456-426614174000.json"
}

```

### Error Responses

- `400 Bad Request`: Missing `email`, `sessionId`, or `messages`.
- `500 Internal Server Error`: Error while saving history.

## 2. ShowHistory API

**Endpoint:** `/history/list/:email`

### Description

This API is used to retrieve a list of the user's conversation histories based on the email. The conversation list only includes the session ID and the header of the conversation.

### Endpoint Details

- **URL**: `/history/list/:email`
- **Method**: `GET`
- **Path Parameter**:
  - `email` (string): The email of the user to retrieve the conversation history.
- **Response (JSON)**:
  - `history` (array): A list of history objects, each object has the following format:
    - `sessionId` (string): The unique session ID for the conversation.
    - `header` (string): The header or summary of the conversation (usually the first two words from the user's message).
### Example Request

```json
GET /history/list/riski@example.com
```

### Example Response

```json
{
    "history": [
        {
            "sessionId": "6b8b2ba2-8598-470e-b983-822120bf3120",
            "header": "kamu siapa?"
        },
        {
            "sessionId": "87779da6-e1dc-4497-a01a-fc8a2dd325dc",
            "header": "aku riski"
        },
        {
            "sessionId": "b217aca6-e322-4a0f-92d8-979063d8e2e9",
            "header": "halo"
        }
    ]
}
```

### Error Responses

- `400 Bad Request`: Missing `email`.
- `500 Internal Server Error`: Error while fetching history list.

## 3. ShowHistory detail API

**Endpoint:** `/history/detail/:email/:sessionId`

### Description

This API is used to retrieve the detailed conversation history based on the user's `email` and `sessionId`. The details of the conversation are returned as the messages.

### Endpoint Details

- **URL**: `/history/detail/:email/:sessionId`
- **Method**: `GET`
- **Path Parameter**:
  - `email` (string): The email of the user to retrieve the conversation history.
  - `sessionId` (string): The session ID of the conversation to view its details.
- **Response** (JSON):
  - `messages` (array): A list of the messages in the conversation, each message has the following format:
    - `role` (string): The role of the message sender (user or assistant).
    - `content` (string): The content of the message.

### Example Request

```json
GET /history/detail/riski@example.com/6b8b2ba2-8598-470e-b983-822120bf3120
```

### Example Response

```json
{
    "messages": [
        {
            "header": "hai",
            "messages": [
                {
                    "role": "user",
                    "content": "hai"
                },
                {
                    "role": "assistant",
                    "content": "Hai juga! Saya AiThor, psikolog profesional yang siap membantu menjawab pertanyaan-pertanyaan Anda tentang psikologi. Ada topik tertentu yang ingin Anda diskusikan atau hanya ingin ngobrol santai tentang kesehatan mental?"
                }
            ]
        },
        {
            "messages": [
                {
                    "role": "user",
                    "content": "kamu siapa?"
                },
                {
                    "role": "assistant",
                    "content": "Saya AiThor, seorang psikolog profesional yang lulusan Universitas Muhammadiyah Malang. Saya berfokus pada membantu orang-orang memahami dan mengatasi masalah kesehatan mental serta mengembangkan diri mereka menjadi lebih baik. Saya di sini untuk membantu menjawab pertanyaan-pertanyaan Anda tentang psikologi, terapi, dan pengembangan diri dengan gaya bahasa yang santai dan mudah dipahami."
                }
            ]
        }
    ]
}
```

### Error Responses

- `400 Bad Request`: Missing `email` or `sessionId`.
- `500 Internal Server Error`: Error while fetching the conversation details.


# Example Code for Interacting with All API Endpoints

## 1. Saving Conversation History
```javascript
async function saveChatHistory(email, sessionId, messages) {
  if (!email || !sessionId) return;

  try {
    const response = await fetch('/history/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        sessionId: sessionId,
        messages: messages,
      }),
    });

    const data = await response.json();
    console.log('History saved successfully:', data);
  } catch (error) {
    console.error('Failed to save history:', error);
  }
}

// Example usage:
const email = 'user@example.com';
const sessionId = '123e4567-e89b-12d3-a456-426614174000';
const messages = [
  { role: 'user', content: 'Hello' },
  { role: 'assistant', content: 'Hi there! How can I help you today?' },
];

saveChatHistory(email, sessionId, messages);
```

##2. Fetching Conversation History List
```javascript
async function fetchHistoryList(email) {
  try {
    const response = await fetch(`/history/list/${email}`);
    const data = await response.json();
    console.log('Conversation History List:', data.history);
    return data.history;
  } catch (error) {
    console.error('Failed to fetch history list:', error);
  }
}

// Example usage:
const email = 'user@example.com';
fetchHistoryList(email);
```

## 3. Fetching Detailed Conversation History
```javascript
async function fetchHistoryDetail(email, sessionId) {
  try {
    const response = await fetch(`/history/detail/${email}/${sessionId}`);
    const data = await response.json();
    console.log('Conversation Details:', data.messages);
    return data.messages;
  } catch (error) {
    console.error('Failed to fetch conversation details:', error);
  }
}

// Example usage:
const email = 'user@example.com';
const sessionId = '123e4567-e89b-12d3-a456-426614174000';
fetchHistoryDetail(email, sessionId);
```