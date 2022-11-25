module.exports = () => {
  return {
    autoDetect: true,
    files: ['package.json', 'src/**/*.js', '!src/**/*.test.js'],
    tests: ['src/**/*.test.ts'],
    env: {
      params: {
        env: 'TZ=UTC',
      },
    },
  };
};
