import { Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { dark, theme as th } from "../themes/main";

function GuestLayout() {
  return (
    <ThemeProvider theme={th}>
      <Container
        maxWidth="md"
        disableGutters
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          height: '100vh',
          minWidth: '100%',
        }}
      >
        {/* Background Box (hidden on mobile with sx) */}
        <Box
          sx={{
            display: { sm: 'none', lg: 'flex' },
            width: { sm: '60%' },
            height: '100vh',
            backgroundColor: '#0067662e',
            backgroundImage: 'url("/assets/cspj-bg1.jpeg")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: theme => `2px solid ${theme.palette.primary.main}`,
          }}
        />

        {/* Content Area */}
        <Box
          sx={{
            width: { sm: '100%', lg: '40%' },
            padding: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default GuestLayout;
