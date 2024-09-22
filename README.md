# Todo Application

A full-featured Todo application that allows users to manage their tasks with basic CRUD (Create, Read, Update, Delete) operations. It also includes advanced features like search filters and a Kanban board view to organize tasks.

## Features

- **Create Todos**: Add new tasks with a title, description, priority, and due date.
- **Read Todos**: View your list of todos in a simple list view or in a Kanban board format.
- **Update Todos**: Edit task details, such as the title, description, priority, and status.
- **Delete Todos**: Remove tasks that are no longer needed.
- **Search Filter**: Quickly filter tasks based on task titles or other relevant fields.
- **Kanban View**: Visualize your tasks in different columns based on their status (To Do, In Progress, Completed).

## Tech Stack

- **Frontend**:
  - React (Next.js)
  - TypeScript
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Mongoose for ORM)

- **Drag and Drop**: Integrated drag-and-drop functionality to move tasks between columns in Kanban view.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/gauravsingh94/TODO.git
cd todo-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file at the root of your project and add the following environment variables:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/test
JWT_SECRET=your_jwt_secret_key
BACKEND_URL=localhost:3000/api
```

### 4. Running the Application

To run the application locally:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 5. Build for Production
```bash
npm run build
npm run start
```


## Kanban View

The Kanban view organizes todos into three columns:
- **To Do**: Tasks that are yet to be started.
- **In Progress**: Tasks that are being worked on.
- **Completed**: Finished tasks.

Drag and drop tasks between columns to update their status.

## Search Filter

The search feature allows you to filter todos by entering keywords into the search bar. It will match the task title and description.
