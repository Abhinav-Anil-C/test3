## 🍕 EatsExpress - Food Ordering Platform

EatsExpress is a user-friendly and responsive food ordering platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Customers can browse menus, place orders, manage favorites, and view digital receipts. The platform also includes an Admin Panel for efficient order management and menu updates.

### 📑 Table of Contents
###### Features
###### Tech Stack
###### Deployment Instructions
###### Screenshots
###### License
###### Additional Information
### 🚀 Features
For Users:
###### • User Authentication: Secure registration and login with session management.
###### • Add to Cart: Easily add food items, modify quantities, and view the total cost.
###### • Mark as Favorites: Save your favorite dishes for quick access in future visits.
###### • Digital Receipt: Receive a receipt summarizing your purchases after order completion.
###### • Responsive Design: Optimized for both mobile and desktop experiences.
###### • Recently Added Items: Highlighted section on the homepage showcasing new menu items.
### For Admins:
###### • Admin Panel: Exclusive access to manage orders, update menu items, and monitor user activity.
###### • Order Management: Admins can view, update, and track incoming orders.
###### • Item Management: Admins can add, edit, or delete food items from the menu.
###### • User Activity Monitoring: View and manage user profiles and interactions from the dashboard.
## 💻 Tech Stack
### Backend:

###### Node.js
###### Express.js
###### MongoDB (Database)
### Frontend:

###### React.js
###### Redux.js (State Management)
###### Tailwind CSS (Styling)
### Admin Panel:

###### React.js
###### Redux.js (State Management)
###### Tailwind CSS (Styling)
## ⚙️ Deployment Instructions
### 1. Ensure MongoDB is Running
###### Make sure MongoDB is installed and running on your local system. Alternatively, use a cloud-based MongoDB service like MongoDB Atlas.

### 2. Configure Environment Variables
###### Create a .env file in the root directory of the project (if not already present). Add your MongoDB connection string and other environment variables.

```bash
URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
PORT=your_preferred_port_number
```
Example:

```bash
MONGO_URI=mongodb://localhost:27017/eatsExpress
SECRET_KEY=supersecretkey
PORT=5000
```
### 3. Clone the Repository and Update Frontend
###### 	After cloning, navigate to the folder for branch2.2 and copy all files to the frontend folder of branch2. Ensure that you have all the necessary frontend files in place.

```bash
Copy code
git clone https://github.com/yourusername/eatsExpress.git
cd eatsExpress
```
4. Install Backend Dependencies
Navigate to the backend directory and install dependencies:

bash
Copy code
cd backend
npm install
5. Start the Backend Server
Launch the backend server:

bash
Copy code
npm start
The backend will now be accessible at http://localhost:5000 (or your specified port).

### 6. Install Frontend Dependencies
###### Navigate to the frontend directory and install dependencies:

```bash
Copy code
cd frontend
npm install
```
### 7. Start the Frontend Server
###### Launch the frontend server:

```bash
Copy code
npm start
The frontend will now be accessible at http://localhost:3000.
```

### 8. Access the Application
###### Once both the backend and frontend servers are running, open your browser and go to http://localhost:3000 to access EatsExpress.

## 📸 Screenshots
Here’s a glimpse of what the application looks like:

Home Page:
![homepagess](https://github.com/user-attachments/assets/8cd20f57-f7e2-479d-bfc9-09593ba9fafe)

All Food Items:
![allitemsss](https://github.com/user-attachments/assets/515df098-a23c-475c-945c-6479dff32778)

Shopping Cart:
![cartss](https://github.com/user-attachments/assets/acfaab10-1240-4719-8210-35e6019e8ab7)

User Profile:
![userprofiless](https://github.com/user-attachments/assets/eb58e080-2220-4912-9ece-fe02a8ebf437)

Admin Profile:
![adminprofile](https://github.com/user-attachments/assets/b07e8d61-8e98-4c63-9e14-637a55168264)


## 📝 Additional Information
###### Session Management: Secure user authentication with cookie-based session management.
###### Security: The platform uses modern encryption standards for storing sensitive information like passwords.
###### Mobile Optimization: Designed to be fully responsive, providing a seamless experience on all device sizes.


##### With EatsExpress, you can enjoy a seamless and responsive food ordering experience. The project is designed for easy navigation, user management, and efficient admin control. Thank you for checking out the project, and we look forward to your contributions!
