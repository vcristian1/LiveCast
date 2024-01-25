const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
   return (
    <div>
        <nav className="bg-red-500 p-1">Auth Navbar</nav>
        {children}
    </div>
   ) 
}

export default AuthLayout;