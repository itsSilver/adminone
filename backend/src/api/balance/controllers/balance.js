'use strict';
/**
 *  balance controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::balance.balance', ({ strapi }) => ({
  async getBalance(ctx) {
    // const { data } = ctx.request.body;
    const { user } = ctx.state;
    try {
      // const entry = await strapi.db.query('plugin::users-permissions.user').findOne({
      //   where: { id: data.user }
      // });
      const { role } = user;

      if (role.name === 'superadmin') {
        const entries = await strapi.entityService.findMany(
          'api::balance.balance',
          {
            populate: ['user', 'user.role', 'user.child'],
          }
        );

        const adminBalance = entries.filter((item) => {
          return item.user.role.name === 'client';
        });

        const totalMoney = adminBalance.reduce((n, { total }) => n + total, 0);

        const totalProff = [];
        adminBalance.forEach((item) => {
          const dada = this.calcProffit(
            Number(item.total),
            item.user.percentage
          );
          totalProff.push(dada);
        });

        const totalProffit = totalProff.reduce((a, b) => a + b, 0);

        return {
          data: adminBalance,
          totalMoney: totalMoney,
          totalProffit: totalProffit,
        };
      } else if (role.name === 'client') {
        const entries = await strapi.entityService.findMany(
          'api::balance.balance',
          {
            populate: ['user', 'user.role', 'user.child'],
          }
        );

        const adminBalance = entries.filter((item) => {
          return item.user.id === user.id || item.user.child.id === user.id;
        });

        const totalMoney = adminBalance.reduce((n, { total }) => n + total, 0);

        const totalProff = [];
        adminBalance.forEach((item) => {
          const perc = item.user.id === user.id ? 100 : item.user.percentage;
          const dada = this.calcProffit(
            Number(item.total),
            perc
          );
          totalProff.push(dada);
        });

        const totalProffit = totalProff.reduce((a, b) => a + b, 0);

        return {
          data: adminBalance,
          totalMoney: totalMoney,
          totalProffit: totalProffit,
        };
      } else {
        const entries = await strapi.entityService.findMany(
          'api::balance.balance',
          {
            populate: ['user', 'user.role', 'user.child'],
          }
        );

        const adminBalance = entries.filter((item) => {
          return item.user.id === user.id;
        });

        const totalMoney = adminBalance.reduce((n, { total }) => n + total, 0);

        const totalProff = [];
        adminBalance.forEach((item) => {
          const perc = item.user.id === user.id ? 100 : item.user.percentage;
          const dada = this.calcProffit(
            Number(item.total),
            perc
          );
          totalProff.push(dada);
        });

        const totalProffit = totalProff.reduce((a, b) => a + b, 0);

        return {
          data: adminBalance,
          totalMoney: totalMoney,
          totalProffit: totalProffit,
        };
      }
    } catch (error) {
      return ctx.badRequest(403, [
        { messages: [{ error: error }, { id: 'Error, try again' }] },
      ]);
    }
  },
  calcProffit(total, percent) {
    const perc = percent / 100;
    const value = perc * total;
    const parsed = parseFloat(total - value);
    return parsed;
  },
}));
