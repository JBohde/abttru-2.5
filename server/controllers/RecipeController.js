const axios = require('axios');
const { Recipe, User } = require('../models');

const appId = process.env.EDAMAME_APP_ID;
const appKey = process.env.EDAMAME_APP_KEY;

module.exports = {
  searchRecipes: (req, res) => {

  },

  getRecipe: async (req, res) => {
    const { params: { id } } = req;
    try {
   const recipe = await Recipe.findOne({ where: { id } })
        const recipeUri = recipe.dataValues.recipe_uri;
        const encodedUri = encodeURI(recipeUri);
        axios
          .get(`https://api.edamam.com/search?r='${encodedUri}&app_id=${appId}&app_key=${appKey}`)
          .then(response => {
            console.log(response.data);
          });
        } catch(error) {
        res.send(error);
      };
  },

  createRecipe: async (req, res) => {
    try {
      const recipe = await Recipe.create(req.body);
      await User.findOneAndUpdate(
        { _id: recipe.userId },
        { $push: { recipes: recipe } },
        { upsert: true, new: true }
      );
      res.json(recipe);
    } catch (error) {
      res.status(422).json(error);
    }
  },

  updateRecipe: async (req, res) => {
    const { params: { id }, body } = req;
    try {
      const recipe = await Recipe.findOneAndUpdate({ _id: id }, body);
      res.json(recipe);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  deleteRecipe: async (req, res) => {
    try {
      const recipe = await Recipe.findOneAndRemove({ _id: req.params.id });
      await User.findByIdAndUpdate(
        { _id: recipe.userId },
        { $pull: { recipes: recipe._id } },
        { new: true }
      );
      res.json(recipe);
    } catch (err) {
      res.json(err);
    }
  },
};
