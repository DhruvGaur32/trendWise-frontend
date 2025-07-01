# TrendWise Frontend

TrendWise is a modern web application that provides trending articles and insights powered by AI. The frontend is built with Next.js (App Router), TailwindCSS, and NextAuth.js for authentication.

## Features

- Responsive UI with TailwindCSS
- User authentication with Google OAuth and email/password
- Article listing with search and category filters
- Trending articles section
- Article detail pages with rich content and media

## Technologies Used

- Next.js 14+ (App Router)
- React 18
- TailwindCSS with Typography plugin
- NextAuth.js for authentication
- Lucide-react icons

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn

### Installation

1. **Clone the repository**
    ```
    git clone <frontend-repo-url>
    cd trendwise-frontend
    ```
2. **Install dependencies**
    ```
    npm install
    ```
3. **Create a `.env.local` file in the root with the following variables:**
    ```
    NEXTAUTH_URL=http://localhost:3000
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    NEXTAUTH_SECRET=your_nextauth_secret
    ```
4. **Run the development server**
    ```
    npm run dev
    ```
5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Project Structure

- `app/` - Next.js app directory with pages and components
- `components/` - Reusable React components
- `lib/` - Utility functions like database connection
- `public/` - Static assets

## Authentication

Uses NextAuth.js with Google OAuth and Credentials provider for email/password.

## Deployment

Deployed on Vercel
