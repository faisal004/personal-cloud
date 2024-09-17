import CardSection from "./_components/cardSection";
import HomeSection from "./_components/homeSectiom";
import Navbar from "./_components/navbar";
import "@uploadthing/react/styles.css";
export default function Home() {
  return <div className="bg-slate-50 ">
          <Navbar/>

    <HomeSection/>
    <CardSection/>
  </div>
}
