import CarList from "./components/CarList"
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <Container maxwidth="xl">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>Car Shop</Typography>
        </Toolbar>
      </AppBar>
      <CarList />
      <CssBaseline>
      </CssBaseline>
    </Container>
  )
}

export default App
