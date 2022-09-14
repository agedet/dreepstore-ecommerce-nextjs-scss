import Link from "next/link";

export default function Footer() {
  return (
    <section className='footer'>
        <div className='container'>
            <div className='footer-sec-name'>
                <h3>dreepstore</h3>

                <p>Copyright © 2022. All Rights Reserved</p>
            </div>
            <div className='footer-sec'>
                <h4>Quick Links</h4>

                <ul>
                    <li>
                        <Link href='/'>Home</Link>
                    </li>
                    <li>
                        <Link href='/cart'>Cart</Link>
                    </li>
                    <li>
                        <Link href='/about-us'>About Us</Link>
                    </li>
                    <li>
                        <Link href='/blog'>Blog</Link>
                    </li>
                </ul>
            </div>
            <div className='footer-sec'>
                <h4>Support</h4>

                <ul>
                    <li>
                        <Link href='/terms'>
                        Terms of service
                        </Link>
                    </li>
                    <li>
                        <Link href='/legal'>
                        Legal
                        </Link>
                    </li>
                    <li>
                        <Link href='/privacy'>
                        Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link href='/shipping'>
                        Shipping
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='footer-sec'>
                <h4>Follow us</h4>

                <ul>
                    <li>
                        <Link href=''>
                        Facebook
                        </Link>
                    </li>
                    <li>
                        <Link href=''>
                        Twitter
                        </Link>
                    </li>
                    <li>
                        <Link href=''>
                        Instagram
                        </Link>
                    </li>
                    <li>
                        <Link href=''>
                        Telegram
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </section>
  )
}
