# NotesApp

A full-stack notes application built with a Node.js backend and a React frontend. This app allows users to create, read, update, and delete notes with rate limiting and a clean, responsive UI.

## Backend

The backend is built using Node.js and Express.js, providing RESTful APIs for note management. It includes middleware for rate limiting to prevent abuse and uses Upstash for Redis-based caching and rate limiting.

### Tech Stack
- **Node.js**: Runtime environment
- **Express.js**: Web framework for APIs
- **MongoDB**: Database for storing notes
- **Upstash**: Redis service for rate limiting and caching
- **Other dependencies**: As listed in `backend/package.json`

### Features
- CRUD operations for notes
- Rate limiting to control API usage
- Database connection and configuration

### Setup
1. Navigate to the `backend` directory.
2. Install dependencies: `npm install`
3. Create a `.env` file with necessary environment variables (see Environment Variables section below).
4. Start the server: `npm run dev` or `node src/server.js`

## Frontend

The frontend is a React application built with Vite for fast development. It uses Tailwind CSS for styling and DaisyUI for pre-built UI components, providing a modern and responsive design.

### Tech Stack
- **React**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library built on Tailwind CSS
- **Axios**: For API calls
- **Other dependencies**: As listed in `frontend/package.json`

### Features
- Responsive UI with DaisyUI components
- Note creation, editing, and deletion
- Integration with backend APIs
- Error handling for rate limits and missing notes

### Setup
1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`
3. Create a `.env` file if needed for API endpoints or other configs (see Environment Variables section below).
4. Start the dev server: `npm run dev`

## Installation and Running the Full App

1. Clone the repository.
2. Set up the backend as described above.
3. Set up the frontend as described above.
4. Ensure the backend is running (typically on port 5000 or as configured).
5. Access the frontend in your browser (usually at `http://localhost:5173` for Vite).

## Environment Variables

Both backend and frontend may require `.env` files for configuration (e.g., database URLs, API keys, ports). Create these files in their respective directories and add the necessary variables. **Do not commit `.env` files to version control** to keep sensitive information secure.

### Obtaining API Keys and Tokens

To run the app locally, you'll need to set up accounts and obtain the following:

#### MongoDB
1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a new cluster (free tier is available).
3. In the cluster dashboard, click "Connect" and choose "Connect your application".
4. Copy the connection string (it will look like `mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>`).
5. Replace `<username>`, `<password>`, and `<database>` with your details.
6. Add this to your `backend/.env` as `MONGO_URI=your_connection_string_here`.

#### Upstash (Redis)
1. Sign up for a free account at [Upstash](https://upstash.com/).
2. Create a new Redis database.
3. In the database dashboard, copy the "REST URL" and "REST Token".
4. Add these to your `backend/.env` as:
   - `UPSTASH_REDIS_REST_URL=your_rest_url_here`
   - `UPSTASH_REDIS_REST_TOKEN=your_rest_token_here`

For the frontend, if you have any environment variables (e.g., for API base URLs), add them to `frontend/.env`. Check the code for specific requirements.

**Note**: You can create a `.env.example` file in each directory with placeholder values (e.g., `MONGO_URI=your_mongo_uri_here`) to show others what variables are needed without exposing secrets.

## Credits

This project was built following tutorials from [Burak/freeCodeCamp.org]. Special thanks for the guidance!

## Modifications from YouTube Tutorial

I added custom rate limiting logic and modified the loading screen. Additionally, I changed the look of the pages.Furthermore, I added in a feature to summarize any lengthy notes that may exist.