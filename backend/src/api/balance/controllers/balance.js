'use strict';
/**
 *  sale controller
 */
// 2

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::balance.balance', ({ strapi }) => ({
  async getBalance(ctx) {
    const { data } = ctx.request.body;
    try {
      // const entry = await strapi.db.query('plugin::users-permissions.user').findOne({
      //   where: { id: data.user }
      // });

      const newBalance = await strapi.entityService.create('api::balance.balance', ctx.request.body);

      const response = await super.create(ctx);

      return response;
    } catch (error) {
      return ctx.badRequest(403, [
        { messages: [{ error: error }, { id: 'You are not the owner' }] },
      ]);
    }
  },
  calcProffit(total, percent) {
    const perc = percent / 100;
    return perc * total;
  },
}));
