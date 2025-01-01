# MentaEase API Documentation For AI

## 1. GroqAPI

**Endpoint:** `/groq`

### Description

GroqAPI is an endpoint that enables an AI chatbot that acts as a psychologist, providing advice on psychological matters in either Indonesian or English. The AI's personality is friendly, professional, and engaging.

### Endpoint Details

- **URL**: `/groq`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body** (JSON):
  - `prompt` (string): The prompt or question for the AI to respond to.
  - `sessionId` (string): Unique identifier for the session to maintain conversation context.
  - `language` (string): Either `id` (Indonesian) or `en` (English).

### Example Request

```json
POST /groq
{
  "prompt": "Apa itu kecemasan berlebih?",
  "sessionId": "123e4567-e89b-12d3-a456-426614174000",
  "language": "id"
}
```

### Example Response

```json
{
    "response": "Halo! Kecemasan berlebih atau anxiety disorder adalah sebuah kondisi kesehatan mental di mana seseorang mengalami rasa cemas, khawatir, atau takut yang berlebihan dan tidak proporsional terhadap suatu hal atau situasi. Rasa cemas ini dapat timbul dalam berbagai bentuk, seperti kecemasan akan masa depan, kecemasan sosial, atau kecemasan akan sesuatu yang belum pasti.\n\nPada orang yang mengalami kecemasan berlebih, rasa cemas ini dapat timbul secara tidak terkendali dan mengganggu aktivitas sehari-hari. Misalnya, seseorang yang mengalami kecemasan berlebih mungkin akan selalu merasa khawatir akan sesuatu, seperti khawatir akan gagal dalam pekerjaan, khawatir akan sakit, atau khawatir akan pertemuan sosial.\n\nKecemasan berlebih dapat membuat seseorang merasa sangat gelisah, khawatir, dan sulit tidur. Dalam beberapa kasus, kecemasan berlebih juga dapat memicu serangan panik, yang membuat seseorang merasa seperti hendak mati atau kehilangan kendali.\n\nNamun, kamu tidak perlu khawatir! Kecemasan berlebih dapat diatasi dengan terapi dan pengobatan yang tepat. Sebagai psikolog, saya dapat membantu kamu mengidentifikasi penyebab kecemasan berlebih dan mengajarkan kamu teknik-teknik untuk mengatasinya. Jadi, kalau kamu mengalami kecemasan berlebih, jangan ragu-ragu untuk mencari bantuan, ya!"
}
```

### Error Responses

- `400 Bad Request`: Prompt, sessionId, and language are required.
- `500 Internal Server Error`: Error connecting to Groq API.

# Example Code for Interacting with All API Endpoints

```javascript
async function fetchGroqAPI() {
  const response = await fetch('/groq', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: 'Apa itu kecemasan berlebih?',
      sessionId: '123e4567-e89b-12d3-a456-426614174000',
      language: 'id',
    }),
  });

  const data = await response.json();
  console.log(data);
}

fetchGroqAPI();
```
