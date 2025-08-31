
import Link from "next/link"


const Navbar = () => {
  return (
   
    <header className="py-4 shadow-md">
        <nav className="max-w-7xl ma-auto px-4 sm:px-6 lg:px-8 ">
            
         <div className="flex items-center">
            <Link href="/" className="font-semibold">QuickQuiz</Link>
          <div className="ml-auto flex items-center gap-6">
           <Link href="/about">About</Link>
           <Link href="/contact">Contact</Link>
           <Link href="/login">Login</Link>
           <Link href="/components/Register">Registration</Link>
          </div>
           <br />
            
           {/* <div>
                <span> Dark Mode</span>
            </div> */}
          
         </div>
        
 
            
        </nav>

    </header>
  )
}

export default Navbar