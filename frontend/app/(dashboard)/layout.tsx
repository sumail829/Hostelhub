


export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div>
            <p>Dashboard navbar</p>
            
            {children}
            <p>Dashboard Footer</p>
        </div>

    );
}
