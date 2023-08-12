const Coach = require('../models/coach');
const Certificate = require('../models/certificate');
const Client = require('../models/client');
const Post = require('../models/post');
const Meal = require('../models/meal');
const NutritionTemplate = require('../models/nutritionTemplate');
const WorkoutTemplate = require('../models/workoutTemplate');
const Workout = require('../models/workout');
const Day = require('../models/day');

const TempMeal = require('../models/tempMeal');
const TempNutritionTemplate = require('../models/tempNutritionTemplate');
const TempWorkoutTemplate = require('../models/tempWorkoutTemplate');
const TempWorkout = require('../models/tempWorkout');
const TempDay = require('../models/tempDay');

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
  const { name, image, idNumber, idImage, phoneNumber, bio, email } = req.body;
  try {
    const coach = await Coach.create({
      name,
      image,
      idNumber,
      idImage,
      phoneNumber,
      bio,
      email
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
    res.status(500).json({ error: 'Unable to fetch coach workout templates', error: error.message });
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
      const { subtitle,image, additionalNotes, workouts } = dayData;
      const day = await Day.create({
        subtitle,
        image, 
        additionalNotes,
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

      try {
      await day.setWorkouts(createdWorkouts);

      }catch (e){
        log("Create Day Error")
      }
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

// // Get workout templates of a client associated with a coach
// const getClientWorkoutTemplates = async (req, res) => {
//   const { coachId, clientId } = req.params;
//   try {
//     const coach = await Coach.findByPk(coachId);
//     if (!coach) {
//       return res.status(404).json({ error: 'Coach not found' });
//     }
//     // const client = await Client.findOne({
//     //   where: { id: clientId, coachId },
//     //   include: [{ model: WorkoutTemplate }],
//     // });
//     const client = await Client.findByPk(clientId, {
//       include: [{ model: WorkoutTemplate }],
//     });
//     if (!client) {
//       return res.status(404).json({ error: 'Client not found' });
//     }
//     res.json(await client.getWorkoutTemplates());
//   } catch (error) {
//     res.status(500).json({ error: 'Unable to fetch the workout templates of the client' });
//   }
// };
// Get workout templates of a client associated with a coach or from TempWorkoutTemplate
const getClientWorkoutTemplates = async (req, res) => {
  const { coachId, clientId } = req.params;
  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    const client = await Client.findByPk(clientId, {
      include: [{ model: WorkoutTemplate }],
    });

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // If the client is assigned to a coach, return their assigned workout templates
    if (client.coachId == coachId) {
      log("------"+client.coachId +" ------------------" + coachId+"-------------------------");
      res.json(await client.getWorkoutTemplates());
    } else {

      // If the client is not assigned to a coach, return workout templates from TempWorkoutTemplate
      const tempClient = await Client.findByPk(clientId, {
        include: [
          {
            model: TempWorkoutTemplate,
            include: [{ model: TempDay, include: [{ model: TempWorkout }] }],
          },
        ],
      });

      if (!tempClient) {
        return res.status(404).json({ error: 'Client not found' });
      }
      

      const tempWorkoutTemplates = await tempClient.getTempWorkoutTemplates();
      const formattedWorkoutTemplates = [];
  
      for (const tempWorkoutTemplate of tempWorkoutTemplates) {
        const formattedTemplate = {
          id: tempWorkoutTemplate.id,
          numberOfWeeks: tempWorkoutTemplate.numberOfWeeks,
          createdAt: tempWorkoutTemplate.createdAt,
          updatedAt: tempWorkoutTemplate.updatedAt,
          coachId: tempWorkoutTemplate.coachId,
          Days: [],
        };
  
        for (const tempDay of await tempWorkoutTemplate.getTempDays()) {
          // log("TEMP DAY: \n " + tempDay.toJSON());
          const formattedDay = {
            id: tempDay.id,
            subtitle: tempDay.subtitle,
            image: tempDay.image,
            additionalNotes: tempDay.additionalNotes,
            createdAt: tempDay.createdAt,
            updatedAt: tempDay.updatedAt,
            tempWorkoutTemplateId: tempDay.tempWorkoutTemplateId,
            Workouts: [],
          };
          log(formattedDay);
          const tempDayId = formattedDay.id;
          const workoutTemplates = await TempWorkout.findAll({
            where: { tempDayId },
            // include: [
            //   {
            //     // model: TempDay,
            //     // include: [{ model: TempWorkout }],
            //   },
            // ],
          });
          for (const tempWorkout of workoutTemplates) {
            formattedDay.Workouts.push({
              id: tempWorkout.id,
              title: tempWorkout.title,
              subtitle: tempWorkout.subtitle,
              setsCount: tempWorkout.setsCount,
              repsCount: tempWorkout.repsCount,
              restTime: tempWorkout.restTime,
              additionalNotes: tempWorkout.additionalNotes,
              warmup: tempWorkout.warmup,
              videoLink: tempWorkout.videoLink,
              createdAt: tempWorkout.createdAt,
              updatedAt: tempWorkout.updatedAt,
              tempDayId: tempWorkout.tempDayId,
            });
          }
  
          formattedTemplate.Days.push(formattedDay);
        }
  
        formattedWorkoutTemplates.push(formattedTemplate);
      }
  
      res.json(formattedWorkoutTemplates);
    }
  } catch (error) {
    log(error);
    res.status(500).json({ error: 'Unable to fetch the workout templates of the client' });
  }
};


// // Get nutrition templates of a client associated with a coach
// const getClientNutritionTemplates = async (req, res) => {
//   const { coachId, clientId } = req.params;
//   try {
//     const coach = await Coach.findByPk(coachId);
//     if (!coach) {
//       return res.status(404).json({ error: 'Coach not found' });
//     }
//     const client = await Client.findByPk(
//      clientId,
//       {include: [{ model: NutritionTemplate }]}
//     );
//     if (!client) {
//       return res.status(404).json({ error: 'Client not found' });
//     }
//     res.json(await client.getNutritionTemplates());
//   } catch (error) {
//     res.status(500).json({ error: 'Unable to fetch the nutrition templates of the client' });
//   }
// };

// Get nutrition templates of a client associated with a coach or from TempNutritionTemplate
const getClientNutritionTemplates = async (req, res) => {
  const { coachId, clientId } = req.params;
  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    const client = await Client.findByPk(clientId, {
      include: [{ model: NutritionTemplate }],
    });

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // If the client is assigned to a coach, return their assigned nutrition templates
    if (client.coachId === coachId) {

      res.json(await client.getNutritionTemplates());
    } else {

      // If the client is not assigned to a coach, return nutrition templates from TempNutritionTemplate
      const tempClient = await Client.findByPk(clientId, {
        include: [{ model: TempNutritionTemplate, include: [{ model: TempMeal }] }],
      });

      if (!tempClient) {
        return res.status(404).json({ error: 'Client not found' });
      }

      const tempNutritionTemplates = tempClient.getTempNutritionTemplates();
      const nutritionTemplates = [];

      for (const tempNutritionTemplate of tempNutritionTemplates) {
        const tempMeals = tempNutritionTemplate.getTempMeals();
        nutritionTemplates.push({
          ...tempNutritionTemplate.dataValues,
          TempMeals: tempMeals,
        });
      }

      res.json(nutritionTemplates);
    }
  } catch (error) {
    log(error);
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

const unassignClientFromCoach = async (req, res) => {
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

    // Unassign the client from the coach
    await client.setCoaches(null);
    client.coachId = null;
    await client.save();

    // Copy data from NutritionTemplate to TempNutritionTemplate
    const nutritionTemplates = await client.getNutritionTemplates();
    for (const nutritionTemplate of nutritionTemplates) {
      const tempNutritionData = {
        dayName: nutritionTemplate.dayName,
        calories: nutritionTemplate.calories,
        protein: nutritionTemplate.protein,
        carb: nutritionTemplate.carb,
        fats: nutritionTemplate.fats,
        coachId: null, // You may want to set coachId to null if it was assigned before
        clientId: clientId // Set clientId to null
      };
      await TempNutritionTemplate.create(tempNutritionData);
    }

    // Copy data from WorkoutTemplate to TempWorkoutTemplate and TempDay
    const workoutTemplates = await client.getWorkoutTemplates();
    for (const workoutTemplate of workoutTemplates) {
      const tempWorkoutTemplate = await TempWorkoutTemplate.create({
        numberOfWeeks: workoutTemplate.numberOfWeeks
      });

      const days = await workoutTemplate.getDays();
      for (const day of days) {
        const tempDay = await TempDay.create({
          subtitle: day.subtitle,
          image: day.image,
          additionalNotes: day.additionalNotes,
          tempWorkoutTemplateId: tempWorkoutTemplate.id
        });

        const workouts = await day.getWorkouts();
        for (const workout of workouts) {
          await TempWorkout.create({
            title: workout.title,
            subtitle: workout.subtitle,
            setsCount: workout.setsCount,
            repsCount: workout.repsCount,
            restTime: workout.restTime,
            additionalNotes: workout.additionalNotes,
            warmup: workout.warmup,
            videoLink: workout.videoLink,
            tempDayId: day.id // Set dayId to the newly created TempDay's id
          });
        }
        await tempWorkoutTemplate.addTempDay(tempDay);
        await client.addTempWorkoutTemplate(tempWorkoutTemplate);

      }
    }
    await client.setWorkoutTemplates(null);
    await client.setNutritionTemplates(null);
    res.sendStatus(204);
  } catch (error) {
    log(error);
    res.status(500).json({ error: 'Unable to unassign the client from the coach' });
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
  assignClientToCoach,
  unassignClientFromCoach
};
