# Harmony Documentation Website

This is the documentation website for Harmony, a terminal-based application. The website is built with Next.js and shadcn/ui, and features an interactive terminal on the homepage.

## Features

- Modern UI with shadcn/ui components
- Interactive terminal demo using xterm.js
- Comprehensive documentation
- Responsive design
- GitHub Pages deployment

## Development

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/harmony-docs.git
   cd harmony-docs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

To build the website for production:

```bash
npm run build
```

The static output will be generated in the `out` directory.

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment is handled by a GitHub Actions workflow.

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: React components
  - `ui`: shadcn/ui components
  - `terminal.tsx`: Interactive terminal component
- `public`: Static assets
- `.github/workflows`: GitHub Actions workflows for deployment

## License

MIT
