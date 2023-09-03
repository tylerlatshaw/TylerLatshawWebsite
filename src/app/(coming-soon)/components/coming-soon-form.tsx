export default function ComingSoonForm() {
    return <form className="w-full h-full" id="notify-me" method="POST" action="/">
        <div className="w-fit mx-auto">
            <input type="text" name="floating_name" id="floating_name" className="hidden" defaultValue="Notification Request" hidden />
            <input type="text" name="floating_message" id="floating_message" className="hidden" defaultValue="Notify when site goes live" hidden />
            <input type="text" name="source" id="source" className="hidden" defaultValue="Notify Me" hidden />
            <div className="email-form mt-8">
                <input type="email" name="floating_email" id="floating_email" placeholder="Email Address" className="px-3 py-2.5 mx-0 text-lg text-white bg-gray-700 rounded-l-lg border-0 h-full focus:ring-0 focus:ring-offset-0 focus:outline-0 sm:w-48 md:w-60 lg:w-96 h-12" required />
                
                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-r-lg text-sm w-auto px-5 py-2.5 mx-0 text-center h-full border-0 focus:ring-0 origin-center -translate-x-1 -translate-y-px">
                    Submit <i className="fas fa-arrow-circle-right"></i>
                </button>

                <span id="subscribed-text" className="hidden px-3 text-left text-sm text-green-600">Got it! I&apos;ll notify you when the site goes live.</span>
            </div>
        </div>
    </form>
}