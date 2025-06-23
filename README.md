# isum.online

This project is a Vite-powered React TypeScript starter, designed to provide a solid foundation for building modern web applications with a focus on video content from YouTube.

## Key Features

*   **Vite:**  Fast development server and optimized production builds.
*   **React:**  A popular JavaScript library for building user interfaces.
*   **TypeScript:**  Adds static typing to JavaScript for improved code maintainability and developer experience.
*   **Tailwind CSS:**  A utility-first CSS framework for rapid UI development.
*   **Lucide React:** A beautiful set of open-source icons as React components
*   **YouTube API Integration:** Example usage with the YouTube API to fetch and display video content.
*   **Supabase Integration:** Includes setup for connecting to a Supabase database.
*   **Custom Cursor (Optional):**  A fun visual enhancement with a custom cursor implementation (disabled by default on mobile/touch devices).
*   **Security Focused:**  Includes security-related meta tags and server headers.
*   **Performance Optimized:**  Uses `terser` for minification, `esnext` target, and manual chunks for efficient code splitting.
*   **Eslint Configuration:** Pre configured with good settings.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install or pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the project root and add your Supabase URL and anonymous key:

    ```
    VITE_SUPABASE_URL=<your_supabase_url>
    VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
    YOUTUBE_API_KEY=<your_youtube_api_key>
    ```

    Get your Supabase URL and anonymous key from your Supabase project settings. Get your YouTube API key from Google Cloud. When deploying to Netlify, add these variables in the Netlify dashboard so they are available during the build.

4.  **Start the development server:**

    ```bash
    npm run dev  # or yarn dev or pnpm dev
    ```

    The application will be available at `http://localhost:5173` (or a similar address).

## Scripts

*   `dev`: Starts the Vite development server.
*   `build`: Builds the production-ready application.
*   `lint`: Runs ESLint to check for code quality issues.
*   `preview`: Starts a local server to preview the production build.

## Dependencies

*   `lucide-react`:  For using the Icons.
*   `react`:  Core UI Library.
*   `react-dom`: React library for the browser.

## Dev Dependencies

*   `@eslint/js`: JavaScript linter.
*   `@types/react`: TypeScript types for React.
*   `@types/react-dom`: TypeScript types for React DOM.
*   `@vitejs/plugin-react`: Vite plugin for React projects.
*   `autoprefixer`: Used by postcss.
*   `eslint`: Javascript linter.
*   `eslint-plugin-react-hooks`: ESLint plugin for enforcing React Hooks rules.
*   `eslint-plugin-react-refresh`: ESLint plugin for React Refresh.
*   `globals`:  Defines common global variables in JavaScript environments for ESLint.
*   `postcss`:  Tool for transforming CSS with JavaScript.
*   `tailwindcss`: Used for styling.
*   `terser`: JavaScript parser, mangler, and compressor toolkit for ES6+.
*   `typescript`: Programming language.
*   `typescript-eslint`: Collection of ESLint rules to check TypeScript code.
*   `vite`: Next generation frontend tooling.

## Configuration Files

*   `vite.config.ts`: Vite configuration file.  Defines plugins, optimization settings, and build options.  Includes settings to exclude `lucide-react` from dependency optimization, uses `terser` for minification, targets `esnext`, and sets up manual chunks for code splitting.
*   `index.js`: A basic Node.js file (demonstrates using Node.js).
*   `package.json`: Contains project metadata, dependencies, and scripts.
*   `tsconfig.json`: TypeScript configuration file.  References `tsconfig.app.json` and `tsconfig.node.json`.
*   `eslint.config.js`: ESLint configuration file. Defines linting rules.
*   `tsconfig.app.json`: TypeScript configuration file for the application.
*   `tsconfig.node.json`: TypeScript configuration file for Node.js.
*   `index.html`: The main HTML file for the application, including meta tags and preload links.
*   `tailwind.config.js`: Tailwind CSS configuration file.  Defines theme extensions, breakpoints, and plugins. Includes a `future` setting to enable `hoverOnlyWhenSupported`.
*   `postcss.config.js`: PostCSS configuration file.  Defines PostCSS plugins (Tailwind CSS and Autoprefixer).

## Security

The `index.html` file includes the following security headers:

*   `Content-Security-Policy`:  Defines the origins from which resources can be loaded.
*   `X-Content-Type-Options`:  Prevents MIME-sniffing vulnerabilities.
*   `X-Frame-Options`:  Protects against clickjacking attacks.
*   `X-XSS-Protection`:  Enables cross-site scripting (XSS) filtering.
*   `Referrer-Policy`:  Controls how much referrer information is sent with requests.
*   `Permissions-Policy`:  Controls browser features that can be used.

## Credits

*   This project is built using Vite, React, TypeScript, and Tailwind CSS.
*   The YouTube API integration demonstrates fetching and displaying video data.

