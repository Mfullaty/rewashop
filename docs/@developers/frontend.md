# Frontend & Assets

Active eCommerce CMS uses a mix of server-side rendered Blade templates and client-side Vue.js components to deliver its user interface.

## Technology Stack

*   **Blade Templating**: Used for the majority of the admin panel and public-facing pages, allowing fast initial page loads and SEO-friendly content.
*   **Vue.js (v2)**: Used for interactive components where reactivity is crucial (e.g., dynamic checkout flows, real-time cart updates, complex forms).
*   **Bootstrap (v4)**: The core CSS framework providing the responsive grid and standard UI components.
*   **jQuery**: Used primarily for initializing legacy plugins and handling some DOM manipulations.
*   **Laravel Mix (v2)**: A wrapper around Webpack used to compile and minify CSS and JavaScript assets.

## Directory Structure

*   **`resources/views/`**: Contains all the `.blade.php` files. These are often organized into subdirectories like `backend/` (Admin panel), `frontend/` (Public store), and `seller/` (Seller dashboard).
*   **`resources/js/`**: Contains the Vue components and the main `app.js` entry point.
*   **`resources/sass/`** or **`resources/css/`**: Contains the raw SCSS/CSS files before compilation.
*   **`public/assets/`**: The destination directory for compiled assets (`app.css`, `app.js`), images, and third-party libraries.

## Working with Assets

The asset compilation is defined in the `webpack.mix.js` file located in the root directory.

### Compiling Assets

To compile the assets during development, run:
```bash
npm run dev
```

If you want Laravel Mix to watch for file changes and compile automatically, use:
```bash
npm run watch
```

For production deployment, you must run the production build to minify the files and strip out development tools:
```bash
npm run build
```

### Adding New Vue Components

1.  Create your new Vue component in `resources/js/components/` (e.g., `MyComponent.vue`).
2.  Register the component in `resources/js/app.js`:
    ```javascript
    Vue.component('my-component', require('./components/MyComponent.vue').default);
    ```
3.  Use the component in a Blade file:
    ```html
    <div id="app">
        <my-component></my-component>
    </div>
    ```
4.  Run `npm run dev` to compile the changes.

## Best Practices

*   **Avoid Inline Scripts**: Try to keep JavaScript logic inside Vue components or dedicated `.js` files rather than inline within Blade templates.
*   **Cache Busting**: Laravel Mix is configured to append a unique hash to compiled filenames to prevent browser caching issues after updates. Use the `mix()` helper in Blade to reference these files: `<link rel="stylesheet" href="{{ mix('css/app.css') }}">`.
