import Link from 'next/link';

export default function CreateAgent() {
    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <h1>Hello agent</h1>
            <Link href="/">Home</Link>
        </div>
    )
}