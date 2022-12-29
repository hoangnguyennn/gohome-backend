import { ObjectId } from 'mongodb'

export const isObjectId = (id: string) => {
  return ObjectId.isValid(id)
}
