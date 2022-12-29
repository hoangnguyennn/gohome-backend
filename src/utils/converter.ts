import slug from 'slug'
import { v4 as uuidV4 } from 'uuid'
import { ICategory } from '~/interfaces/IDocument'

export const getSlug = (title: string) => {
  return `${slug(title)}-${uuidV4()}`
}

export const getPostCode = (category: ICategory) => {
  return `${category.code}-${category.count + 1}`
}

export const getNewId = () => {
  return uuidV4()
}
