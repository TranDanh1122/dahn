export default function LoadingFallback() {
    return <div className='fixed top-0 left-0 bg-neutral-950 w-screen  h-screen flex flex-col items-center justify-center'>
        <div className='size-20 border-s-4 border-neutral-100 rounded-full animate-spin mx-auto'></div>
        <p className='text-center text-neutral-100 text-3xl'>Please wait...</p>
    </div>
}