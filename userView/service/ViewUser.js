const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError, UnAuthenticatedError } = require('../errors/index');


const viewCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
  };


  module.exports = viewCurrentUser;