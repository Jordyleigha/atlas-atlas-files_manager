import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABSE || 'files_manager';
        const url = 'mongodb://${host}:${port}';

        this.clinet = new MongoClient(url, { useUnifiedTopology: true});

        this.clinet.connect()
        .then(() => {
            console.log('Connected to MongoDB');
            this.db = this.clinet.db(database);
        })
        .catch((err) => {
            console.error('Failed to connect to MongoDB:', err);
        });
    }

    isAlive() {
        return this.clinet.isConnected();
    }

    async checkConnection() {
        return this.db ? true : false;
    }

    async nbUsers() {
        if (!this.db) {
            throw new Error('Database not initialized. Please ensure you are connected to MongoDB.');
        }
        try {
            const usersCollection = this.db.collection('users');
            return await usersCollection.countDocuments();
        } catch (error) {
            console.error('Error counting users:', error);
            return 0;
        }
    }

    async nbFiles() {
        if (!this.db) {
            throw new Error('Databse not initialized. Please ensure you are connected to MongoDB.');
        }
        try {
            const filesCollection = this.db.collection('files');
            return await filesCollection.countDocuments();
        } catch (error) {
          console.error('Error counting files:', error);
          return 0;
        }
    }
}

const dbClient = new DBClient();
export default dbClient;