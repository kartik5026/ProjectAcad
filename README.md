
# ProjectAcad Setup Instructions

## Step 1: Clone the Repository
Clone the Git repository into your local folder:

```bash
git clone https://github.com/kartik5026/ProjectAcad.git
```

## Step 2: Open the Folder(ProjectAcad) in Visual Studio Code
Navigate to the folder where you cloned and open it in Visual Studio Code.

---

### Running the Frontend

## Step 3: Open Terminal and Navigate to Frontend
- Open the terminal in Visual Studio Code using `Ctrl + Shift + ~`.
- Change the directory to the `frontend` folder:
  ```bash
  cd frontend
  ```

## Step 4: Install Node Modules
- Run the following command to install the required node modules:
  ```bash
  npm install
  ```

## Step 5: Run the Frontend
- After installation, start the frontend using:
  ```bash
  npm run dev
  ```

---

### Running the Backend

## Step 6: Open a New Terminal for Backend
- Open a new terminal using `Ctrl + Shift + ~`.
- Change the directory to the `backend` folder:
  ```bash
  cd backend
  ```

## Step 7: Run the Backend
- You can now start the backend server using one of the following commands:
  ```bash
  nodemon server.js
  ```
  Or:
  ```bash
  node server.js
  ```

## Step 8: Open the Frontend in Browser
- Open your browser and go to the following URL to access the frontend:
  ```
  http://localhost:3000
  ```

---

### Credentials

- **Username**: anything
- **Password**: admin // use admin as password otherwise it will not validate
- **Role**: By default, the role is set to "user". You can select a different role if needed.
