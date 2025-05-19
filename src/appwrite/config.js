import { Client, Databases, Query, Storage } from "appwrite";
import { ID } from "appwrite";
import conf from '../conf/conf.js';
<<<<<<< Updated upstream
<<<<<<< Updated upstream

export class AppwriteService {
    client = new Client();
    databases;
    bucket;
=======
import { Client, ID, Databases } from "appwrite";

export class ATMService {
    client = new Client();
    databases;
>>>>>>> Stashed changes
=======
import { Client, ID, Databases } from "appwrite";

export class ATMService {
    client = new Client();
    databases;
>>>>>>> Stashed changes

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
        this.databases = new Databases(this.client);
    }

<<<<<<< Updated upstream
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
=======
    // ✅ Create a new transaction (deposit/withdraw)
    async createTransaction({ type, amount, date, userId }) {
>>>>>>> Stashed changes
=======

        this.databases = new Databases(this.client);
    }

    // ✅ Create a new transaction (deposit/withdraw)
    async createTransaction({ type, amount, date, userId }) {
>>>>>>> Stashed changes
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
                conf.appwriteCollectionId, // e.g., "transactions"
                ID.unique(),
                {
                    type,
                    amount,
                    date,
                    userId
                }
            );
        } catch (error) {
            console.log("ATMService :: createTransaction :: error", error);
        }
    }

=======
                conf.appwriteCollectionId, // e.g., "transactions"
                ID.unique(),
                {
                    type,
                    amount,
                    date,
                    userId
                }
            );
        } catch (error) {
            console.log("ATMService :: createTransaction :: error", error);
        }
    }

>>>>>>> Stashed changes
    // ✅ Update a transaction (optional, not always needed)
    async updateTransaction(documentId, { type, amount, date }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId,
                {
                    type,
                    amount,
                    date
                }
            );
        } catch (error) {
            console.log("ATMService :: updateTransaction :: error", error);
        }
    }

    // ✅ Get all transactions for current user
    async getTransactions(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("userId", userId),
                    Query.orderDesc("$createdAt")
                ]
            );
        } catch (error) {
            console.log("ATMService :: getTransactions :: error", error);
        }
    }

    // ✅ Delete a transaction (optional)
    async deleteTransaction(documentId) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId
            );
        } catch (error) {
            console.log("ATMService :: deleteTransaction :: error", error);
        }
    }
}

const atmService = new ATMService();
export default atmService;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
