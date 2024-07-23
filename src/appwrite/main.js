import config from "../config/config";
import {Client,ID,Databases,Storage,Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    // post related service

    async createPost ({title,slug,content,image,status,userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, // document id
                {title,slug,content,image,status,userId}
            )
        } catch (error) {
            console.log("create post error",error)
        }
    }

    async updatePost ({title,slug,content,image,status}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {title,content,image,status}
        )
        } catch (error) {
            console.log("update post error -",error)
        }
    }

    async deletePost (slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("delete post error -",error);
            return false;
        }
    }

    async getPost (slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("get post error -",error);
            return false;
        }
    }

    async listPost (){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal("status","active") // for query the attribute(STATUS) should have index
                ]
            )
        } catch (error) {
            console.log("get all post error -",error);
            return false;
        }
    } 

    // file upload services

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(), // file id
                file
            )
        } catch (error) {
            console.log("upload file error -",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("delete file error -",error);
            return false;
        }
    }

    filePreview(fileId){
        try {
            return this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("file-preview error -",error);
            return false;
        }
    }
    
};

export const service = new Service();