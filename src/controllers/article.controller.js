const db = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getArticles: async (req, res) => {
    try {
      const articles = await db.Article.findAll();
      if (articles.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No articles found",
        });
      }
      return res.status(200).json({
        results: articles,
        success: true,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  searchArticles: async (req, res) => {
    try {
      const articles = await db.Article.findAll({
        where: {
          title: {
            [Op.like]: `%${req.query.string}%`,
          },
        },
      });
      if (articles.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No articles found",
        });
      }
      return res.status(200).json({
        results: articles,
        success: true,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  getArticle: async (req, res) => {
    try {
      if (isNaN(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: "Bad request. No id provided",
        });
      }
      const article = await db.Article.findByPk(req.params.id);

      if (!article) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
        });
      }
      return res.status(200).json({
        results: article,
        success: true,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  /**
   * controller pour créer un article
   */
  createArticle: async (req, res) => {
    try {
      const article = await db.Article.create({
        title: req.body.title,
        content: req.body.content,
      });
      return res.status(201).json({
        success: true,
        message: "Article created",
        results: article,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
