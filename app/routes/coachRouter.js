const express = require('express');
const coachController = require('../controllers/coachController');
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Coach:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Coach ID
 *         name:
 *           type: string
 *           description: Coach name
 *         image:
 *           type: string
 *           description: Coach image URL
 *         idNumber:
 *           type: string
 *           description: Coach ID number
 *         idImage:
 *           type: string
 *           description: Coach ID image URL
 *         phoneNumber:
 *           type: string
 *           description: Coach phone number
 *         bio:
 *           type: string
 *           description: Coach biography
 *
 *     Certificate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Certificate ID
 *         name:
 *           type: string
 *           description: Certificate name
 *         description:
 *           type: string
 *           description: Certificate description
 *         image:
 *           type: string
 *           description: Certificate image URL
 *
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Client ID
 *         name:
 *           type: string
 *           description: Client name
 *         birthday:
 *           type: string
 *           format: date
 *           description: Client birthday
 *         height:
 *           type: number
 *           description: Client height in centimeters
 *         weight:
 *           type: number
 *           description: Client weight in kilograms
 *         weakness:
 *           type: string
 *           description: Client weakness
 *         strengths:
 *           type: string
 *           description: Client strengths
 *         injuries:
 *           type: string
 *           description: Client injuries
 *         goal:
 *           type: string
 *           description: Client goal/target
 *         medicalHistory:
 *           type: string
 *           description: Client medical history
 *         gender:
 *           type: string
 *           description: Client gender
 *         phoneNumber:
 *           type: string
 *           description: Client phone number
 *         type:
 *           type: string
 *           description: Client type (Remote - Inperson)
 *         profileImage:
 *           type: string
 *           description: Client profile image URL
 *
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Post ID
 *         description:
 *           type: string
 *           description: Post description
 *         image:
 *           type: string
 *           description: Post image URL
 *
 *     NutritionTemplate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Nutrition Template ID
 *         dayName:
 *           type: string
 *           description: Day name
 *         calories:
 *           type: number
 *           description: Total calories
 *         protein:
 *           type: number
 *           description: Total protein in grams
 *         carb:
 *           type: number
 *           description: Total carbohydrates in grams
 *         fats:
 *           type: number
 *           description: Total fats in grams
 *         meals:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Meal'
 *
 *     WorkoutTemplate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Workout Template ID
 *         numberOfWeeks:
 *           type: integer
 *           description: Number of weeks in the template
 *         days:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Day'
 *
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Comment ID
 *         text:
 *           type: string
 *           description: Comment text
 *         postId:
 *           type: integer
 *           description: Post ID the comment belongs to
 *         userId:
 *           type: integer
 *           description: User ID who posted the comment
 *
 *     Day:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Day ID
 *         subtitle:
 *           type: string
 *           description: Day subtitle
 *         image:
 *           type: string
 *           description: Day image URL
 *         workouts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Workout'
 *
 *     Meal:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Meal ID
 *         name:
 *           type: string
 *           description: Meal name
 *         weight:
 *           type: number
 *           description: Meal weight in grams
 *
 *     Workout:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Workout ID
 *         title:
 *           type: string
 *           description: Workout title
 *         subtitle:
 *           type: string
 *           description: Workout subtitle
 *         sets:
 *           type: integer
 *           description: Number of sets
 *         break:
 *           type: integer
 *           description: Break estimation in seconds
 *
 *     Like:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Like ID
 *         postId:
 *           type: integer
 *           description: Post ID the like belongs to
 *         userId:
 *           type: integer
 *           description: User ID who liked the post
 *
 *     CoachInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Coach name
 *         image:
 *           type: string
 *           description: Coach image URL
 *         idNumber:
 *           type: string
 *           description: Coach ID number
 *         idImage:
 *           type: string
 *           description: Coach ID image URL
 *         phoneNumber:
 *           type: string
 *           description: Coach phone number
 *         bio:
 *           type: string
 *           description: Coach biography
 *
 *     CertificateInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Certificate name
 *         description:
 *           type: string
 *           description: Certificate description
 *         image:
 *           type: string
 *           description: Certificate image URL
 *
 *     PostInput:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           description: Post description
 *         image:
 *           type: string
 *           description: Post image URL
 *
 *     NutritionTemplateInput:
 *       type: object
 *       properties:
 *         dayName:
 *           type: string
 *           description: Day name
 *         calories:
 *           type: number
 *           description: Total calories
 *         protein:
 *           type: number
 *           description: Total protein in grams
 *         carb:
 *           type: number
 *           description: Total carbohydrates in grams
 *         fats:
 *           type: number
 *           description: Total fats in grams
 *         meals:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MealInput'
 *
 *     WorkoutTemplateInput:
 *       type: object
 *       properties:
 *         numberOfWeeks:
 *           type: integer
 *           description: Number of weeks in the template
 *         days:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DayInput'
 *
 *     CommentInput:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           description: Comment text
 *         postId:
 *           type: integer
 *           description: Post ID the comment belongs to
 *         userId:
 *           type: integer
 *           description: User ID who posted the comment
 *
 *     DayInput:
 *       type: object
 *       properties:
 *         subtitle:
 *           type: string
 *           description: Day subtitle
 *         image:
 *           type: string
 *           description: Day image URL
 *         additionalNotes:
 *           type: string
 *           description: Day image URL
 *         workouts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WorkoutInput'
 *
 *     MealInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Meal name
 *         weight:
 *           type: number
 *           description: Meal weight in grams
 *         description:
 *           type: string
 *           description: Meal name
 *         mealType:
 *           type: number
 *           description: Meal weight in grams
 *
 *     WorkoutInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Workout title
 *         subtitle:
 *           type: string
 *           description: Workout subtitle
 *         videoLink:
 *           type: string
 *           description: Video Link
 *         warmup:
 *           type: boolean
 *           description: Video Link
 *         setsCount:
 *           type: integer
 *           description: Number of sets
 *         repsCount:
 *           type: integer
 *           description: Number of reps
 *         restTime:
 *           type: integer
 *           description: Rest time in seconds

 *
 *     LikeInput:
 *       type: object
 *       properties:
 *         postId:
 *           type: integer
 *           description: Post ID the like belongs to
 *         userId:
 *           type: integer
 *           description: User ID who liked the post
 */


