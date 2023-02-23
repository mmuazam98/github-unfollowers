export type User = {
 avatar_url: string;
 bio: string;
 blog: string;
 company: string;
 created_at: string;
 email: string;
 events_url: string;
 followers: number;
 followers_url: string;
 following: number;
 following_url: string;
 gists_url: string;
 gravatar_id: string;
 hireable: string;
 html_url: string;
 id: number;
 location: string;
 login: string;
 name: string;
 node_id: string;
 organizations_url: string;
 public_gists: number;
 public_repos: number;
 received_events_url: string;
 repos_url: string;
 site_admin: boolean;
 starred_url: string;
 subscriptions_url: string;
 twitter_username: string;
 type: string;
 updated_at: string;
 url: string;
};

export enum Theme {
 dark = "dark",
 light = "light",
}

export type AppContextType = {
 theme: string;
 themeToggler: () => void;
 info: { user: User; followers: User[]; following: User[]; notMutual: User[]; unfollowers: User[] };
 setInfo: (prev: any) => void;
 mainLoading: boolean;
 setMainLoading: (loading: boolean) => void;
 contentLoading: boolean;
 setContentLoading: (loading: boolean) => void;
};
