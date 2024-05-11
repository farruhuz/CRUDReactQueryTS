export type InitialValue = {
  title: string,
  body: string,
  id?: string
}

export type Post = {
  title: string;
  body: string;
  id?: string
}

export type PostProps = {
  onSubmit: (post: Post) => void;
  initialValue: Post;
}
