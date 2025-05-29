import React from "react";
export default React.memo(function AddNewBtn(): React.JSX.Element {
    return <div className={`bg-neutral-200/50 cursor-pointer hover:bg-neutral-200/20 
        hover:shadow-lg backdrop-blur-2xl w-full 
        aspect-auto rounded-2xl flex 
        items-center justify-center`}>
        <p className="font-black text-8xl text-neutral-400">+</p>
    </div>

})