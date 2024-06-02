import mongoose from 'mongoose';
import Player from '../Models/Player.js';

export const createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    await player.save();
    res.status(201).send(player);
  } catch (error) {
    console.log('error', error);
    res.status(400).send(error);
  }
};

export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).send(players);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).send();
    }
    res.status(200).send(player);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!player) {
      return res.status(404).send();
    }
    res.status(200).send(player);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).send();
    }
    res.status(200).send(player);
  } catch (error) {
    res.status(500).send(error);
  }
};
