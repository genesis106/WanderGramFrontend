import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function AvatarStack({url, alt}) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={alt} src={url} />
    </Stack>
  );
}

export default AvatarStack;
