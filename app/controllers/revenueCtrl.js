const { getActiveCustomer } = require("../activeCustomer");
const { getRevProducts, getCompletedOrders } = require("../models/Order");
const colors = require("colors/safe");
const { displayWelcome } = require("../ui");

module.exports.displayRevReport = () => {
  return new Promise((resolve, reject) => {
    let { id } = getActiveCustomer();
    getCompletedOrders(id).then(orderIds => {
      if (orderIds.length === 0) {
        resolve(false);
        return;
      }
      console.log(
        `Revenue report for ${orderIds[0].first_name} ${orderIds[0].last_name}`
      );
      console.log("");
      printHeader(orderIds, id)
      .then(done => {
          if (done) resolve(true);
      });
    });
  });
};

const printHeader = (orderIds, id) => {
  return new Promise((resolve, reject) => {
    let total = 0;
    let count = 0;
    orderIds.forEach(({ order_id }) => {
      getRevProducts(order_id, id)
        .then(products => {
          console.log(`Order #${order_id}`);
          console.log("-".repeat(50));
          return printProducts(products);
        })
        .then(orderTotal => {
          total += +orderTotal;
          count++;
          console.log("");
          console.log(`Order Total: ${formatPrice(orderTotal)}`);
          console.log("");
          if (count === orderIds.length) {
            printTotal(total);
            resolve(true);
          }
        });
    });
  });
};

const printProducts = products => {
  return new Promise((resolve, reject) => {
    let orderTotal = 0;
    const space = " ";
    products.forEach(
      ({ order_id, product_id, count, title, price, products }) => {
        price = price.replace(".", "");
        orderTotal += +price * +count;
        console.log(
          `${title}${space.repeat(35 - +title.length)}${count}${space.repeat(
            5 - count.toString.length
          )}${formatPrice(price * +count)}`
        );
      }
    );
    resolve(orderTotal);
  });
};

const printTotal = total => {
  console.log(`TOTAL REVENUE: ${formatPrice(total)}`);
};

const formatPrice = price => {
  return `$${price.toString().slice(0, -2)}.${price.toString().slice(-2)}`;
};
