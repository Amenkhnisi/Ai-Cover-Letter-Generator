# AI Cover Letter + Resume bullets Generator

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

An intelligent web application that leverages Google Gemini AI to generate personalized, professional cover letters tailored to specific job postings and your qualifications.

## 🌐 Live Demo

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render

Try the live application: [ Live Demo URL ](https://ai-cover-letter-generator-peach.vercel.app/)

## 🌟 Features

- **AI-Powered Generation**: Utilizes advanced language models to create compelling, personalized cover letters
- **Job Posting Analysis**: Automatically extracts key requirements and responsibilities from job descriptions
- **Resume Integration**: Matches your skills and experience with job requirements
- **Customizable Output**: Generates professional cover letters that can be further customized
- **User-Friendly Interface**: Simple and intuitive design for seamless user experience
- **Time-Saving**: Reduces cover letter writing time from hours to minutes

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm (for frontend)
- Python 3.8+ (for backend)
- Docker and Docker Compose (for containerized deployment)
- Google Gemini API key

### Installation

#### Option 1: Docker Deployment (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/Amenkhnisi/Ai-Cover-Letter-Generator.git
cd Ai-Cover-Letter-Generator
```

2. Set up environment variables:
```bash
# Create .env file in the backend directory
cd backend
cp .env.example .env
# Edit .env file with your Gemini API key
```

3. Run with Docker Compose:
```bash
cd ..
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000

#### Option 2: Manual Setup

**Frontend Setup:**
```bash
cd frontend
npm install
npm run dev
```

**Backend Setup:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## 💡 Usage

1. **Input Your Information**: Provide your resume details, skills, and experience
2. **Add Job Details**: Paste the job description or provide the job posting URL
3. **Generate**: Click the generate button to create your cover letter
4. **Review and Edit**: Review the generated cover letter and make any necessary adjustments
5. **Download**: Save your personalized cover letter in your preferred format



## 🔧 Configuration

Configure the backend by editing the `.env` file in the backend directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=8000
CORS_ORIGINS=http://localhost:5173
```



## 🛠️ Technologies Used

### Frontend
- **React**: UI library for building the user interface
- **Vite**: Next-generation frontend build tool
- **Tailwind CSS**: Utility-first CSS framework for styling

### Backend
- **FastAPI**: Modern, fast Python web framework
- **Google Gemini AI**: AI model for generating cover letters

### DevOps
- **Docker**: Containerization with docker-compose for easy deployment
- **Vercel**: Frontend deployment platform
- **Render**: Backend deployment platform

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Amenkhnisi**

- GitHub: [@Amenkhnisi](https://github.com/Amenkhnisi)

## 🙏 Acknowledgments

- Google Gemini AI for providing powerful language model capabilities
- Vercel and Render for reliable hosting platforms
- The open-source community for inspiration and tools
- All contributors who help improve this project

## 📧 Contact

For questions, suggestions, or issues, please open an issue on GitHub or contact the maintainer.

## 🔮 Future Enhancements

- [ ] Multiple language support
- [ ] Template library for different industries
- [ ] Batch processing for multiple applications
- [ ] Chrome extension for quick generation
- [ ] Integration with LinkedIn and job boards
- [ ] PDF export with professional formatting
- [ ] A/B testing different cover letter styles

## ⚠️ Disclaimer

This tool is designed to assist in creating cover letters, but generated content should always be reviewed and personalized before submission. AI-generated content should be used as a starting point and refined to reflect your unique voice and experiences.

---

**Star ⭐ this repository if you find it helpful!**
