import {Document, model, Schema, Types} from 'mongoose';

export interface IUser extends Document {
  id: { type: Types.ObjectId, ref: 'User' };
  accountId: string;
  limitSpace: number;
  usedSpace: number;
  files: [{ type: Types.ObjectId, ref: 'File' }];
}

const userSchema = new Schema<IUser>({
  accountId: {type: String, required: true},
  limitSpace: {type: Number, default: 1024 ** 3 * 10},
  usedSpace: {type: Number, default: 0},
  files: [{type: Types.ObjectId, ref: 'File'}]
});

const User = model<IUser>('User', userSchema);

export default User;
