import mongoose from 'mongoose';
import Match from '../Models/Match.js';

export const createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    await match.save();
    res.status(201).send(match);
  } catch (error) {
    console.log('error', error);
    res.status(400).send(error);
  }
};
