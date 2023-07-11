
/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the client.
 *         name:
 *           type: string
 *           description: The name of the client.
 *         birthday:
 *           type: string
 *           format: date
 *           description: The birthday of the client.
 *         height:
 *           type: number
 *           description: The height of the client.
 *         weight:
 *           type: number
 *           description: The weight of the client.
 *         weakness:
 *           type: string
 *           description: The weakness of the client.
 *         strengths:
 *           type: string
 *           description: The strengths of the client.
 *         injuries:
 *           type: string
 *           description: The injuries of the client.
 *         goal:
 *           type: string
 *           description: The goal of the client.
 *         medicalHistory:
 *           type: string
 *           description: The medical history of the client.
 *         gender:
 *           type: string
 *           enum:
 *             - Male
 *             - Female 
 *           description: The gender of the client.
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the client.
 *         type:
 *           type: string
 *           enum:
 *             - InPerson
 *             - Remote
 *           description: The type of the client.
 *         profileImage:
 *           type: string
 *           description: The profile image URL of the client.
 *         coachId:
 *           type: integer
 *           description: The ID of the coach associated with the client.
 *         nutritionTemplateId:
 *           type: integer
 *           description: The ID of the nutrition template associated with the client.
 *         workoutTemplateId:
 *           type: integer
 *           description: The ID of the workout template associated with the client.
 *       required:
 *         - name
 *         - coachId
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateClient:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         birthday:
 *           type: string
 *           format: date
 *         height:
 *           type: number
 *         weight:
 *           type: number
 *         weakness:
 *           type: string
 *         strengths:
 *           type: string
 *         injuries:
 *           type: string
 *         goal:
 *           type: string
 *         medicalHistory:
 *           type: string
 *         gender:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         type:
 *           type: string
 *         profileImage:
 *           type: string
 *       example:
 *         name: John Doe
 *         birthday: 1990-01-01
 *         height: 180
 *         weight: 75
 *         weakness: Weak knees
 *         strengths: Endurance
 *         injuries: None
 *         goal: Lose weight
 *         medicalHistory: No known medical conditions
 *         gender: Male
 *         phoneNumber: 1234567890
 *         type: Regular
 *         profileImage: profile.jpg
 */

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       500:
 *         description: Unable to fetch clients
 */

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the client
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 *       500:
 *         description: Unable to fetch the client
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: One or more coaches not found, Nutrition template not found, or Workout template not found
 *       500:
 *         description: Unable to create the client
 */

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Update a client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the client
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClient'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found, One or more coaches not found, Nutrition template not found, or Workout template not found
 *       500:
 *         description: Unable to update the client
 */

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Delete a client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the client
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Client not found
 *       500:
 *         description: Unable to delete the client
 */

/**
 * @swagger
 * /clients/{id}/coaches:
 *   get:
 *     summary: Get the coaches assigned to a client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the client
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coach'
 *       404:
 *         description: Client not found
 *       500:
 *         description: Unable to fetch the coaches of the client
 */

/**
 * @swagger
 * /clients/{id}/workout-template:
 *   get:
 *     summary: Get the workout template assigned to a client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the client
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutTemplate'
 *       404:
 *         description: Client not found
 *       500:
 *         description: Unable to fetch the workout template of the client
 */

/**
 * @swagger
 * /clients/{id}/nutrition-template:
 *   get:
 *     summary: Get the nutrition template assigned to a client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the client
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NutritionTemplate'
 *       404:
 *         description: Client not found
 *       500:
 *         description: Unable to fetch the nutrition template of the client
 */