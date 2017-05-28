import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const PollsSchema = new SimpleSchema({
  _id: { type: String, optional: true },
  createdAt: { type: Date, optional: true },
  createdBy: { type: String, optional: true },

  title: { type: String, optional: true },
  isPublic: { type: Boolean, optional: true },
});
