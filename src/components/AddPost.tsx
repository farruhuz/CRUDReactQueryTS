import { useMutation, useQueryClient } from '@tanstack/react-query'
import PostForm from './PostForm'
import { createPost } from '../api/post'
import { v4 as uuidv4 } from 'uuid'
import { InitialValue, Post, } from '../types'
const AddPost = () => {

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    }
  })
  const handlePost = (post: InitialValue) => {
    let obj: Post = { ...post, id: uuidv4() };
    createPostMutation.mutate(obj)
  }
  return (
    <div className='flex flex-col items-center'>
      <h2> Add new post </h2>
      <PostForm onSubmit={handlePost} initialValue={{} as Post} />
    </div>
  )
}

export default AddPost
