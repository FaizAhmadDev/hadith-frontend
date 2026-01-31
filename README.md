# 🕌 Hadith Explanation System

A modern web application for searching and understanding hadiths from Sahih al-Bukhari and Sahih Muslim.

## Features

- 🔍 **Semantic Search**: Find hadiths by meaning, not just keywords
- 🔢 **Number Search**: Direct lookup by hadith number (e.g., "Bukhari 1")
- 💡 **AI Explanations**: Understand hadith meanings with Qwen2.5-7B
- 📝 **Summaries**: Get concise summaries of hadiths
- 🌙 **Dark Green Theme**: Beautiful, easy-on-the-eyes design
- 📱 **Responsive**: Works on desktop and mobile

## Database

- **14,372 authentic hadiths**
- Sahih al-Bukhari: 7,250 hadiths
- Sahih Muslim: 7,122 hadiths

## Technology Stack

### Frontend
- Next.js 14
- React 18
- CSS Modules
- Axios

### Backend
- Python + Gradio
- Qwen2.5-7B-Instruct (HuggingFace)
- FAISS vector search
- Sentence Transformers

## Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=your_gradio_api_url
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open browser:**
```
http://localhost:3000
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy!

## Team

- [Your Name] - [Roll Number]
- [Team Member 2] - [Roll Number]
- [Team Member 3] - [Roll Number]
- [Team Member 4] - [Roll Number]

## Disclaimer

This is an educational tool. For religious rulings, always consult qualified Islamic scholars.

## License

Educational Project - NLP Course 2026