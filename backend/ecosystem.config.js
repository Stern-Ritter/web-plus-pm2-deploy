const dotenv = require('dotenv');

dotenv.config({ path: './.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF,
} = process.env;

module.exports = {
  apps: [
    {
      name: "backend",
      script: "./dist/app.js",
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: "https://github.com/Stern-Ritter/web-plus-pm2-deploy",
      path: DEPLOY_PATH,
      ssh_options: "StrictHostKeyChecking=no",
      "pre-deploy-local": `scp .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      "post-deploy":
        "cd backend && npm i && npm run build && pm2 start ecosystem.config.js --only backend",
    },
  },
};
