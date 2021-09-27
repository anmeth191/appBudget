import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){

return(
    <div className="navbar">
        <nav className="navbar__container">
            <div className="navbar__container__home">
                <Link className="navbar__container__home--link link" to="/">Home</Link>
            </div>

           <div className="navbar__container__links">
               <ul className="navbar__container__links__ul">
                   <li className="navbar__container__links__ul--li"><Link className="navbar__container__links__ul--li--link link" to="/bills">Bills</Link> </li>
                   <li className="navbar__container__links__ul--li"><Link className="navbar__container__links__ul--li--link link" to="/payments">Payments</Link></li>
                   <li className="navbar__container__links__ul--li"><Link className="navbar__container__links__ul--li--link link" to="/profile">Profile</Link> </li>
               </ul>
           </div>
        </nav>
    </div>
)



}

export default Navbar;