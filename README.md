# Inprocode Project

## 📄 Description

This application utilizes several key plugins commonly required in real-world projects. The main goal of this sprint was to familiarize with tools and technologies that many future clients often require, with a focus on integrating these plugins with a backend API for data storage and manipulation.

This project involves the creation of a web application that includes features like a **map** for displaying locations, a **calendar** for managing events, and **charts** for visualizing data. It also provides a CRUD functionality to interact with a backend system.

The backend API is built using **MySQL**, while the frontend is developed using **Angular**. The application interacts with the backend API to manage the data, such as adding, updating, and deleting events or locations.


## 📜 Features

- **CRUD functionality** for managing user data and events.
- **Map integration** to display and interact with locations, utilizing *Leaflet* plugin.
- **Calendar** to display and manage events, with CRUD operations in *FullCalendar* plugin.
- **Charts** for visual data representation in *Chart.js* plugin.
- **API (Node.js)** to interact with MySQL to store data.

## 💻 Technologies

- [**Angular CLI**](https://angular.dev/) version 18.2.5.
- [**Bootstrap**](https://getbootstrap.com/) version 5.3.3.
- **HTML5** for the structure of the pages.
- **SCSS** for styling.
- **TypeScript** for strong-typed JavaScript programming.
- **Node.js** for backend development.
- **Express.js** for API routing and handling.
- **MySQL** as the database for storing data.


## 📋 Requirements

Before you begin, ensure that you have the following installed:

- **Node.js** and **npm**: You can download them from [nodejs.org](https://nodejs.org/).
- **Angular CLI**: Install it globally using the following command:

```bash
npm install -g @angular/cli
```
- **XAMPP** or a similar local server for running *MySQL* and *Apache*. You can download XAMPP from [apachefriends.org](apachefriends.org).


## 🛠️ Instructions

**✔️ Step 1:** Clone the repository:

```bash
git clone https://github.com/mmartincasas/Sprint-8
```

**✔️ Step 2:** Navigate to the backend directory and install the npm dependencies:

```bash
cd backend
npm install
```

**✔️ Step 3:** Download the MySQL database (SQL file) named **Inprocode** and provided in the repository. Import it into your MySQL instance. If using XAMPP, make sure the MySQL server is running:
- Start *Apache* and *MySQL* from the XAMPP control panel.
- Import the provided SQL file into your MySQL database via PhpMyAdmin or the MySQL command line.

**✔️ Step 4:** Open new terminal, navigate to the frontend directory and install the npm dependencies:

```bash
cd frontend
npm install
```

## ⚙️ Development server

**✔️ Backend:** Navigate to the backend directory and start MySQL Server:

```bash
npm run dev
```
This will start the Node.js backend API and connect it to your MySQL database. Make sure your MySQL server is running.


**✔️ Frontend:** In a different terminal navigate to the frontend directory and run:

```bash
ng serve
```
Open the browser and go to http://localhost:4200/. The application will reload automatically whenever you modify any source files.



