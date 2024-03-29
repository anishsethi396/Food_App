import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/footer.css'

function Footer() {
    return (
        <div className='footerImg'>
            <footer>
                <div className="footer-parent">
                    <ul className="footer-text">
                        <li className="text-value">
                            <Link to="#">About us</Link>
                        </li>
                        <li className="text-value">
                            <Link to="#">ios App</Link>
                        </li>
                        <li className="text-value">
                            <Link to="#">Android App</Link>
                        </li>
                    </ul>
                </div>

                <p className="footer-p">
                    Copyright © 2024 EVERYONE. All rights reserved.
                </p>
            </footer>
        </div>
    )
}

export default Footer