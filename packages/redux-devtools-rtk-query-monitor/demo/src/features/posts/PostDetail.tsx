import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeletePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
} from '../../services/posts';
import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Heading,
  Input,
  Spacer,
  Stack,
} from '@chakra-ui/react';
import { toaster } from '../../components/ui/toaster';

const EditablePostName = ({
  name: initialName,
  onUpdate,
  onCancel,
  isLoading = false,
}: {
  name: string;
  onUpdate: (name: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}) => {
  const [name, setName] = useState(initialName);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setName(value);

  const handleUpdate = () => onUpdate(name);
  const handleCancel = () => onCancel();

  return (
    <Flex>
      <Box flex={10}>
        <Input
          type="text"
          onChange={handleChange}
          value={name}
          disabled={isLoading}
        />
      </Box>
      <Spacer />
      <Box>
        <Stack gap={4} direction="row" align="center">
          <Button onClick={handleUpdate} loading={isLoading}>
            Update
          </Button>
          <CloseButton bg="red" onClick={handleCancel} disabled={isLoading} />
        </Stack>
      </Box>
    </Flex>
  );
};

const PostJsonDetail = ({ id }: { id: string }) => {
  const { data: post } = useGetPostQuery(id);

  return (
    <Box mt={5} bg="#eee">
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </Box>
  );
};

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const { data: post, isLoading } = useGetPostQuery(id!);

  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return (
      <Center h="200px">
        <Heading size="md">
          Post {id} is missing! Try reloading or selecting another post...
        </Heading>
      </Center>
    );
  }

  return (
    <Box p={4}>
      {isEditing ? (
        <EditablePostName
          name={post.name}
          onUpdate={async (name) => {
            try {
              await updatePost({ id: id!, name }).unwrap();
            } catch {
              toaster.create({
                title: 'An error occurred',
                description: "We couldn't save your changes, try again!",
                type: 'error',
                duration: 2000,
                closable: true,
              });
            } finally {
              setIsEditing(false);
            }
          }}
          onCancel={() => setIsEditing(false)}
          isLoading={isUpdating}
        />
      ) : (
        <Flex>
          <Box>
            <Heading size="md">{post.name}</Heading>
          </Box>
          <Spacer />
          <Box>
            <Stack gap={4} direction="row" align="center">
              <Button
                onClick={() => setIsEditing(true)}
                disabled={isDeleting || isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Edit'}
              </Button>
              <Button
                onClick={() => deletePost(id!).then(() => navigate('/posts'))}
                disabled={isDeleting}
                colorScheme="red"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </Stack>
          </Box>
        </Flex>
      )}
      <PostJsonDetail id={post.id} />
    </Box>
  );
};
