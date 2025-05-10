import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  InstagramIcon as TiktokIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const contactus = () => {
  const companyData = {
    name: "Imperial Cashews",
    address: "Eluwapola, Wewagama, Kuliyapitiya",
    mobile: "0762470513",
    socialMedia: [
      {
        name: "Facebook",
        url: "https://www.facebook.com/share/1ADzqv63oX/",
        icon: Facebook,
      },
      {
        name: "TikTok",
        url: "https://www.tiktok.com/@imperialcashews?_t=ZS-8vgQiBwc9Fy&_r=1",
        icon: TiktokIcon,
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/imperial_cashews?igsh=MXZ0anBmcnRvZ2gxag==",
        icon: Instagram,
      },
    ],
  };

  return (
    <>
      

      <div className=" absolute inset-0 z-10">
        <ContainerScroll
          titleComponent={
            <>
              <div className="flex flex-col items-center text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  Contact Us
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  We'd love to hear from you. Here's how you can reach us.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {companyData.name}
                    </CardTitle>
                    <CardDescription>
                      Get in touch with us directly
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                      <p>{companyData.address}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                      <p>{companyData.mobile}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-2xl">Connect With Us</CardTitle>
                    <CardDescription>Follow us on social media</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      {companyData.socialMedia.map((platform) => (
                        <Link
                          key={platform.name}
                          to={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                        >
                          <platform.icon className="h-5 w-5 mr-3 text-muted-foreground" />
                          <span>{platform.name}</span>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          }
        >
          <div className="myt-16">
            <Card className="shadow-md overflow-hidden p-0">
              <div className="h-[720px] w-[1400px] bg-muted relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31657.46304848149!2d80.01019537910156!3d7.469872800000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2d96120a6b6e3%3A0x1a3e8f2fa2c3fb36!2sKuliyapitiya!5e0!3m2!1sen!2slk!4v1713778250619!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </Card>
          </div>

          {/* <img
            src={`/linear.webp`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          /> */}
        </ContainerScroll>
      </div>



      <div className="w-screen h-full z-5 opacity-25">
        <img src="https://images.pexels.com/photos/4663476/pexels-photo-4663476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""  className=" object-cover  w-full h-full  blur-[10px]" />
      </div>
    </>
  );
};

export default contactus;

















// <div className="container mx-auto py-16 px-4 md:px-6">
//         <div className="flex flex-col items-center text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
//             Contact Us
//           </h1>
//           <p className="text-muted-foreground max-w-2xl">
//             We'd love to hear from you. Here's how you can reach us.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
//           <Card className="shadow-md">
//             <CardHeader>
//               <CardTitle className="text-2xl">{companyData.name}</CardTitle>
//               <CardDescription>Get in touch with us directly</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-start">
//                 <MapPin className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
//                 <p>{companyData.address}</p>
//               </div>
//               <div className="flex items-center">
//                 <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
//                 <p>{companyData.mobile}</p>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-md">
//             <CardHeader>
//               <CardTitle className="text-2xl">Connect With Us</CardTitle>
//               <CardDescription>Follow us on social media</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 gap-4">
//                 {companyData.socialMedia.map((platform) => (
//                   <Link
//                     key={platform.name}
//                     to={platform.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center p-3 rounded-lg border border-border hover:bg-accent transition-colors"
//                   >
//                     <platform.icon className="h-5 w-5 mr-3 text-muted-foreground" />
//                     <span>{platform.name}</span>
//                   </Link>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="mt-16 max-w-5xl mx-auto">
//           <Card className="shadow-md overflow-hidden p-0">
//             <div className="h-[300px] w-full bg-muted relative">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31657.46304848149!2d80.01019537910156!3d7.469872800000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2d96120a6b6e3%3A0x1a3e8f2fa2c3fb36!2sKuliyapitiya!5e0!3m2!1sen!2slk!4v1713778250619!5m2!1sen!2slk"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Google Maps"
//                 className="absolute inset-0"
//               ></iframe>
//             </div>
//           </Card>
//         </div>
//       </div>