const Coach = require('../models/coach');
const Certificate = require('../models/certificate');
const Client = require('../models/client');
const Post = require('../models/post');
const Meal = require('../models/meal');
const NutritionTemplate = require('../models/nutritionTemplate');
const WorkoutTemplate = require('../models/workoutTemplate');
const Workout = require('../models/workout');
const Day = require('../models/day');
const { log } = require('console');
const sequelize = require('../utils/database').sequelize;


// Controller actions for coaches

// Get all coaches
const getAllCoaches = async (req, res) => {
  try {
    const coaches = await Coach.findAll();
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch coaches' });
  }
};

// Get a single coach by ID
const getCoachById = async (req, res) => {
  const { id } = req.params;
  try {
    const coach = await Coach.findByPk(id);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }
    res.json(coach);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch the coach' });
  }
};

// Create a new coach
const createCoach = async (req, res) => {
  const { name, image, idNumber, idImage, phoneNumber, bio } = req.body;
  try {
    const coach = await Coach.create({
      name,
      image,
      idNumber,
      idImage,
      phoneNumber,
      bio,
    });
    res.status(201).json(coach);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create the coach' });
  }
};

// Update a coach
const updateCoach = async (req, res) => {
  const { id } = req.params;
  const { name, image, idNumber, idImage, phoneNumber, bio } = req.body;
  try {
    const coach = await Coach.findByPk(id);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }
    coach.name = name;
    coach.image = image;
    coach.idNumber = idNumber;
    coach.idImage = idImage;
    coach.phoneNumber = phoneNumber;
    coach.bio = bio;
    await coach.save();
    res.json(coach);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update the coach' });
  }
};

// Delete a coach
const deleteCoach = async (req, res) => {
  const { id } = req.params;
  try {
    const coach = await Coach.findByPk(id);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }
    await coach.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete the coach' });
  }
};

// Get certificates of a coach
const getCoachCertificates = async (req, res) => {
  const { coachId } = req.params;
  try {
    const certificates = await Certificate.findAll({
      where: { coachId },
    });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch coach certificates' });
  }
};
//--------//
// Create a certificate for a coach
const createCoachCertificate = async (req, res) => {
  const { coachId } = req.params;
  const { name, description, image } = req.body;
  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }
    const certificate = await Certificate.create({
      name,
      description,
      image,
      coachId,
    });
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create the certificate' });
  }
};

// Get posts of a coach
const getCoachPosts = async (req, res) => {
  const { coachId } = req.params;
  try {
    const posts = await Post.findAll({
      where: { coachId },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch coach posts' });
  }
};

// Get nutrition templates of a coach
const getCoachNutritionTemplates = async (req, res) => {
  const { coachId } = req.params;
  try {
    const nutritionTemplates = await NutritionTemplate.findAll({
      where: { coachId },
      include: { model: Meal }

    });
    res.json(nutritionTemplates);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch coach nutrition templates' });
  }
};

const createNutritionTemplate = async (req, res) => {
  const { coachId } = req.params;
  const { dayName, calories, protein, carb, fats, meals } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    const nutritionTemplate = await NutritionTemplate.create({
      dayName,
      calories,
      protein,
      carb,
      fats,
      coachId,
    }, { transaction });

    // Create associated meals
    const createdMeals = await Promise.all(meals.map(async (meal) => {
      return Meal.create({
        name: meal.name,
        description: meal.description,
        weight: meal.weight,
        mealType: meal.mealType,
        nutritionTemplateId: nutritionTemplate.id
      }, { transaction });
    }));

    // Associate meals with nutrition template
    await nutritionTemplate.setMeals(createdMeals, { transaction });

    // Commit the transaction
    await transaction.commit();

    res.status(201).json(nutritionTemplate);
  } catch (error) {
    // Rollback the transaction if an error occurred
    await transaction.rollback();
    res.status(500).json({ error: 'Unable to create the nutrition template' });
  }
};

// Get workout templates of a coach
const getCoachWorkoutTemplates = async (req, res) => {
  const { coachId } = req.params;
  try {
    const workoutTemplates = await WorkoutTemplate.findAll({
      where: { coachId },
      include: [
        {
          model: Day,
          include: [{ model: Workout }],
        },
      ],
    });
    res.json(workoutTemplates);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch coach workout templates' });
  }
};
///-----//
// Create a workout template for a coach
const createWorkoutTemplate = async (req, res) => {
  const { coachId } = req.params;
  const { numberOfWeeks, days } = req.body;

  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    const workoutTemplate = await WorkoutTemplate.create({
      numberOfWeeks,
      coachId,
    });

    // Create days and workouts
    const createdDays = [];
    for (const dayData of days) {
      const { dayName, workouts } = dayData;
      const day = await Day.create({
        dayName,
        workoutTemplateId: workoutTemplate.id,
      });

      const createdWorkouts = await Promise.all(
        workouts.map(async (workout) => {
          return Workout.create({
            title: workout.title,
            subtitle: workout.subtitle,
            setsCount: workout.setsCount,
            repsCount: workout.repsCount,
            restTime: workout.restTime,
            warmup: workout.warmup,
            videoLink: workout.videoLink,
            dayId: day.id,
          });
        })
      );

      await day.setWorkouts(createdWorkouts);
      createdDays.push({
        day,
        workouts: createdWorkouts,
      });
    }

    res.status(201).json({
      workoutTemplate,
      days: createdDays,
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create the workout template' });
  }
};
// Assign a nutrition template to a client
const assignNutritionTemplateToClient = async (req, res) => {
  const { coachId, clientId, templateId } = req.params;
  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const nutritionTemplate = await NutritionTemplate.findByPk(templateId);
    if (!nutritionTemplate) {
      return res.status(404).json({ error: 'Nutrition template not found' });
    }

    await client.addNutritionTemplate(nutritionTemplate);



    res.status(200).json({ message: 'Nutrition template assigned to client successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to assign nutrition template to client' });
  }
};

// Assign a workout template to a client
const assignWorkoutTemplateToClient = async (req, res) => {
  const { coachId, clientId, templateId } = req.params;
  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const workoutTemplate = await WorkoutTemplate.findByPk(templateId);
    if (!workoutTemplate) {
      return res.status(404).json({ error: 'Workout template not found' });
    }

    await client.addWorkoutTemplate(workoutTemplate);

    res.status(200).json({ message: 'Workout template assigned to the client successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to assign workout template to client' });
  }
};

