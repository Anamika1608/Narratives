import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
   client = new Client();
   account;
   constructor(){
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)
    this.account = new Account(this.client)
   }

   async createAccount({email,password,name}) {
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount) return this.login({email,password });
            else throw new Error;
        }
        catch(error){
            throw error;
            console.log(error);
        }
   }

   async login({email,password}){
        try{
            return this.account.createEmailPasswordSession(email,password)
        }
        catch(e){
            throw e;
            console.log(e);
        }
   }

   async getUser(){
    try {
        return await this.account.get();
    } catch (error) {
        console.log("the get user error - ", error)
    }
    return null;
   }

   async logOut(){
    try {
        return await this.account.deleteSessions();
    } catch (error) {
        console.log("the log out error - ", error)
    }
   }
} 

const authService = new AuthService();

export default authService;