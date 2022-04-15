module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '739f11eb1660770b3c3d2f6ae69a6b4e'),
  },
});
