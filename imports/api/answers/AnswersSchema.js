import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const AnswersSchema = new SimpleSchema({
  _id: { type: String, optional: true },
  createdAt: { type: Date, optional: true },
  createdBy: { type: String, optional: true },
  questionId: { type: String, optional: true },

  title: { type: String, optional: true },
  votedBy: { type: [String], optional: true },
});
