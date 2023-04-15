import { type Document, type ObjectId } from 'mongoose';

export interface IOrganization extends Document {
    ownerName: string;
    name: string;
    participants: string[];
    _id: ObjectId;
}