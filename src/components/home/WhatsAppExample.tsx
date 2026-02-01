import { MessageSquare, CheckCircle, Clock } from "lucide-react";

const WhatsAppExample = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center">
          {/* Left: Explanation */}
          <div className="md:w-1/2">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">WhatsApp Support — How it works</h3>
            <p className="text-muted-foreground mb-4">Register complaints via WhatsApp in 3 simple steps — send details, get a ticket instantly, and receive real-time updates.</p>

            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-green-500/10 text-green-400 rounded-full p-2 mt-1"><MessageSquare className="h-4 w-4" /></div>
                <div>
                  <div className="font-semibold text-foreground">1. Message us</div>
                  <div className="text-sm text-muted-foreground">Send a message with your complaint and optional photos.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="bg-green-500/10 text-green-400 rounded-full p-2 mt-1"><CheckCircle className="h-4 w-4" /></div>
                <div>
                  <div className="font-semibold text-foreground">2. Instant acknowledgement</div>
                  <div className="text-sm text-muted-foreground">You’ll receive a ticket ID and confirmation immediately.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="bg-green-500/10 text-green-400 rounded-full p-2 mt-1"><Clock className="h-4 w-4" /></div>
                <div>
                  <div className="font-semibold text-foreground">3. Real-time updates</div>
                  <div className="text-sm text-muted-foreground">Get status updates and resolution messages directly on WhatsApp.</div>
                </div>
              </li>
            </ol>

            <div className="mt-6">
              <a href="https://wa.me/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-2 rounded-md shadow">
                Start on WhatsApp
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Chat Preview */}
          <div className="md:w-1/2">
            <div className="bg-white/6 rounded-lg p-4 max-w-md mx-auto shadow-inner">
              <div className="text-xs text-muted-foreground mb-3">WhatsApp preview</div>

              <div className="space-y-3">
                <div className="flex">
                  <div className="bg-white/10 rounded-xl p-3 text-sm text-muted-foreground">JanSeva: Hi! Please send your complaint details and photo.</div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-green-500 text-white rounded-xl p-3 text-sm max-w-[80%]">You: Street light not working. Attached photo. <div className="text-[10px] text-white/80 mt-1">2:13 PM</div></div>
                </div>

                <div className="flex">
                  <div className="bg-white/10 rounded-xl p-3 text-sm text-muted-foreground">JanSeva: Ticket <span className="font-bold">#JS12345</span> created. We’ll update you here.</div>
                </div>

                <div className="mt-3 text-xs text-muted-foreground">Tip: Attach photos for faster resolution. We may ask for additional details via chat.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppExample;