// Remove a nutrition template from a client
const removeNutritionTemplateFromClient = async (req, res) => {
  const { coachId, clientId, templateId } = req.params;

  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    await client.removeNutritionTemplate(templateId);

    res.status(200).json({ message: 'Nutrition template removed from client successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to remove nutrition template from client' });
  }
};

// Remove a workout template from a client
const removeWorkoutTemplateFromClient = async (req, res) => {
  const { coachId, clientId, templateId } = req.params;

  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    await client.removeWorkoutTemplate(templateId);

    res.status(200).json({ message: 'Workout template removed from client successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to remove workout template from client' });
  }
};

// Get workout templates of a client associated with a coach
const getClientWorkoutTemplates = async (req, res) => {
  const { coachId, clientId } = req.params;
  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }
    // const client = await Client.findOne({
    //   where: { id: clientId, coachId },
    //   include: [{ model: WorkoutTemplate }],
    // });
    const client = await Client.findByPk(clientId, {
      include: [{ model: WorkoutTemplate }],
    });
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(await client.getWorkoutTemplates());
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch the workout templates of the client' });
  }
};

// Get nutrition templates of a client associated with a coach
const getClientNutritionTemplates = async (req, res) => {
  const { coachId, clientId } = req.params;
  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }
    const client = await Client.findByPk(
     clientId,
      {include: [{ model: NutritionTemplate }]}
    );
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(await client.getNutritionTemplates());
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch the nutrition templates of the client' });
  }

};
//---/
// Delete a nutrition template
const deleteNutritionTemplate = async (req, res) => {
  const { coachId, templateId } = req.params;
  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }
    const nutritionTemplate = await NutritionTemplate.findOne({
      where: { id: templateId, coachId },
    });
    if (!nutritionTemplate) {
      return res.status(404).json({ error: 'Nutrition template not found' });
    }
    await nutritionTemplate.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete the nutrition template' });
  }
};

// Delete a workout template
const deleteWorkoutTemplate = async (req, res) => {
  const { coachId, templateId } = req.params;
  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }
    const workoutTemplate = await WorkoutTemplate.findOne({
      where: { id: templateId, coachId },
    });
    if (!workoutTemplate) {
      return res.status(404).json({ error: 'Workout template not found' });
    }
    await workoutTemplate.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete the workout template' });
  }
};

// Insert a day into a workout template
const insertDayIntoWorkoutTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    const { dayName, subtitle, image, additionalNotes } = req.body;
    const workoutTemplate = await WorkoutTemplate.findByPk(templateId);
    if (!workoutTemplate) {
      return res.status(404).json({ error: 'Workout template not found' });
    }

    const day = await Day.create({
      dayName,
      subtitle,
      image,
      additionalNotes,
      workoutTemplateId: templateId,
    });

    res.status(201).json(day);
  } catch (error) {
    res.status(500).json({ error: 'Unable to insert day into workout template' });
  }
};


// Insert a workout into a day
const insertWorkoutIntoDay = async (req, res) => {
  try {
    const { dayId } = req.params;
    const { title, subtitle, setsCount, repsCount, restTime, additionalNotes, warmup, videoLink } = req.body;
    const day = await Day.findByPk(dayId);
    if (!day) {
      return res.status(404).json({ error: 'Day not found' });
    }

    const workout = await Workout.create({
      title,
      subtitle,
      setsCount,
      repsCount,
      restTime,
      additionalNotes,
      warmup,
      videoLink,
      dayId,
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Unable to insert workout into day' });
  }
};

// Assign a client to a coach
const assignClientToCoach = async (req, res) => {
  const { coachId, clientId } = req.params;
  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    await client.setCoach(coach);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Unable to assign the client to the coach' });
  }
};


module.exports = {
  getAllCoaches,
  getCoachById,
  createCoach,
  updateCoach,
  deleteCoach,
  getCoachCertificates,
  createCoachCertificate,
  getCoachPosts,
  getCoachNutritionTemplates,
  createNutritionTemplate,
  getCoachWorkoutTemplates,
  createWorkoutTemplate,
  assignNutritionTemplateToClient,
  assignWorkoutTemplateToClient,
  removeNutritionTemplateFromClient,
  removeWorkoutTemplateFromClient,
  getClientWorkoutTemplates,
  getClientNutritionTemplates,
  deleteNutritionTemplate,
  deleteWorkoutTemplate,
  insertDayIntoWorkoutTemplate,
  insertWorkoutIntoDay,
  assignClientToCoach
};
