import Image from 'next/image'

export default function Record() {
    return <>
        <div className="bg-gray-900 shadow-lg drop-shadow-lg rounded p-3 flex flex-1 flex-col justify-between w-100">
            <div>
                <div className="group relative">

                    <Image src="https://i.discogs.com/JgKRDK5ENK8P1b67IThH2Qf2Mjle5O0XLqAQbpJyWZI/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2MTQ0/OTY2LTE2MDY4NDk1/ODItMTk3MS5qcGVn.jpeg" width={0} height={0} sizes="100vw" alt="Placeholder Image" className="record-image w-full rounded" priority={false} />

                    <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
                        <a href="discogs url" target="_blank">
                            <span className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition border-2 border-white rounded px-3 py-2">
                                View Record
                            </span>
                        </a>
                    </div>
                </div >
                <div className="px-1 py-4">
                    <h3 className="text-white text-lg pl-1">Album</h3>
                    <p className="text-gray-400">
                        <i className="fas fa-user fa-fw"></i>&nbsp;Artist</p>
                    <p className="text-gray-400">
                        <i className="fas fa-calendar fa-fw"></i>&nbsp;Year</p >
                </div >
            </div >
            <div className="px-1 md:flex md:flex-wrap-reverse">
                <span className="align-bottom inline-block bg-green-900 rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2 mb-2">Genre</span>
            </div >
        </div >
    </>
}