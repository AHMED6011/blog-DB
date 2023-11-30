const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::blog.blog", ({ strapi }) => ({
  async exampleAction(ctx) {
    try {
      ctx.body = "ok";
    } catch (err) {
      ctx.body = err;
    }
  },

  async customFind(ctx) {
    ctx.query = { ...ctx.query, local: "en" };

    const { data, meta } = await strapi.services.blog.find(ctx);

    meta.date = Date.now();

    return { data, meta };
  },

  async customFindWithSanitization(ctx) {
    await this.validateQuery(ctx);

    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const { results, pagination } = await strapi.services.blog.find(
      sanitizedQueryParams
    );
    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedResults, { pagination });
  },
}));
