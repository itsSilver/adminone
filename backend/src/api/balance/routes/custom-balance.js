module.exports = {
  routes: [
    {
      method: "POST",
      path: "/balances/get-balance",
      handler: "balance.getBalance",
    },
  ],
};
