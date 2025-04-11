import { Client, Databases, Query, Storage } from "appwrite";
import { ID } from "appwrite";
import conf from '../conf/conf.js';

export class AppwriteService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create a transaction (Deposit/Withdraw)
    // In atmService.js (or wherever the withdrawal logic is)
    async createTransaction({ amount, type, status, userid, timestamp }) {
      try {
        const transaction = await this.databases.createDocument(
          conf.appwriteDatabaseId,      // Database ID
          conf.appwriteCollectionId,    // Collection ID
          ID.unique(),                  // Automatically generate a unique ID for the transaction
          {
            amount,
            type,
            status,
            userid,
            timestamp,
          }
        );
        console.log('Transaction created:', transaction);
        return transaction;
      } catch (error) {
        console.error('Error during transaction creation:', error);
        throw error; // Rethrow error to be handled in the component
      }
    }



    // Get user transactions
    async getTransactions() {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status", "success") // Example query to fetch successful transactions
                ]
            );

            return response;
        } catch (error) {
            console.error("Error fetching transactions:", error);
            return null;
        }
    }

    async updateBalance(userid, newBalance) {
      try {
        return await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId, // Replace with your actual collection ID
          userid, // Assuming userId is the document ID
          {
            balance: newBalance, // Update balance
          }
        );
      } catch (error) {
        console.error("AppwriteService :: updateBalance :: error", error);
      }
    }
    
}

const appwriteService = new AppwriteService();
export default appwriteService;
