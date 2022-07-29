'use strict';
/**
 *  deposit controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::deposit.deposit', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;
    console.log('🚀 ~ create ~  ctx.request.body', ctx.request.body);
    try {
      const entry = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { id: data.user },
        populate: ['role', 'child']
      });

      if (entry.role.name === 'subclient') {
        const datas = {
          data: {
            total: data.total, status: data.status, user: entry.child.id
          }
        };
        await strapi.entityService.create('api::balance.balance', datas);
      }

      await strapi.entityService.create('api::balance.balance', ctx.request.body);

      const response = await super.create(ctx);

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
