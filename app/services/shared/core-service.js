const { generateOrderNo } = require('app/utils/string');

const CoreService = function ({ rfqRepo, rfqOrderRepo, purchaseOrderRepo }) {
  const generateUniqueOrderNo = async () => {
    const orderNo = generateOrderNo();

    /** Is duplicate => Regenerate */
    const poExist = await purchaseOrderRepo.count({
      orderNo,
    });

    if (poExist && poExist > 0) return generateUniqueOrderNo();

    return orderNo;
  };

  const generateUniqueRfqOrderNo = async () => {
    const orderNo = generateOrderNo();
    const rfqOrderNo = `RFQ-${orderNo}`;
    /** Is duplicate => Regenerate */
    const isExist = await rfqOrderRepo.count({
      orderNo: rfqOrderNo,
    });

    if (isExist && isExist > 0) return generateUniqueRfqOrderNo();

    return rfqOrderNo;
  };

  const generateUniqueQuoteNo = async () => {
    const num = generateOrderNo();
    const quoteNum = `Q${num}`;
    /** Is duplicate => Regenerate */
    const isExist = await rfqRepo.count({
      qNum: quoteNum,
    });

    if (isExist && isExist > 0) return generateUniqueQuoteNo();

    return quoteNum;
  };

  return Object.freeze({
    generateUniqueOrderNo,
    generateUniqueRfqOrderNo,
    generateUniqueQuoteNo,
  });
};

module.exports = CoreService;
