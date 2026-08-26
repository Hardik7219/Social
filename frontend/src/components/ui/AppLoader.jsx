function AppLoader() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
            <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin" />

                <div className="absolute text-blue-400 font-bold">
                    Hx
                </div>
            </div>

            <p className="mt-5 text-sm text-white/50 animate-pulse">
                Loading Hx1C33...
            </p>
        </div>
    );
}

export default AppLoader;