/**
 * @swagger
 * tags:
 *   name: Coaches
 *   description: Coach management APIs
 */
/**
 * @swagger
 * /coaches:
 *   get:
 *     summary: Get all coaches
 *     tags: [Coaches]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coach'
 * 
 *   post:
 *     summary: Create a new coach
 *     tags: [Coaches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coach'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coach'
 *       500:
 *         description: Unable to create the coach
 * 
 * /coaches/{id}:
 *   get:
 *     summary: Get a single coach by ID
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coach'
 *       404:
 *         description: Coach not found
 *       500:
 *         description: Unable to fetch the coach
 * 
 *   put:
 *     summary: Update a coach
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coach'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coach'
 *       404:
 *         description: Coach not found
 *       500:
 *         description: Unable to update the coach
 * 
 *   delete:
 *     summary: Delete a coach
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Coach not found
 *       500:
 *         description: Unable to delete the coach
 * 
 * /coaches/{coachId}/certificates:
 *   get:
 *     summary: Get certificates of a coach
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Certificate'
 *       500:
 *         description: Unable to fetch coach certificates
 */

/**
 * @swagger
 * /coaches/{coachId}/certificates:
 *   post:
 *     summary: Create a certificate for a coach
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certificate'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       404:
 *         description: Coach not found
 *       500:
 *         description: Unable to create the certificate
 * 
 * /coaches/{coachId}/posts:
 *   get:
 *     summary: Get posts of a coach
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Unable to fetch coach posts
 * 
 * /coaches/{coachId}/nutrition-templates:
 *   get:
 *     summary: Get nutrition templates of a coach
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NutritionTemplate'
 *       500:
 *         description: Unable to fetch coach nutrition templates
 * 
 *   post:
 *     summary: Create a nutrition template for a coach
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NutritionTemplate'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NutritionTemplate'
 *       404:
 *         description: Coach not found
 *       500:
 *         description: Unable to create the nutrition template
 * 
 * /coaches/{coachId}/workout-templates:
 *   get:
 *     summary: Get workout templates of a coach
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkoutTemplate'
 *       500:
 *         description: Unable to fetch coach workout templates
 */
/**
 * @swagger
 * /coaches/{coachId}/workout-templates:
 *   post:
 *     summary: Create a workout template for a coach
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkoutTemplate'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutTemplate'
 *       404:
 *         description: Coach not found
 *       500:
 *         description: Unable to create the workout template
 *
 * /coaches/{coachId}/clients/{clientId}/nutrition-template/{templateId}:
 *   put:
 *     summary: Assign a nutrition template to a client
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the client
 *       - in: path
 *         name: templateId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the nutrition template
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Coach or Client not found
 *       500:
 *         description: Unable to assign the nutrition template to the client
 *
 * /coaches/{coachId}/clients/{clientId}/workout-template/{templateId}:
 *   put:
 *     summary: Assign a workout template to a client
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the client
 *       - in: path
 *         name: templateId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the workout template
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Coach or Client not found
 *       500:
 *         description: Unable to assign the workout template to the client
 *
 * /coaches/{coachId}/clients/{clientId}/nutrition-template:
 *   delete:
 *     summary: Remove a nutrition template from a client
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the client
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Coach or Client not found
 *       500:
 *         description: Unable to remove the nutrition template from the client
 *
 * /coaches/{coachId}/clients/{clientId}/workout-template:
 *   delete:
 *     summary: Remove a workout template from a client
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the client
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Coach or Client not found
 *       500:
 *         description: Unable to remove the workout template from the client
 *
 * /coaches/{coachId}/clients/{clientId}/workout-templates:
 *   get:
 *     summary: Get workout templates of a client associated with a coach
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the client
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkoutTemplate'
 *       404:
 *         description: Coach or Client not found
 *       500:
 *         description: Unable to fetch the workout templates of the client
 *
 * /coaches/{coachId}/clients/{clientId}/nutrition-templates:
 *   get:
 *     summary: Get nutrition templates of a client associated with a coach
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the client
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NutritionTemplate'
 *       404:
 *         description: Coach or Client not found
 *       500:
 *         description: Unable to fetch the nutrition templates of the client
 */
