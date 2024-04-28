## Install Enviroment
Install Node version 20+( this project built with Node 20.1.1 ).

Create library for project with: npm install.

``` bash
npm install
```
**How to use?**

Run the project with: npm start.

``` bash
npm start
```

1. **Get list of posts**: You can get the list of posts by targetting the url http://localhost:4000/posts with method GET.

1. **Create post**:You can create the post by targetting the url http://localhost:4000/posts with method POST.

1. **Edit post**:You can edit each post by targetting the url http://localhost:4000/posts/:id with method PUT.

1. **Delete post**:You can delete the post by targetting the url http://localhost:4000/posts/:id with method DELETE.

1. **Get list of posts filtered**:You can get the list of post which content was length 50 characters by targetting the url 
http://localhost:4000/posts/filterByContent with method GET.

## Problem 6

### Database Structure:
1. **Users Table**: Stores user information including name, email, password, and score.
2. **Tasks Table**: Stores information about tasks including title, description, score, status (completed/incomplete), and task assignment time.
3. **UserTasks Table**: Links users with the tasks they have received and completed.

### Admin Functions:
1. **User Management**: Add, delete, edit user information.
2. **Task Management**: Create, edit, delete tasks and assign them to users.
3. **View Scoreboard**: View the total scores of all users.

### User Functions:
1. **View Tasks**: View a list of tasks sent from the admin.
2. **Receive and Complete Tasks**: Receive tasks from the admin and then complete them to earn points.
3. **View Personal Score**: View personal scores.

### Server-side Logic:
1. User Authentication: Ensure only logged-in users can access features.
2. Task Management: Admin can create, edit, and delete tasks. Users can receive and complete tasks.
3. Score Calculation: After a user completes a task, the system will add points to the corresponding user.

### To prevent users from increasing their points when they don't have permission, you can implement control measures on both the server and client sides.

### Server-side:
1. Check access rights: Before performing any actions such as adding points, ensure that the user is logged in and has the appropriate permissions to perform that action. This can be done by verifying the user's login session and checking their role or specific permissions in the system.

2. **Check permission**: 
Before performing actions like adding points, check whether the user has the permission to perform that action. This can be checked based on the user's role (e.g., admin, user) or specific permissions (e.g., manage tasks).

3. **Send error messages**: If a user attempts to perform an action they don't have permission for, return an appropriate error message, letting them know they cannot perform that action.

### Client-side:
1. Display corresponding functions: Ensure that the user interface only displays functions that the user has access to. This will ensure that users cannot access functions they are not allowed to use.

2. Check and hide inappropriate functions: In cases where users might attempt to perform inappropriate actions by modifying JavaScript code or sending invalid requests to the server, perform checks and hide these inappropriate functions on the user interface.

3. Handle client-side errors: If users attempt to perform inappropriate actions from the client side, handle errors appropriately and display a message letting them know they don't have permission to perform that action.


