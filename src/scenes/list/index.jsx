import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const MovieList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <Box m="20px">
        <Header title="Movies" subtitle="List of favorite movies" />
  
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
            The Shawshank Redemption
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
            The Godfather
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
            The Dark Knight
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
            Schindler's List
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
            Pulp Fiction
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
            The Lord of the Rings: The Return of the King
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
            Forrest Gump
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold through the perspective of an Alabama man.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
            Fight Club
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.
            </Typography>
          </AccordionDetails>
        </Accordion> */}
      </Box>
    );
};

export default MovieList;
