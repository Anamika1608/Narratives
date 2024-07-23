import { createSlice, nanoid } from "@reduxjs/toolkit";
import { ID } from "appwrite";

const initialState = {
    posts : [ {
        id : ID.unique() , 
        title : "" , 
        content : "" , 
        slug : "" , 
        image: "" , 
        status : "" 
    } ]
}

const postSlice = createSlice({
    name : "post",
    initialState,
    reducers : {
        addPost(state,action){

        }
    }
})