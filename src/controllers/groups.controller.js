import sequelize from '../config/config.js';
import AppError from '../errors/AppError.js';
const { groups: groupsModel } = sequelize.models;

// Get all the groups
export async function getGroups(req, res) {
  const { limit } = req.query;
  const allGroups = await groupsModel.findAndCountAll({
    limit: limit ? Number(limit) : limit
  });
  if (!allGroups) throw new AppError('Groups not found', 400);
  return res.status(200).json(allGroups);
}

// Get group by id
export async function getGroupById(req, res) {
  const { id } = req.params;
  const group = await groupsModel.findByPk(id);
  if (!group) {
    throw new AppError('Group not found', 400);
  }
  return res.state(200).json(group);
}

// Create a match
export async function createGroup(req, res) {
  const { name } = req.body;
  const newGroup = await groupsModel.create({
    name
  });
  await newGroup.save();
  return res.status(201).json({ message: 'Group created successfully', data: newGroup });
}

// Update some group
export async function updateGroup(req, res) {
  const { body, params: { id } } = req;
  const group = await groupsModel.findByPk(id);
  if (!group) throw new AppError('Group not found', 400);

  const updatedGroup = await group.update({
    name: body.name
  });
  return res.json({ message: 'Group created successfully', data: updatedGroup });
}
