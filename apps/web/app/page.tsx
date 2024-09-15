import CardSection from "./_components/cardSection";
import Footer from "./_components/footer";
import HomeSection from "./_components/homeSectiom";
import Navbar from "./_components/navbar";

export default function Home() {
  return <div className="bg-slate-50 ">
    <Navbar/>
    <HomeSection/>
    <CardSection/>
    <Footer/>
  </div>
}