/**
 * @swagger
 * /coaches/{coachId}/nutrition-templates/{templateId}:
 *   delete:
 *     summary: Delete a nutrition template
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *       - in: path
 *         name: templateId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the nutrition template
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Coach or Nutrition template not found
 *       500:
 *         description: Unable to delete the nutrition template
 *
 * /coaches/{coachId}/workout-templates/{templateId}:
 *   delete:
 *     summary: Delete a workout template
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the coach
 *       - in: path
 *         name: templateId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the workout template
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Coach or Workout template not found
 *       500:
 *         description: Unable to delete the workout template
 */
/**
 * @swagger
 * /workout-templates/{templateId}/days:
 *   post:
 *     summary: Insert a day into a workout template
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: templateId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the workout template
 *       - in: body
 *         name: dayName
 *         schema:
 *           type: object
 *           properties:
 *             dayName:
 *               type: string
 *             image:
 *               type: string
 *             additionalNotes:
 *               type: string
 *           required:
 *             - dayName
 *         description: The name of the day to insert
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description: Workout template not found
 *       '500':
 *         description: Unable to insert day into workout template
 */


/**
 * @swagger
 * /days/{dayId}/workouts:
 *   post:
 *     summary: Insert a workout into a day
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: dayId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the day
 *       - in: body
 *         name: workout
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             subtitle:
 *               type: string
 *             setsCount:
 *               type: integer
 *             repsCount:
 *               type: integer
 *             restTime:
 *               type: integer
 *             additionalNotes:
 *               type: string
 *             warmup:
 *               type: boolean
 *             videoLink:
 *               type: string
 *           required:
 *             - title
 *         description: The details of the workout to insert
 *     responses:
 *       '201':
 *         description: Created
 *       '404':
 *         description: Day not found
 *       '500':
 *         description: Unable to insert workout into day
 */

// Routes for coaches
router.get('/', coachController.getAllCoaches);
router.get('/:id', coachController.getCoachById);
router.post('/', coachController.createCoach);
router.put('/:id', coachController.updateCoach);
router.delete('/:id', coachController.deleteCoach);

// Routes for coach certificates
router.get('/:coachId/certificates', coachController.getCoachCertificates);
router.post('/:coachId/certificates', coachController.createCoachCertificate);

// Routes for coach posts
router.get('/:coachId/posts', coachController.getCoachPosts);

// Routes for coach nutrition templates
router.get('/:coachId/nutrition-templates', coachController.getCoachNutritionTemplates);
router.post('/:coachId/nutrition-templates', coachController.createNutritionTemplate);
// Route for inserting a day into a workout template
router.post('/:coachId/workout-templates/:templateId/days',coachController.insertDayIntoWorkoutTemplate);
router.delete('/:coachId/nutrition-templates/:templateId', coachController.deleteNutritionTemplate);

// Routes for coach workout templates
router.get('/:coachId/workout-templates', coachController.getCoachWorkoutTemplates);
router.post('/:coachId/workout-templates', coachController.createWorkoutTemplate);
router.delete('/:coachId/workout-templates/:templateId', coachController.deleteWorkoutTemplate);

// Routes for assigning templates to clients
router.post('/:coachId/clients/:clientId/nutrition-templates/:templateId', coachController.assignNutritionTemplateToClient);
router.post('/:coachId/clients/:clientId/workout-templates/:templateId', coachController.assignWorkoutTemplateToClient);
router.delete('/:coachId/clients/:clientId/nutrition-templates', coachController.removeNutritionTemplateFromClient);
router.delete('/:coachId/clients/:clientId/workout-templates', coachController.removeWorkoutTemplateFromClient);

// Routes for coach client workout templates and nutrition templates
router.get('/:coachId/clients/:clientId/workout-templates', coachController.getClientWorkoutTemplates);
router.get('/:coachId/clients/:clientId/nutrition-templates', coachController.getClientNutritionTemplates);

module.exports = router;
