import {model, Schema, Types, Document} from 'mongoose';

export interface IFile extends Document {
  id: {type: Types.ObjectId, ref: 'File'};
  name: string;
  type: string;
  accessLink: string;
  size: number;
  path: string;
  user: {type: Types.ObjectId, ref: 'User'};
  parent: {type: Types.ObjectId, ref: 'File'};
  children: [{type: Types.ObjectId, ref: 'File'}];
}

const fileSchema = new Schema<IFile>({
  name: {type: String, required: true},
  type: {type: String, required: true},
  accessLink: {type: String},
  size: {type: Number, default: 0},
  path: {type: String, default: ''},
  user: {type: Types.ObjectId, ref: 'User'},
  parent: {type: Types.ObjectId, ref: 'File'},
  children: [{type: Types.ObjectId, ref: 'File'}],
});

const File = model<IFile>('File', fileSchema);

export default File;
