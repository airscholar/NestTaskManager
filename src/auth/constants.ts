export const jwtConstants = {
  JWT_SECRET: process.env.SECRET_KEY || 'SampleJWTTOKEN',
  JWT_EXP_TIME: process.env.JWT_EXP_TIME || 3600,
};
