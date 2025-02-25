# Cake App 🎂

Welcome to the **Cake App**, a delightful web application built with **Nuxt.js**! This app is designed to showcase a variety of cakes, provide recipes, and allow users to add comments and rate the cakes.

The app is a simple CRUD application which perfoms the following requests :
● GET /cakes   - shows list of all the cakes (name and image) on the Home button
● GET /cakes/{id} - clicking on the image takes you to a single cake image, with comments, yum factor and other data being displayed
● POST /cakes - Submit a cake button allows you to add a new cake using a form. The url is any url from the internet of a jpeg or png file. 
● PUT /cakes/{id}  - use the Update button to update existing cake data. 
● DELETE /cakes/{id} - use the delete button on Home page to delete any cake. 

The data is written and read from a file as you submit, update or delete a cake. 
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

