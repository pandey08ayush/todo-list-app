To-Do List Application:
This is a simple To-Do List app built with React that allows users to manage their tasks by adding, editing, and deleting them. The app interacts with a mock API to fetch, add, and remove tasks. It is fully responsive and easy to use.
Bascially it follows the context Api and axios feautres..

Features:
View Tasks: Displays a list of tasks fetched from an API.
Add Task: Users can add new tasks with a title and description.
Edit Task: Users can edit the title or description of an existing task.
Delete Task: Users can delete tasks from the list.
Task Completion: Users can mark tasks as completed.
Loading State: Displays a loading indicator while fetching data.
Error Handling: Displays error messages if there’s an issue fetching or modifying tasks.
Responsive Design: The app adapts to different screen sizes (mobile, tablet, desktop).


Tech Stack:
React: A JavaScript library for building user interfaces.
React Router: For routing and page navigation.
Axios: HTTP client for making requests to fetch and manage tasks.
CSS: For styling the components.
Jest & React Testing Library: For unit and integration testing.

Installation:
git clone https://github.com/pandey08ayush/todo-list-app.git
cd todo-list-app
npm install
npm start

Usage:
View Tasks: The homepage will display a list of tasks fetched from the API.
Add a Task: Fill out the form to add a task with a title and description.
Edit a Task: Click on any task to update its title or description.
Delete a Task: Delete tasks by clicking the "Delete" button next to them.
Mark Task as Completed: Mark tasks as completed by clicking the checkbox next to the task

Testing:
The app includes unit and integration tests to verify its functionality. We use Jest and React Testing Library for testing.
Install testing dependencies:npm install --save-dev @testing-library/react @testing-library/jest-dom jest
npm test

Performance Improvements:
Lazy Loading: Implement lazy loading for components to improve initial loading time.
State Management: Consider using React Context API or Redux for better state management as the app grows.
Optimize API Calls: Reduce redundant API calls and use caching strategies.
Testing of Code is also not so good it also have some problem and does not used redux for mangemnet 


Limitations:
Testing coverage could be improved.
Currently uses Context API instead of Redux.

