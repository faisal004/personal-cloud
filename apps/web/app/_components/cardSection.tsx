import Card from "./card";



const CardSection = () => {
    return ( <div className="grid py-24 md:grid-cols-2 grid-cols-1 mx-auto max-w-[1200px] gap-10 px-12  ">
       <Card
        image="/2.png"
        head="Easily access apps and data from your iPhone on the web"
        subhead="iCloud is essential for keeping personal information from your devices safe, up to date, and available wherever you are. At iCloud.com, you can access your photos, files, and more from any web browser. Changes you make will sync to your iPhone and other devices, so you’re always up to date."
      />
         <Card
        image="/1.png"
        head="More storage plus additional features to protect your privacy"
        subhead="iCloud is essential for keeping personal information from your devices safe, up to date, and available wherever you are. At iCloud.com, you can access your photos, files, and more from any web browser. Changes you make will sync to your iPhone and other devices, so you’re always up to date."
      />
    </div> );
}
 
export default CardSection;