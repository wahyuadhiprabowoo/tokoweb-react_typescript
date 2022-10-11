import { Container } from "@mui/material";
import Banner from "../components/Banner";
import Favorit from "../components/Favorit";
import Hero from "../components/Hero";

function Home() {
  return (
    <div className="">
      <Banner />
      <Container>
        <Favorit />
      </Container>
      <Hero />
    </div>
  );
}

export default Home;
