import { Provider } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import * as path from 'path';

export const GcsProvider: Provider = {
    provide: 'GCS_CLIENT',
    useFactory: () => {
        return new Storage({
            // Cherche directement gcs-key.json à la racine (/usr/src/app/gcs-key.json)
            keyFilename: path.join(process.cwd(), 'gcs-key.json'),
        });
    },
};