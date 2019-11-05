module.exports = {
  dialect: 'postgres',
  host: 'docker',
  username: 'postgres',
  password: 'docker',
  database: 'meetapp',
  defines: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
