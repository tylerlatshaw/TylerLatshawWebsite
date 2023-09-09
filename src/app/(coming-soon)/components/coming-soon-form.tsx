'use client'

export default function ComingSoonForm() {
    return <form className="w-full h-full" id="notify-me" method="post" onSubmit={submitForm}>
        <div className="w-fit mx-auto">
            <input type="text" name="floating_name" id="floating_name" className="hidden" defaultValue="Notification Request" hidden />
            <input type="text" name="floating_message" id="floating_message" className="hidden" defaultValue="Notify me when the site goes live" hidden />
            <input type="text" name="source" id="source" className="hidden" defaultValue="Coming Soon Notify Me" hidden />
            <div className="w-full text-left">
                <div className="email-form mt-8">
                    <input type="email" name="floating_email" id="floating_email" placeholder="Email Address" className="px-3 py-2.5 mx-0 text-lg text-white bg-gray-700 rounded-l-lg border-0 h-full focus:ring-0 focus:ring-offset-0 focus:outline-0 sm:w-48 md:w-60 lg:w-96 h-12" required />

                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-r-lg text-sm w-auto px-5 py-2.5 mx-0 text-center h-full border-0 focus:ring-0 origin-center -translate-x-1 -translate-y-px">
                        Submit <i className="fas fa-arrow-circle-right"></i>
                    </button>
                </div>
                <span id="response-message" className="flex px-3 py-1 text-left text-md"></span>
            </div>
        </div>
    </form>
}

function submitForm(e: any) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    fetch('/api/email', {
        method: form.method,
        body: JSON.stringify({
            name: formData.get('floating_name'),
            email: formData.get('floating_email'),
            message: formData.get('floating_message'),
            source: formData.get('source'),
            referringPage: window.location.href
        })
    }).then((response) => {
        document.getElementById('response-message')!.innerHTML = 'Got it! I\'ll notify you when the site goes live.';
        document.getElementById('response-message')?.classList.add('positive-response');
    })
        .catch(() => {
            document.getElementById('response-message')!.innerHTML = 'Sorry, something went wrong.';
            document.getElementById('response-message')?.classList.add('negative-response');
        });
}