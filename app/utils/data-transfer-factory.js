function DataMapperTransformer(data, dataMapper) {
  this.data = data;
  this.dataMapper = dataMapper;
}

DataMapperTransformer.prototype.toList = function () {
  return this.dataMapper.toDomain(this.data);
};

DataMapperTransformer.prototype.toDomain = function () {
  if (!this.dataMapper || !this.data || this.data.length === 0)
    return this.data;

  if (Array.isArray(this.data)) {
    return this.data.map((item) => this.dataMapper.toDomain(item));
  }

  return this.dataMapper.toDomain(this.data);
};

module.exports = DataMapperTransformer;
