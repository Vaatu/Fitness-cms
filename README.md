# Fitness-cms
> # Coach Management API
>
> This API provides functionality for managing coaches and clients.
>
> ## Installation
>
> 1. Clone the repository:
> 
>    ```bash
>    git clone https://github.com/Vaatu/Fitness-cms.git
>    ```
> 
> 2. Install dependencies:
> 
>    ```bash
>    cd Fitness-cms
>    npm install
>    ```
> 
> 3. Set up the database:
>    - Create a database with the name specified in the `.env.example` file.
>    - Update the database configuration and rename it to `.env` file.
> 
> 4. Run database migrations:
> 
>    ```bash
>    npx sequelize-cli db:migrate
>    ```
> 
> 5. Start the server:
> 
>    ```bash
>    npm start
>    ```
> 
> The server will start running on `http://localhost:3000`.

> ## API Documentation
>
> API documentation is available using Swagger UI.
>
> - Open the API documentation in a web browser: `http://localhost:3000/api-docs`

> ## Usage
>
> ### Clients
>
> - `GET /clients`: Get all clients.
> - `GET /clients/:id`: Get a client by ID.
> - `POST /clients`: Create a new client.
> - `PUT /clients/:id`: Update a client.
> - `DELETE /clients/:id`: Delete a client.
> - `GET /clients/:id/coaches`: Get the coaches assigned to a client.
> - `GET /clients/:id/workout-template`: Get the workout template assigned to a client.
> - `GET /clients/:id/nutrition-template`: Get the nutrition template assigned to a client.
>
> ### Coaches
>
> - `GET /coaches`: Get all coaches.
> - `GET /coaches/:id`: Get a coach by ID.
> - `POST /coaches`: Create a new coach.
> - `PUT /coaches/:id`: Update a coach.
> - `DELETE /coaches/:id`: Delete a coach.
> > #### Coaches Certifications
> > - `GET /coaches/:coachId/certificates`: Get the certificates of a coach.
> > - `POST /coaches/:coachId/certificates`: Create a certificate for a coach.
> ####  Posts
> > - `GET /coaches/:coachId/posts`: Get the posts of a coach.
> ####  Nutrition Templates
> > - `GET /coaches/:coachId/nutrition-templates`: Get the nutrition templates of a coach.
> > - `POST /coaches/:coachId/nutrition-templates`: Create a nutrition template for a coach.
> > - `DELETE /coaches/:coachId/nutrition-templates/:templateId`: Delete a nutrition template.
> > - `POST /coaches/:coachId/clients/:clientId/nutrition-template/:templateId`: Assign a nutrition template to a client.
> > - `GET /coaches/:coachId/clients/:clientId/nutrition-templates`: Get the nutrition templates assigned to a client.
> > - `DELETE /coaches/:coachId/clients/:clientId/nutrition-templates`: Remove a nutrition template from a client.
> ####  Workout Templates
> > - `POST /coaches/:coachId/workout-templates`: Create a workout template for a coach.
> > - `GET /coaches/:coachId/workout-templates`: Get the workout templates of a coach.
> > - `DELETE /coaches/:coachId/workout-templates/:templateId`: Delete a workout template.
> > - `POST /coaches/:coachId/workout-templates/:templateId/days`: Insert a day into a workout template.
> > - `POST /coaches/:coachId/clients/:clientId/workout-template/:templateId`: Assign a workout template to a client.
> > - `GET /coaches/:coachId/clients/:clientId/workout-templates`: Get the workout templates assigned to a client.
> > - `DELETE /coaches/:coachId/clients/:clientId/workout-templates`: Remove a workout template from a client.

