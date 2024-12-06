import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default function Navbar() {
    return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
        <div className="flex h-14 items-center px-4">
            <div className="mr-4 hidden md:flex">
                <Link className="mr-4 flex items-center gap-2 lg:mr-6" href="/">
                    <img src="/pair.png" alt="pAIr" className="h-8 w-8" />
                    <span className="hidden font-bold lg:inline-block">pAIr</span>
                </Link>
                <nav className="flex items-center gap-4 text-sm xl:gap-6">
                    <a className="transition-colors hover:text-foreground/80 text-foreground/80" href="/create-agent">Create</a>
                </nav>
            </div>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 py-2 -ml-2 mr-2 h-8 w-8 px-0 text-base focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:R15u6ja:" data-state="closed">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="!size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5"></path>
                </svg>
                <span className="sr-only">Toggle Menu</span>
            </button>
            <div className="flex flex-1 items-center justify-between gap-2 md:justify-end md:block hidden">
                <div className="w-full flex justify-end gap-4">
                    <Link href="signup">
                        <Button>
                            Sign Up
                        </Button>
                    </Link>
                    <Link href="login">
                        <Button>
                            Login
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </header>
    )
}