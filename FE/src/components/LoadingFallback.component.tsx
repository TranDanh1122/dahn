/**
* LoadingFallback component - used for fullpage loading
 * @returns 
 */
export default function LoadingFallback() {
    console.log("layout fallback render")

    return <div className='fixed top-0 left-0 bg-slate-950 w-screen  h-screen flex flex-col items-center justify-center'>
        <div className='size-20 border-s-4 border-slate-100 rounded-full animate-spin mx-auto'></div>
        <p className='text-center text-slate-100 text-3xl'>Please wait...</p>
    </div>
}