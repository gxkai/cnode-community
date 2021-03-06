import {
  Author,
  TopicDetailEntity,
  UserInfoEntity
} from "@/types/responseEntity";

export function emptyAuthor(): Author {
  return {
    avatar_url: "",
    loginname: ""
  };
}

export function emptyTopicDetailEntity(): TopicDetailEntity {
  const author = emptyAuthor();
  return {
    author: author,
    author_id: "",
    content: "",
    create_at: "",
    good: false,
    id: "",
    is_collect: false,
    last_reply_at: "",
    replies: [],
    reply_count: 0,
    tab: "share",
    title: "",
    top: false,
    visit_count: 0
  };
}

export function emptyUserInfo(): UserInfoEntity {
  return {
    avatar_url: "",
    create_at: "",
    githubUsername: "",
    loginname: "",
    recent_replies: [],
    recent_topics: [],
    score: 0
  };
}
