'use strict';
/**
 *  sale controller
 */
// 2

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::deposit.deposit', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;
    try {
      const entry = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { id: data.user }
      });
      if (entry) {
        const newBalance = await strapi.entityService.create('api::balance.balance', ctx.request.body);
        console.log('🚀 ~ create ~ newBalance', newBalance);
      }

      const response = await super.create(ctx.request.body);

      return response;
    } catch (error) {
      return ctx.badRequest(403, [
        { messages: [{ error: error }, { id: 'You are not the owner' }] },
      ]);
    }
  },

  // async update(ctx) {
  //   const { id } = ctx.params;
  //   const { user } = ctx.state;
  //   try {
  //     const entry = await strapi.entityService.findOne('api::sale.sale', id, {
  //       populate: { user: true },
  //     });
  //     if (entry.user.id !== user.id) {
  //       ctx.throw(403, 'You are not authorized to perform this action.');
  //       return;
  //     }

  //     const response = await super.update(ctx);

  //     return response;
  //   } catch (error) {
  //     return ctx.badRequest(403, [
  //       { messages: [{ error: error }, { id: 'You are not the owner' }] },
  //     ]);
  //   }
  // },

  // async delete(ctx) {
  //   const { id } = ctx.params;
  //   const { user } = ctx.state;
  //   try {
  //     const entry = await strapi.entityService.findOne('api::sale.sale', id, {
  //       populate: { user: true },
  //     });

  //     if (entry.user.id !== user.id) {
  //       ctx.throw(403, 'You are not authorized to perform this action.');
  //       return;
  //     }

  //     const response = await super.delete(ctx);

  //     return response;
  //   } catch (error) {
  //     return ctx.badRequest(403, [
  //       { messages: [{ id: 'You are not the owner' }] },
  //     ]);
  //   }
  // },
  calcProffit(total, percent) {
    const perc = percent / 100;
    return perc * total;
  },
}));
