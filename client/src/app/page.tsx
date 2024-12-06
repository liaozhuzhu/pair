import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default function Home() {
    return (
        <div className="flex flex-col md:flex-row md:gap-0 gap-10 justify-center items-center w-full min-h-screen text-center">
            <div className="flex flex-col min-h-full justify-center items-center md:w-1/2 w-full gap-4">
                <h1 className="text-7xl md:text-9xl font-extrabold bg-gradient-to-r from-zinc-50 via-green-400 to-zinc-100 text-transparent bg-clip-text drop-shadow-md animate-gradient-x bg-[length:200%_200%]">
                    pAIr
                </h1>

                <p className="text-md md:text-lg">Your Personal AI Pair Programming Agent</p>
            </div>
            <div className="flex flex-col min-h-full justify-center items-center md:w-1/2 w-full gap-4">
                <h1 className="text-4xl">Try it now!</h1>
                <Link href="create-agent">
                    <Button>
                        Create Agent
                    </Button>
                </Link>           
            </div>
        </div>
    )
}