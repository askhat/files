export const PORT = process.env['PORT'] || 2018
export const ENCODING = process.env['ENCODING'] || 'utf8'
export const ORIGINS = process.env['ORIGINS']
                    && process.env['ORIGINS'].split(',')
                    || ['http://localhost:8080', 'http://localhost:2018']
