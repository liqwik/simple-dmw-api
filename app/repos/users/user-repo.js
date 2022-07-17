const BaseRepository = require('app/repos/base-repository');

const UserRepository = function ({ model }) {
  const userModel = model;

  return {
    ...BaseRepository(userModel),

    isExist: async (identity) => {
      const total = await userModel.countDocuments({
        $or: [{ ph: identity }, { em: identity }],
      });

      return total > 0;
    },

    findOneAndUpdate: (filter, update, options) =>
      userModel.findOneAndUpdate(filter, update, options),
  };
};

module.exports = UserRepository;
