import Navbar from "@/components/Navbar";



export default function WebsiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div>
            <Navbar />
            
            {children}
            <p>Footer</p>
        </div>

    );
}
