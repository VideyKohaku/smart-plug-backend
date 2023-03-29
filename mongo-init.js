db.createUser({
  user: 'dev',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'smartplug_dev',
    },
  ],
});
