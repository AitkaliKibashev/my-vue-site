export enum AdminPageTabs {
  PROJECT_TAB='PROJECT_TAB',
  POST_TAB='POST_TAB',
  TAG_TAB='TAG_TAB',
  ARCHIVE_TAB='ARCHIVE_TAB',
  NOTIFICATION_TAB='NOTIFICATION_TAB'
}

export type AdminPageTabsType =
  AdminPageTabs.ARCHIVE_TAB
  | AdminPageTabs.POST_TAB
  | AdminPageTabs.PROJECT_TAB
  | AdminPageTabs.TAG_TAB
  | AdminPageTabs.NOTIFICATION_TAB
