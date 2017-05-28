import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const QuestionsSchema = new SimpleSchema({
  _id: { type: String, optional: true },
  createdAt: { type: Date, optional: true },
  createdBy: { type: String, optional: true },
  pollId: { type: String, optional: true },

  title: { type: String, optional: true },
  isEnabled: { type: Boolean, optional: true },
  isOpen: { type: Boolean, optional: true },
  showResults: { type: Boolean, optional: true },
});
