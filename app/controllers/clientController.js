
const Client = require('../models/client');
const Coach = require('../models/coach');
const WorkoutTemplate = require('../models/workoutTemplate');
const NutritionTemplate = require('../models/nutritionTemplate');
const { log } = require('console');


// Get all clients
const getAllClients = async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch clients' });
    }
};

// Get a single client by ID
const getClientById = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch the client' });
    }
};

// Create a new client
const createClient = async (req, res) => {
    const { name, birthday, height, weight, weakness, strengths, injuries, goal, medicalHistory, gender, phoneNumber, type, profileImage, coachId, nutritionTemplateId, workoutTemplateId } = req.body;
    try {
        const coaches = await Coach.findByPk(coachId);
        if (!coaches) {
            return res.status(404).json({ error: 'One or more coaches not found' });
        }
        // const nutritionTemplate = await NutritionTemplate.findByPk(nutritionTemplateId);
        // if (!nutritionTemplate) {
        //   return res.status(404).json({ error: 'Nutrition template not found' });
        // }
        // const workoutTemplate = await WorkoutTemplate.findByPk(workoutTemplateId);
        // if (!workoutTemplate) {
        //   return res.status(404).json({ error: 'Workout template not found' });
        // }
        // Check if the client with the provided email is already registered
        const existingClient = await Client.findOne({ where: { email } });
        if (existingClient) {
            return res.status(409).json({ error: 'The client is already registered' });
        }
        const client = await Client.create({
            name,
            birthday,
            height,
            weight,
            weakness,
            strengths,
            injuries,
            goal,
            medicalHistory,
            gender,
            phoneNumber,
            type,
            profileImage,
        })
        await client.addCoaches(coaches);
        // client.setNutritionTemplate(nutritionTemplate);
        // client.setWorkoutTemplate(workoutTemplate);
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create the client' });
    }
};

// Update a client
const updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, birthday, height, weight, weakness, strengths, injuries, goal, medicalHistory, gender, phoneNumber, type, profileImage, coachIds, nutritionTemplateId, workoutTemplateId } = req.body;
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        // const coaches = await Coach.findAll({ where: { id: coachIds } });
        // if (coaches.length !== coachIds.length) {
        //   return res.status(404).json({ error: 'One or more coaches not found' });
        // }
        // const nutritionTemplate = await NutritionTemplate.findByPk(nutritionTemplateId);
        // if (!nutritionTemplate) {
        //   return res.status(404).json({ error: 'Nutrition template not found' });
        // }
        // const workoutTemplate = await WorkoutTemplate.findByPk(workoutTemplateId);
        // if (!workoutTemplate) {
        //   return res.status(404).json({ error: 'Workout template not found' });
        // }
        client.name = name;
        client.birthday = birthday;
        client.height = height;
        client.weight = weight;
        client.weakness = weakness;
        client.strengths = strengths;
        client.injuries = injuries;
        client.goal = goal;
        client.medicalHistory = medicalHistory;
        client.gender = gender;
        client.phoneNumber = phoneNumber;
        client.type = type;
        client.profileImage = profileImage;
        await client.save();
        // await client.setCoaches(coaches);
        // client.setNutritionTemplate(nutritionTemplate);
        // client.setWorkoutTemplate(workoutTemplate);
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update the client' });
    }
};

// Delete a client
const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        await client.removeCoaches();
        await client.setNutritionTemplate(null);
        await client.setWorkoutTemplate(null);
        await client.destroy();
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete the client' });
    }
};

// Get the coaches assigned to a client
const getClientCoaches = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await Client.findByPk(id, { include: [{ model: Coach }] });
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json(client.Coaches);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch the coaches of the client' });
    }
};


// Get the workout templates assigned to a client
const getClientWorkoutTemplates = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await Client.findByPk(id, {
            include: [{ model: WorkoutTemplate }],
        });
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        const workoutTemplates = await client.getWorkoutTemplates();
        res.json(workoutTemplates);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch the workout templates of the client' });
    }
};


// Get the nutrition template assigned to a client
const getClientNutritionTemplate = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const client = await Client.findByPk(id, { include: [{ model: NutritionTemplate }] });
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json(await client.getNutritionTemplates());
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch the nutrition template of the client' });
    }
};
// Get the workout template assigned to a client by coach ID
const getClientWorkoutTemplateByCoachId = async (req, res) => {
    const { id, coachId } = req.params;
    try {
        const client = await Client.findByPk(id, {
            include: [
                {
                    model: Coach,
                    where: { id: coachId },
                    include: [{ model: WorkoutTemplate }],
                },
            ],
        });
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        const workoutTemplate = client.Coaches[0].WorkoutTemplate;
        res.json(workoutTemplate);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch the client workout template' });
    }
};

// Get the nutrition template assigned to a client by coach ID
const getClientNutritionTemplateByCoachId = async (req, res) => {
    const { id, coachId } = req.params;
    try {
        const client = await Client.findByPk(id, {
            include: [
                {
                    model: Coach,
                    where: { id: coachId },
                    include: [{ model: NutritionTemplate }],
                },
            ],
        });
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        const nutritionTemplate = client.Coaches[0].NutritionTemplate;
        res.json(nutritionTemplate);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch the client nutrition template' });
    }
};

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
    getClientCoaches,
    getClientWorkoutTemplates,
    getClientNutritionTemplate,
    getClientWorkoutTemplateByCoachId,
    getClientNutritionTemplateByCoachId
};

