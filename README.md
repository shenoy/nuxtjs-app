# Cake App 🎂

Welcome to the **Cake App**, a delightful web application built with **Nuxt.js**! This app is designed to showcase a variety of cakes, provide recipes, and allow users to add comments and rate the cakes.

# Guide ✨
The app is a simple CRUD application that performs the following operations:

## Endpoints Overview 🌟
Method	Endpoint	Description
- **GET	/cakes**:	Displays a list of all cakes (name and image) on the Home page.
- **GET	/cakes/{id}**:	Clicking on a cake image shows detailed information (comments, yum factor, etc).
- **POST	/cakes**:	Use the Submit a Cake button to add a new cake via a form.
- **PUT	/cakes/{id}**:	Use the Update button to modify existing cake data.
- **DELETE	/cakes/{id}**:	Use the Delete button on the Home page to remove a cake.
  
## Features 🎉
- **Home Page:**: View all cakes with their names and images.

- **Cake Details:**: Click on any cake to see its full details, including comments and yum factor.

- **Add a Cake:**: Submit a new cake using a form. Provide a URL for the cake image (JPEG or PNG).

- **Update a Cake:**: Edit existing cake information.

- **Delete a Cake:**: Remove a cake from the list.

The data is written into and read from a file "cakes.ts" as you submit, update or delete a cake. 
---

## Features ✨

- **Cake Catalog**: Browse a wide range of cakes with beautiful images and descriptions.
- **Recipe Sharing**: Discover step-by-step recipes for baking your own cakes at home.
- **Responsive Design**: Enjoy a seamless experience on desktop, tablet, and mobile devices.
- **Easy Navigation**: Intuitive UI/UX for effortless exploration.
- **Dynamic Content**: Powered by Nuxt.js for fast and efficient rendering.

---

## Technologies Used 🛠️

- **Frontend Framework**: [Nuxt.js](https://nuxtjs.org/)
- **Backend Engine**: [Nitro](https://nitro.unjs.io/) (Nuxt's server engine)
- **Styling**: Tailwind CSS (or your preferred CSS framework)
- **Data Fetching**: Nuxt.js `fetch` method

## Installation 🚀

Follow these steps to set up the Cake App locally:

1. **Clone the repository**:
   git clone https://github.com/shenoy/nuxt-app.git
   cd nuxt-app
   
Install dependencies:
npm install

Run the development server:
npm run dev

Open your browser and visit:
http://localhost:3000

```

