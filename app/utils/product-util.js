const { dateLib } = require('lib/datetime');

module.exports = function () {
  const getPrice = ({ regPrice, salePrice, endAt }) => {
    const currentDate = dateLib().local();
    const endDate = dateLib.utc(endAt).local();
    const diff = endDate.diff(currentDate, 's');

    return diff > 0 ? salePrice : regPrice;
  };

  const getProductsTotalPrice = (productList) => {
    const result = productList.reduce((prevVal, product) => {
      const { endAt } = product;
      const { regPrice, salePrice, offerPrice } = product.pricing;

      let price = getPrice({ regPrice, salePrice, endAt });
      if (offerPrice) price = offerPrice;
      prevVal += product.qty * price;

      return prevVal;
    }, 0);

    return result;
  };

  return {
    getPrice,
    getProductsTotalPrice,
  };
};
