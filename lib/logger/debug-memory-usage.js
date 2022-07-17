module.exports = {
  memoryUsage: () => {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    const usedInMB = Math.round(used * 100) / 100;
    console.log(`The script uses approximately ${usedInMB} MB`);

    return `${usedInMB} MB`;
  },
};
