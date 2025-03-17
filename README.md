# GenTest - Automated Unit Test Generator

GenTest is a web application that helps developers automatically generate unit tests for their code. Built with React, Tailwind CSS, and React Router, this application provides an intuitive interface for generating comprehensive test cases for various programming languages.


## Features

- **Multi-language Support**: Generate tests for Python, JavaScript, Java, C++, and C#
- **User Authentication**: Secure login system to manage user sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Code Editor**: Easy-to-use interface for entering and editing code
- **Real-time Test Generation**: Quickly generate test cases with a single click

## Project Structure

```
my-react-app/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CodeEditor.jsx   # Code editor component
│   │   ├── Layout.jsx       # Main layout component
│   │   └── Navbar.jsx       # Navigation bar component
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication context provider
│   ├── pages/               # Page components
│   │   ├── About.jsx        # About page
│   │   ├── Contact.jsx      # Contact page
│   │   ├── Home.jsx         # Home page with Spline background
│   │   ├── Login.jsx        # Login page
│   │   └── Pricing.jsx      # Pricing page
│   ├── services/
│   │   └── api.js           # API service functions
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
├── package.json             # Project dependencies
└── vite.config.js           # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gentest.git
   cd gentest
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Backend Integration

The application is designed to work with a FastAPI backend for test generation. By default, it's configured to connect to a local API at `http://localhost:8000/api`.

To connect to a different backend:

1. Update the `baseURL` in `src/services/api.js`:
   ```javascript
   const api = axios.create({
     baseURL: 'your-api-endpoint',
     headers: {
       'Content-Type': 'application/json',
     },
   });
   ```

## Deployment

To build the application for production:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Technologies Used

- **React**: Frontend library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Routing library for React
- **Axios**: Promise-based HTTP client
- **Headless UI**: Unstyled, accessible UI components
- **Spline**: 3D design tool for web
- **Vite**: Next-generation frontend tooling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Headless UI](https://headlessui.dev/)
- [Spline](https://spline.design/)
- [Hero Icons](https://heroicons.com/)
