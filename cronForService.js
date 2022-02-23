const axios = require('axios');
const CronJob = require('cron').CronJob;
const dotenv = require('dotenv');
dotenv.config();
const logger = require('./logger');

const job = new CronJob('* * * * * *', async function () {
    console.log('You will see this message every minute');
    try {
        const response = await axios.delete(process.env.URL_DELETE, {
            auth: {
                username: process.env.USERNAME,
                password: process.env.PASSWORD
            }
        });
        logger.info(response.data.message);
        //job.stop();
    } catch (error) {
        logger.error(error.response?.data?.message + '-' + error.response?.data?.file + '-' + error.response?.data?.line);
    }
}, null, true, process.env.TIME_ZONE);
job.start();
