
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPost, updatePost } from '../api/post';
import { InitialValue, Post } from '../types'; // Assuming you have these types defined


const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, isError, data: post, error } = useQuery<Post>({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id as string)
  });

  const updatedPostMutation = useMutation<Post, any, InitialValue>({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const handleSubmit = (updatedPost: InitialValue) => {
    let obj: Post = { ...updatedPost, id };
    updatedPostMutation.mutate(obj);
    navigate(-1);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error?.message}</h1>;

  console.log(post);

  return (
    <div className='w-96'>
      <PostForm onSubmit={handleSubmit} initialValue={post as Post} />
    </div>
  );
};

export default EditPost;
