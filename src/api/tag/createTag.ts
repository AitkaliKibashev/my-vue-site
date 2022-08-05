import { tagAPI } from '@/api/API'

export async function createTag (data: {title: string, slug: string}) {
  try {
    await tagAPI.createTag(data)
  } catch (e) {
  }
}
