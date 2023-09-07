
function Headliner({ icon, iconText, title, button, onClickHandler, hasJoke }) {


    return (
        <>
            <div className="flex flex-wrap gap-4 lg:justify-between lg:gap-0">
                <div className="grid gap-2">
                    <h2 className="text-[32px] font-semibold">{title}</h2>
                    <p className="text-base">Track all your favorite anime series, characters and books</p>
                </div>
                <div>
                    <button
                        onClick={onClickHandler}
                        className="flex items-center gap-2 text-white text-sm font-semibold bg-[#CF3D0C] px-[16px] py-[10px] rounded-lg"
                    >
                        {icon}
                        <p> {iconText} </p>
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    {hasJoke && (<h4 className="text-xl text-[#203442]">Joke of the day</h4>)}
                    {button && (button)}
                </div>
            </div>

            
        </>
    );
}

export default Headliner;