import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('connect', () => {
      console.log('Redis client Connected');
    });

    this.client.on('error', (error) => {
      console.error('Redis client error:', error);
    });
  }

  isAlive() {
    return this.client.connected;
  }