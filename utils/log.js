import winston from 'winston';
import path from 'path';

const ENV = process.env.NODE_ENV;
export default (module) => {
    const resultPath = module.filename.split(path.sep).slice(-2).join(path.sep);
    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                // level: (ENV === 'development') ? 'debug' : 'error',
                label: resultPath,
            }),
        ],
    });
};

