import Navbar from "./Navbar";
import Card from "./Card";

const Deck = ({ data }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center ">
      <Navbar />
      <Card />
    </div>
  );
};

export default Deck;
