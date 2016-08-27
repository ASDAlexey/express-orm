import nconf from 'nconf';
import path from 'path';

nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'config-default.json') });

if (!nconf.get('NODE_ENV')) {
    nconf.add('global', { type: 'file', file: path.join(__dirname, 'config-development.json') });
} else if (nconf.get('NODE_ENV') === 'production') {
    nconf.add('global', { type: 'file', file: path.join(__dirname, 'config-production.json') });
}
if (!nconf.get('NODE_ENV')) nconf.set('NODE_ENV', 'development');

export default nconf;
