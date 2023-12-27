import mongoose, { Schema, model, Document, ObjectId } from "mongoose";

interface userType extends Document {
    name: String;
    email: String;
    date_of_birth: Date;
    password: String;
}

const userSchema: Schema<userType> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    password: { type: String, required: true },
});

const User = model<userType>("User", userSchema) || model("User", userSchema);

const getAllUser = async (): Promise<userType[]> => {
    return await User.find();
};

const getUserById = async (id: ObjectId): Promise<userType | null> => {
    return await User.findById(id);
};


const createUser = async (userdata: userType): Promise<userType | null> => {
    return await User.create(userdata);
}

const updateUser = async (id: ObjectId, data: Partial<userType>): Promise<userType | null> => {
    return await User.findByIdAndUpdate(id, data, { new: true });
}

const deleteUser = async (id: ObjectId): Promise<void> => {
    await User.findByIdAndDelete(id);
}


export {getAllUser,getUserById,createUser,updateUser,deleteUser};