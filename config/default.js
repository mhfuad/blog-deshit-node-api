const config = {
    jwtSecret: process.env.JWT_SECRET || 'fallbacksecretforemptyenv',
    jwtExpiration: '1h' // Token expires in 1 hour
};

export default config;