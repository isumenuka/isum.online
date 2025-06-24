# isum.online

![Project Logo](public/logo.png)

## Table of Contents
- [Overview](#overview)
- [Quickstart](#quickstart)
- [Styling](#styling)
- [Features](#features)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## 🚀 Overview
This project is a Vite-powered React TypeScript starter focused on YouTube video content. It leverages Supabase for data management and includes modern UI components built with Tailwind CSS.

## ⚡ Quickstart
1. **Clone the repository**
```bash
git clone <repository_url>
cd <project_directory>
```
2. **Install dependencies**
```bash
npm install
```
3. **Configure environment variables**
Create `.env` in the project root and add your Supabase and YouTube API keys:
```bash
VITE_SUPABASE_URL=<your_supabase_url>
VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
VITE_YOUTUBE_API_KEY=<your_youtube_api_key>
```
4. **Run the development server**
```bash
npm run dev
```

## 🎨 Styling
This project is **dark theme only** and features modern animations with glassmorphism-inspired elements. No light mode is provided.

## ✨ Features
- ⚡ **Vite** for fast development and optimized builds
- ⚛️ **React** with **TypeScript** for robust component architecture
- 💨 **Tailwind CSS** for utility-first styling
- 📺 **YouTube API** integration
- 🛠️ **Supabase** for database and auth
- 🖱️ Optional custom cursor
- 🔒 Security-focused headers and optimized production settings

## 🗂️ Project Structure
```
public/          Static assets and icons
src/             Application source code
 ├─ components/  Reusable React components
 ├─ hooks/       Custom hooks
 ├─ styles/      Global and component styles
 ├─ lib/         Utility libraries (Supabase client)
 └─ data/        Local data files
index.html       HTML template
vite.config.ts   Vite configuration
```

## 🗺️ Roadmap
- [ ] Complete initial design polish
- [ ] Add more example videos
- [ ] Improve accessibility
- [ ] Provide deployment scripts

## 🤝 Contribution Guidelines
Contributions are welcome! Please fork the repository and create a pull request. Ensure code passes linting with:
```bash
npm run lint
```

## 📄 License
This project is licensed under the MIT License.

## 🙏 Acknowledgements
Thanks to all open-source libraries used in this project, including Vite, React, Tailwind CSS, and Supabase.
