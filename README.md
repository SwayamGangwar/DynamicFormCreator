# 🧩 Dynamic Form Creator

A powerful and flexible **Dynamic Form Creator** built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. This tool allows you to render dynamic forms from a JSON schema, supports nested card-based forms, real-time validation, file uploads, and more — all in a beautiful, responsive UI.

---

## ✨ Features

### ✅ Dynamic Rendering
- Generate forms dynamically from JSON configuration.
- Easily extendable and customizable.

### ⚙️ Real-time Validation
- Built-in support for regex, required fields, min/max constraints.
- Provides instant feedback as users fill out the form.

### 🧾 Multiple Field Types Supported
Supports **13+ field types**:
- `text`, `email`, `number`, `password`
- `date`, `select`, `multiselect`
- `typeahead`, `file`, `card (nested)`
- `textarea`, `checkbox`, `button`

### 🗂 Nested Forms (Cards)
- Recursively render sub-forms inside cards.
- Great for complex form structures or conditional logic.

### 📂 File Uploads
- Customizable endpoints and headers.
- Support for multiple file types.

### 💻 Type Safety
- Fully written in **TypeScript** for better reliability and developer experience.

### 🌐 Responsive Design
- Clean, accessible, and modern UI using **Tailwind CSS** and **shadcn-ui**.

## 🚀 Getting Started

### 🔧 Prerequisites

- [Node.js and npm](https://github.com/nvm-sh/nvm#installing-and-updating) (Use **nvm** for easy management)
- Any preferred IDE (VS Code recommended)

### 🖥️ Local Development Setup

# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev

The app will be available at http://localhost:5173 (default Vite port).

🌐 Run on GitHub Codespaces
Go to your GitHub repository.

Click the green Code button.

Select the Codespaces tab.

Click New Codespace to launch the environment.

Start editing and pushing changes directly.

🛠 Technologies Used
Tech Stack	Description
React	UI library for building components
Vite	Lightning-fast bundler & dev server
TypeScript	Typed superset of JavaScript
Tailwind CSS	Utility-first CSS for styling
shadcn/ui	Beautiful, accessible UI components

📂 Project Structure (Simplified)
css
Copy
Edit
📦 project-root/
├── 📁 src/
│   ├── 📁 components/         # All form-related components
│   ├── 📁 utils/              # Helpers (validation, JSON parsing)
│   ├── 📄 App.tsx            # Main App Component
│   └── 📄 main.tsx           # Entry point
├── 📄 index.html
├── 📄 vite.config.ts
└── 📄 tailwind.config.ts

🧪 Form Demos
Basic Form: Simple fields like text, email, number.

Select Form: Dropdowns and multi-select functionality.

Complex Form: All field types with nested cards and file uploads.

Each form is automatically rendered from a JSON configuration and responds instantly to user input.

💡 Customization
You can modify the JSON schema to:

Add/remove fields

Nest forms inside cards

Change validation rules

Customize upload headers or endpoints

🛠 Future Improvements (Optional Ideas)
Theme switcher (light/dark mode)

Drag-and-drop form builder

Conditional visibility based on field values

JSON schema validation with AJV or Zod

📬 Contact / Contribute
Pull Requests are welcome 🚀

For issues or feature requests, open a GitHub Issue
