import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AddPost from '../components/AddPost'
import { deletePost, fetchPosts } from '../api/post'
import { useNavigate } from "react-router-dom"
import { Post } from '../types'


const PostLists = () => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get Data
  const { isLoading, isError, data: posts, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  })
  // Delete Data
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    }
  });

  if (isLoading) return <h1> Loading ... </h1>
  if (isError) return <h1>{error.message}</h1>

  const handleDelete = (id?: string) => deletePostMutation.mutate(id as string)

  return (
    <div className='h-[758px] w-[583px]  text-white bg-[#1d1825] py-[55px] px-[65px] rounded-[20px]'>
      <AddPost />
      <div className='h-[400px] overflow-y-auto px-4'>
        {posts.map((post: Post) => (
          <div key={post.id}
            className='p-[22px] bg-[#15101c] mb-[16px] rounded-[10px] flex justify-between'>
            <h4 onClick={() => navigate(`/post/${post.id}`)}>{post.title}</h4>
            <div className='flex gap-4'>
              <button onClick={() => navigate(`/post/${post.id}/edit`)}> Edit </button>
              <button onClick={() => handleDelete(post.id)}> Delete </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostLists