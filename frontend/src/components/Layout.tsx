import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Container maxWidth="sm">
       <Stack direction="column" spacing={2}>
        <Typography  sx={{ textAlign: 'center' }} variant="h4"  >Витрина кинотеатра</Typography>
        <Outlet />
      </Stack>
    </Container>
  );
}
