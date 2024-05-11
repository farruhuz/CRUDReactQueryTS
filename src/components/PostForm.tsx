import { useState, ChangeEvent, FormEvent } from "react";
import { PostProps, Post } from "../types";

const PostForm = (props: PostProps) => {

  const [post, setPost] = useState<Post>({
    title: props.initialValue.title || "",
    body: props.initialValue.body || ""
  });

  const handeChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!post.title || !post.body) return
    props.onSubmit(post);
    setPost({
      title: "",
      body: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-4">
      <div className="flex flex-col items-center">
        <input
          onChange={handeChangeInput}
          type="text"
          name="title"
          value={post.title}
          placeholder="Title"
          className="input w-full max-w-xs mb-4"
        />
        <input
          onChange={handeChangeInput}
          type="text"
          name="body"
          value={post.body}
          placeholder="Body"
          className="input w-full max-w-xs"
        />
      </div>
      <div className="flex justify-end my-4">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form >
  );
};

export default PostForm;
