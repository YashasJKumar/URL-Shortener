# URL Shortener

A simple URL shortener built using Node.js, Express, MongoDB, and JWT for authentication. This project allows users to shorten long URLs and track the number of clicks on each shortened URL.

![image](https://github.com/user-attachments/assets/fafc745b-6745-4d1f-862c-14e4e494c9af)


## Features

- **URL Shortening**: Convert long URLs into shorter, more manageable links.
- **Click Tracking**: Track the number of clicks on each shortened URL.
- **User Authentication**: Secure user authentication using JWT (JSON Web Tokens).
- **Dashboard**: View all shortened URLs created by you along with their redirect URLs and click counts.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database used to store URLs and user information.
- **JWT (JSON Web Tokens)**: Used for secure user authentication and authorization.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yashasjkumar/url-shortener.git
   ```
2. Navigate to the project directory:
   ```bash
   cd url-shortener
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Replace Collection Name in index.js file.

5. Start the server:
   ```bash
   npm start
   ```

## Usage

1. **Register/Login**: First, register a new user or login if you already have an account.
2. **Shorten a URL**: Enter the long URL you want to shorten.
3. **View Dashboard**: Check the dashboard to see all your shortened URLs, their redirect URLs, and the number of clicks.

## API Endpoints

- `POST /sign-up` - Register a new user.
- `POST /login` - Login an existing user.
- `POST /` - Shorten a URL.
- `GET /analytics/:shortUrl` - Get all shortened URLs for the logged-in user.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Thanks to the developers of Node.js, Express, MongoDB, and JWT for their amazing tools.
