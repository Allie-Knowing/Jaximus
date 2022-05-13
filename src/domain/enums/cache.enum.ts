export enum CacheTemplate {
  ACTION_LIKE = 'action.like.user.',
  ACTION_LIKE_CHECK = 'action.like.check.user.',
  ACTION_CREATE_QUESTION = 'action.create.question.user.',
  ACTION_CREATE_ANSWER = 'action.create.answer.user.',
  ACTION_ADOPTER = 'action.adoptor.user.',
  ACTION_ADOPTED = 'action.adopted.user.',
  LIKE_NOTIFICATION_CHECK = 'like.notification.check.user.',
}

export function generateCacheTemplate(key: string, userId: number): string {
  return key + userId;
}
