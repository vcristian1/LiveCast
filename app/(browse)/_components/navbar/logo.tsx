import Link from 'next/link';
import Image from 'next/image';
import { Poppins } from "next/font/google";
import LogoImage from '@/public/spooky.svg'
import { cn } from '@/lib/utils';

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300","400","500", "600", "700", "800"],
});

export const Logo = () => {
    return (
        <Link href="/">
            <div className='hidden lg:flex items-center gap-x-4 hover:opacity-75 transition duration-500'>
                <div className='bg-white rounded-full p-1'>
                    <Image width={32} height={32} alt="logo" src={LogoImage}/>
                </div>
            </div>
        </Link>
    )
}