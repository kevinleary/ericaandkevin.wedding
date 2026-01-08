import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  Info, 
  ChevronDown, 
  Menu, 
  X, 
  Anchor, 
  Camera, 
  Gift, 
  Navigation 
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [RSVPStatus, setRSVPStatus] = useState('idle'); // idle, loading, success
  const [showHoneyfund, setShowHoneyfund] = useState(false); // ADDED: State for modal
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    attending: 'yes',
    plus1: 'no',
    hotel: 'yes',
    driving: 'no'
  });

  useEffect(() => {
    // Set the page title
    document.title = "Erica & Kevin | May 23, 2026";

    // Set Open Graph Meta Tags for Link Previews (iMessage, etc.)
    const metaTags = [
      { property: 'og:title', content: 'Erica & Kevin | May 21-24, 2026' },
      { property: 'og:description', content: 'Join us for our wedding celebration in Okatie, South Carolina.' },
      { property: 'og:image', content: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'website' }
    ];

    metaTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    // Set the favicon (Minimal Powerboat SVG)
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    // Updated SVG path for a powerboat/speedboat shape
    link.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235B9AA0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M2 17h20'/><path d='M22 17l-2 3H4l-2-3'/><path d='M15 17l-2-4h-5l-1 4'/></svg>`;
    document.head.appendChild(link);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleRSVP = async (e) => {
    e.preventDefault();
    setRSVPStatus('loading');

    try {
      // REPLACE with your actual Formspree endpoint
      const response = await fetch("https://formspree.io/f/xgovgvvj", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setRSVPStatus('success');
        // Optional: clear form after success
        setFormData({
          name: '',
          email: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          attending: 'yes',
          guests: '1',
          hotel: 'yes',
          driving: 'no'
        });
      } else {
        console.error("Form submission failed");
        alert("There was a problem submitting your RSVP. Please try again.");
        setRSVPStatus('idle');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was a problem submitting your RSVP. Please check your connection and try again.");
      setRSVPStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#467479] font-serif selection:bg-[#5B9AA0] selection:text-white">
      {/* Custom Styles for animations since tailwindcss-animate might not be present */}
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUpFade 1.2s ease-out forwards;
        }
        .animate-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#FDFCF8]/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-light tracking-widest cursor-pointer text-[#5B9AA0] hover:opacity-80 transition-opacity" onClick={() => scrollTo('hero')}>
            E & K
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-sans font-medium text-[#467479]">
            {['our story', 'the venue', 'schedule', 'travel', 'rsvp', 'registry'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.replace(' ', '-'))}
                className="hover:text-[#5B9AA0] transition-colors cursor-pointer relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5B9AA0] transition-all group-hover:w-full opacity-50"></span>
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-[#5B9AA0] focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {/* ADDED: Wrapper div for rotation animation */}
            <div className={`transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>
          </button>
          </div>

        {/* Mobile Nav Menu */}
        {/* CHANGED: Removed conditional rendering {isMenuOpen && ...} in favor of CSS transitions */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-[#FDFCF8] border-t border-[#E0EBEB] flex flex-col items-center transition-all duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-[500px] opacity-100 py-8 shadow-lg' : 'max-h-0 opacity-0 py-0 shadow-none pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center space-y-6 text-sm uppercase tracking-widest font-sans w-full">
            {['our story', 'the venue', 'schedule', 'travel', 'rsvp', 'registry'].map((item, index) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.replace(' ', '-'))} 
                // ADDED: Staggered animation for list items
                className={`text-[#467479] hover:text-[#5B9AA0] py-2 transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            {/* Main Background Image */}
            <img 
                src="3R5A2785.jpg" 
                alt="Erica and Kevin" 
                className="w-full h-full object-cover object-center opacity-90"
            />
            
            {/* Gradient Overlay for Blending */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCF8]/40 via-transparent to-[#FDFCF8]" />
            
            {/* Color Tint Overlay to match theme */}
            <div className="absolute inset-0 bg-[#5B9AA0]/10 mix-blend-multiply pointer-events-none" />
        </div>

        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-xl md:text-2xl uppercase tracking-[0.3em] font-sans mb-4 text-[#467479] drop-shadow-sm">We're getting married</h2>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl uppercase font-light mb-8 text-[#2C5257] whitespace-nowrap drop-shadow-md">Erica & Kevin</h1>

          {/* Increased transparent spacing */}
          <div className="h-24" />
          
          <div className="space-y-2 text-[#2C5257] drop-shadow-sm">
            <p className="text-xl md:text-2xl font-light tracking-widest">OKATIE, SOUTH CAROLINA</p>
            <p className="text-lg md:text-xl font-light tracking-widest">MAY 21-24, 2026</p>
          </div>

          <div className="mt-12">
            <button 
              onClick={() => scrollTo('rsvp')}
              className="bg-[#5B9AA0]/90 backdrop-blur-sm text-white px-10 py-4 font-sans uppercase tracking-widest cursor-pointer text-sm hover:bg-[#467479] transition-all rounded-sm shadow-xl"
            >
              Kindly RSVP
            </button>
          </div>
        </div>

        <button 
          onClick={() => scrollTo('our-story')}
          className="absolute bottom-10 animate-bounce cursor-pointer text-[#467479]"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* Our Story */}
      <section id="our-story" className="py-24 md:py-32 px-6 bg-[#FDFCF8]">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="mx-auto mb-8 text-[#5B9AA0] opacity-60" size={40} />
          <h2 className="text-4xl md:text-5xl font-light mb-12 text-[#5B9AA0]">Our Story</h2>
          <div className="space-y-6 text-lg leading-relaxed text-[#467479] font-sans font-light">
            <p>
              It all started three years ago at Gold's Gym in Arlington, Virginia when a beautiful fit 
              Erica approached a stretching Kevin regarding his Dallas Cowboys longsleeve. Little did
              he know that their mutual disappointment, was not the only attribute they shared in common. 
              After a few conversations, Kevin asked Erica to watch the upcoming playoff game. 
              Erica declined, stating that she was already taken. While a shock to Kevin, he was able to
              shrug off the momentary embarassment. 
            </p>
            <p>
              A few weeks later back at Gold's, Erica had approached
              Kevin yet again to give him a glimmer of hope stating, "if things were different...". 
              Oh things were different as Kevin had fallen deeply in love with Erica and proceeded to tell
              everyone he knew about the potential future he could have had with her. Low and behold, Erica 
              had also felt love at first sight when she saw Kevin but couldn't explain that given her 
              current circumstances.
            </p>
            <p>
              As time stretched on, Erica had seen Kevin all over Arlington since their last interaction. In one 
              instance, at 5AM as she was driving to Gold's, Erica almost hit Kevin while he was beginning his morning 
              commute to Navy Yard. A year and a half later, Erica's circumstances had changed. She was unsure of Kevin's status, 
              but knew she had to try and get to know this handsome Cowboys fan she had once encountered. While out at Spider 
              Kelly's Erica sent Kevin's friend, Thiccbass, a DM asking, "What are you and Kevin doing tonight?" Kevin and Erica 
              reconvened on that August evening. A week later, they went on their first date where Kevin took Erica for a cruise 
              in his Bass Tracker on the Potomac River in Washington, D.C. Erica was blown-away that the Florida Man from Jersey 
              showed off her home city better than she'd ever seen it.
            </p>
            <p>
              As they got to know each other more and more each passing day, they realized that the SWAMP was no 
              place for them. Through the grace of God by their continued and ever growing faith, Erica and Kevin 
              hit the road and moved to South Carolina to fulfill their dreams of escaping to The South. They spent
              every day together, almost inseperable except for Kevin's early morning fishing trips and Erica's 
              walks with her adorable little Dachshund named Peyton. After three months, they decided to hit the road again
              where they found their light further south in The Sunshine State. Erica and Kevin officially settled down
              in Sarasota, Florida where they are blessed everyday just to be alive and living in their new found home.
            </p>
            <p>
              On December 17th, 2025, just off of Beer Can Island in Longboat Key, Kevin took Erica into The Gulf of 
              America on his Bass Tracker. What was supposed to be just a "boat ride", turned into an intimate, sun-filled
              proposal. Erica said yes to Kevin, on that same first date jon boat, which proves that it's not about the
              size of the boat, it's about how you use it. 
            </p>
            <p>
              For Erica and Kevin their union is more than coincidence it is "a God thing" and they are deeply thankful for
              every unexpected turn that brought them to where they are now. 
            </p>
          </div>
        </div>
      </section>

      {/* The Venue Section */}
      <section id="the-venue" className="bg-[#FDFCF8] py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="aspect-[4/5] bg-[#EAF5F6] rounded-sm overflow-hidden shadow-2xl">
                  {/* Venue photo */}
                    <img 
                      src="LLfront.jpg" 
                      alt="The Legacy Lookout Waterfront Estate" 
                      className="w-full h-full object-cover"
                    />
                   <div className="absolute bottom-4 right-4 text-white font-sans text-[10px] tracking-widest uppercase bg-[#5B9AA0]/80 px-2 py-1">22+ Acres of Serenity</div>
                </div>
                <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-white p-4 shadow-xl hidden md:block border border-[#E0EBEB]">
                  <div className="w-full h-full bg-[#FDFCF8] border border-[#E0EBEB] flex items-center justify-center p-4">
                    <p className="text-[10px] text-center font-sans uppercase tracking-tighter text-[#7FB5B9] leading-tight">
                      "PANORAMIC VIEWS OF THE CHECHESSEE RIVER"
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h3 className="text-sm font-sans uppercase tracking-[0.4em] text-[#7FB5B9] font-bold mb-4">The Location</h3>
              <h2 className="text-5xl font-light mb-8 text-[#5B9AA0]">The Legacy Lookout</h2>
              <div className="flex items-start mb-8 text-[#467479]">
                <MapPin className="mr-3 flex-shrink-0 mt-1 text-[#5B9AA0]" size={20} />
                <div>
                  <p className="text-lg">Okatie, South Carolina</p>
                  <p className="font-sans text-sm font-light mt-1 text-[#7FB5B9]">Near Hilton Head Island & Historic Beaufort</p>
                </div>
              </div>
              
              <div className="space-y-6 text-[#467479] font-sans font-light leading-relaxed">
                <p>
                  Our wedding will take place at The Legacy Lookout, a magnificent 8,500 sq. ft. estate 
                  nestled on 22 acres of pristine Lowcountry waterfront. 
                </p>
                <div className="grid grid-cols-2 gap-4 border-y border-[#E0EBEB] py-6">
                  <div>
                    <h4 className="font-bold text-[#5B9AA0] text-xs uppercase mb-2">The Vibe</h4>
                    <p className="text-sm">Southern Coastal meets Northern Tradition</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#5B9AA0] text-xs uppercase mb-2">Highlight</h4>
                    <p className="text-sm">Intimate estate with timeless feel</p>
                  </div>
                </div>
                <p>
                  Built with hand-selected materials and offering panoramic views of the Port Royal Sound, 
                  it is the epitome of South Carolina charm.
                </p>
                <a 
                  href="https://www.airbnb.com/rooms/639062835983981637" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#5B9AA0] hover:text-[#467479] transition-colors font-medium border-b border-[#5B9AA0] pb-1"
                >
                  <Info size={16} className="mr-2" /> View Estate Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-24 md:py-32 px-6 bg-[#FDFCF8] relative overflow-hidden">
        {/* Decorative background: Picture Frames with Images */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* UPDATED: Increased gap-y (vertical gap) significantly for mobile to separate the rows */}
            <div className="grid grid-cols-2 gap-4 gap-y-32 md:gap-16 opacity-15 max-w-5xl w-full px-4 items-center">
               {/* Frame 1 */}
               <div className="aspect-[3/4] border-4 border-[#5B9AA0] transform -rotate-1 rounded-sm translate-y-4 overflow-hidden bg-white shadow-xl">
                 <img 
                   src="3R5A2848.jpg" 
                   alt="Wedding Detail" 
                   className="w-full h-full object-cover grayscale"
                 />
               </div>
               {/* Frame 2 */}
               <div className="aspect-[3/4] border-4 border-[#5B9AA0] transform rotate-1 rounded-sm translate-y-4 overflow-hidden bg-white shadow-xl">
                 <img 
                   src="3R5A3200.jpg" 
                   alt="Wedding Detail" 
                   className="w-full h-full object-cover grayscale"
                 />
               </div>
               {/* Frame 3 */}
               <div className="aspect-[3/4] border-4 border-[#5B9AA0] transform rotate-2 rounded-sm -translate-y-4 overflow-hidden bg-white shadow-xl">
                 <img 
                   src="3R5A3144.jpg" 
                   alt="Wedding Detail" 
                   className="w-full h-full object-cover grayscale"
                 />
               </div>
               {/* Frame 4 */}
               <div className="aspect-[3/4] border-4 border-[#5B9AA0] transform -rotate-2 rounded-sm -translate-y-4 overflow-hidden bg-white shadow-xl">
                 <img 
                   src="3R5A3185.jpg" 
                   alt="Wedding Detail" 
                   className="w-full h-full object-cover grayscale"
                 />
               </div>
            </div>
         </div>

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-light mb-16 italic text-[#5B9AA0]">The Big Day</h2>
          <p className="text-xl tracking-widest uppercase text-[#7FB5B9] mb-16 font-light">May 23, 2026</p>
          <div className="space-y-16">
            <div className="relative flex flex-col items-center">
              <div className="w-px h-12 bg-[#E0EBEB] mb-8" />
              <div className="flex items-center space-x-4 mb-4">
                <Clock className="text-[#5B9AA0]/60" size={20} />
                <span className="font-sans text-sm tracking-widest uppercase text-[#7FB5B9]">4:00 PM</span>
              </div>
              <h3 className="text-2xl mb-4 font-light text-[#5B9AA0]">Waterfront Ceremony</h3>
              <p className="text-[#467479] font-sans font-light italic">The Great Lawn facing the River</p>
            </div>

            <div className="relative flex flex-col items-center">
              <div className="w-px h-12 bg-[#E0EBEB] mb-8" />
              <div className="flex items-center space-x-4 mb-4">
                <Clock className="text-[#5B9AA0]/60" size={20} />
                <span className="font-sans text-sm tracking-widest uppercase text-[#7FB5B9]">5:00 PM</span>
              </div>
              <h3 className="text-2xl mb-4 font-light text-[#5B9AA0]">Cocktail Hour</h3>
              <p className="text-[#467479] font-sans font-light italic text-center max-w-sm">
                Drinks and Hors d'oeuvres on The Great Lawn
              </p>
            </div>

            <div className="relative flex flex-col items-center">
              <div className="w-px h-12 bg-[#E0EBEB] mb-8" />
              <div className="flex items-center space-x-4 mb-4">
                <Clock className="text-[#5B9AA0]/60" size={20} />
                <span className="font-sans text-sm tracking-widest uppercase text-[#7FB5B9]">6:30 PM</span>
              </div>
              <h3 className="text-2xl mb-4 font-light text-[#5B9AA0]">First Dance</h3>
              <p className="text-[#467479] font-sans font-light italic">The Great Lawn</p>
            </div>
            
            <div className="relative flex flex-col items-center">
              <div className="w-px h-12 bg-[#E0EBEB] mb-8" />
              <div className="flex items-center space-x-4 mb-4">
                <Clock className="text-[#5B9AA0]/60" size={20} />
                <span className="font-sans text-sm tracking-widest uppercase text-[#7FB5B9]">7:00 PM</span>
              </div>
              <h3 className="text-2xl mb-4 font-light text-[#5B9AA0]">Dinner</h3>
              <p className="text-[#467479] font-sans font-light italic">The Great Lawn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Travel & Accomm */}
      <section id="travel" className="bg-[#FDFCF8] text-[#467479] py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Navigation className="mx-auto mb-6 text-[#5B9AA0] opacity-60" size={32} />
            <h2 className="text-5xl font-light text-[#5B9AA0] mb-4">Travel & Stay</h2>
            <p className="font-sans font-light max-w-xl mx-auto text-[#7FB5B9]">
              Okatie is centrally located between Beaufort and Hilton Head. 
              We recommend flying into SAV or CHS.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-sm border border-[#E0EBEB] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <h3 className="text-xl font-light text-[#5B9AA0] mb-4">Air Travel</h3>
                <p className="font-sans font-light text-sm leading-relaxed mb-6">
                  <strong>Savannah/Hilton Head (SAV)</strong> is just 35 miles away. <br />
                  <strong>Charleston (CHS)</strong> is approximately 75 miles away.
                </p>
              </div>
              <a 
                href="https://www.google.com/travel/flights/search?tfs=CBwQAhooEgoyMDI2LTA1LTIxagwIAxIIL20vMHJoNmtyDAgDEggvbS8wX2tyNBooEgoyMDI2LTA1LTI0agwIAxIIL20vMF9rcjRyDAgDEggvbS8wcmg2a0ABSAFwAYIBCwj___________8BmAEB&hl=en-US&gl=US" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-sans uppercase tracking-widest text-[#5B9AA0] hover:text-[#467479] transition-colors"
              >
                Find Flights →
              </a>
            </div>

            {/* Hotel Block */}
            <div className="bg-white p-8 rounded-sm border border-[#E0EBEB] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <h3 className="text-xl font-light text-[#5B9AA0] mb-4">Where to Stay</h3>
                <p className="font-sans font-light text-sm leading-relaxed mb-4">
                  We have reserved a block of rooms at the <strong>Hampton Inn & Suites Bluffton-Sun City</strong>. 
                  The hotel is a <strong>20 minute drive</strong> to Legacy Lookout. <strong>After RSVPing, we will email
                  you the Hotel Block Group and Code for reservation</strong>.
                </p>
                <div className="mb-6">
                   <p className="text-xs font-bold uppercase tracking-widest text-[#7FB5B9] mb-2">Available Rooms:</p>
                   <ul className="font-sans font-light text-sm text-[#467479] space-y-1 list-disc pl-4">
                     <li>10 Double Queen Rooms</li>
                     <li>10 King Bed Rooms</li>
                   </ul>
                </div>
              </div>
              <a 
                href="https://www.hilton.com/en/hotels/bfnschx-hampton-suites-bluffton-sun-city/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs font-sans uppercase tracking-widest text-[#5B9AA0] hover:text-[#467479] transition-colors"
              >
                Book Your Room →
              </a>
            </div>

            <div className="bg-white p-8 rounded-sm border border-[#E0EBEB] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <h3 className="text-xl font-light text-[#5B9AA0] mb-4">Transportation</h3>
                <p className="font-sans font-light text-sm leading-relaxed mb-6">
                  Parking is available onsite for around <strong>20 vehicles</strong>. Because this is limited and there will 
                  be alcohol served, we will potentially work with a shuttle company to bring guests to and from the Hampton 
                  Inn Hotel depending on final reservation count. To further accomodate non-drivers, we also plan on 
                  <strong> providing Uber and Lyft vouchers</strong> for use after the wedding ceremony.
                </p>
              </div>
              <p className="text-xs font-sans uppercase tracking-widest text-[#7FB5B9] opacity-60 italic">Limited parking, rideshare vouchers, and potential shuttle</p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-24 md:py-32 px-6 bg-[#FDFCF8]">
        <div className="max-w-2xl mx-auto bg-white shadow-2xl p-10 md:p-16 rounded-sm border border-[#E0EBEB]">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-[#5B9AA0]">Kindly Respond</h2>
            <p className="font-sans text-sm uppercase tracking-widest text-[#7FB5B9] font-medium">Please RSVP by March 1st, 2026</p>
          </div>

          {RSVPStatus === 'success' ? (
            <div className="text-center py-12 animate-in zoom-in-95 duration-500">
              <Heart className="mx-auto text-[#5B9AA0] mb-6" size={48} />
              <h3 className="text-2xl mb-2 text-[#5B9AA0]">Thank you!</h3>
              <p className="text-[#467479] font-sans font-light">We can't wait to see you in South Carolina.</p>
              <button 
                onClick={() => setRSVPStatus('idle')}
                className="mt-8 text-[#7FB5B9] font-sans text-xs uppercase cursor-pointer tracking-widest border-b border-[#E0EBEB] hover:text-[#5B9AA0]"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleRSVP} className="space-y-8 font-sans">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#7FB5B9]">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full border-b-2 border-[#E0EBEB] py-3 focus:outline-none focus:border-[#5B9AA0] transition-colors text-lg font-light text-[#467479] bg-transparent"
                  placeholder="The honor of your name..."
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {/* Added Email Input for Formspree */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#7FB5B9]">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full border-b-2 border-[#E0EBEB] py-3 focus:outline-none focus:border-[#5B9AA0] transition-colors text-lg font-light text-[#467479] bg-transparent"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* Attendance Selection - Moved UP to determine visibility of other fields */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#7FB5B9]">Attendance</label>
                <select 
                  name="attending"
                  className="w-full bg-transparent border-b-2 border-[#E0EBEB] py-3 focus:outline-none focus:border-[#5B9AA0] appearance-none text-[#467479]"
                  value={formData.attending}
                  onChange={(e) => setFormData({...formData, attending: e.target.value})}
                >
                  <option value="yes">Joyfully Accepts</option>
                  <option value="no">Regretfully Declines</option>
                </select>
              </div>

              {/* Conditional Fields: Only show if attending is 'yes' */}
              {formData.attending === 'yes' && (
                <div className="animate-slide-up space-y-8">
                  {/* Address Fields */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#7FB5B9]">Mailing Address</label>
                    <input 
                      type="text" 
                      name="address"
                      className="w-full border-b-2 border-[#E0EBEB] py-3 focus:outline-none focus:border-[#5B9AA0] transition-colors text-lg font-light text-[#467479] bg-transparent"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6 md:col-span-5 space-y-2">
                      <input 
                        type="text" 
                        name="city"
                        className="w-full border-b-2 border-[#E0EBEB] py-3 focus:outline-none focus:border-[#5B9AA0] transition-colors text-lg font-light text-[#467479] bg-transparent"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                    <div className="col-span-3 md:col-span-4 space-y-2">
                      <input 
                        type="text" 
                        name="state"
                        className="w-full border-b-2 border-[#E0EBEB] py-3 focus:outline-none focus:border-[#5B9AA0] transition-colors text-lg font-light text-[#467479] bg-transparent"
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                      />
                    </div>
                    <div className="col-span-3 space-y-2">
                      <input 
                        type="text" 
                        name="zip"
                        className="w-full border-b-2 border-[#E0EBEB] py-3 focus:outline-none focus:border-[#5B9AA0] transition-colors text-lg font-light text-[#467479] bg-transparent"
                        placeholder="Zip"
                        value={formData.zip}
                        onChange={(e) => setFormData({...formData, zip: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#7FB5B9]">Bringing a +1?</label>
                      <select 
                        className="w-full bg-transparent border-b-2 border-[#E0EBEB] py-3 focus:outline-none focus:border-[#5B9AA0] text-[#467479]"
                        value={formData.plus1}
                        onChange={(e) => setFormData({...formData, plus1: e.target.value})}
                      >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  {/* Travel Info */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#7FB5B9]">Plan to Book Hotel?</label>
                      <select 
                        name="hotel"
                        className="w-full bg-transparent border-b-2 border-[#E0EBEB] py-3 focus:outline-none focus:border-[#5B9AA0] text-[#467479]"
                        value={formData.hotel}
                        onChange={(e) => setFormData({...formData, hotel: e.target.value})}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#7FB5B9]">Will you be Driving?</label>
                      <select 
                        name="driving"
                        className="w-full bg-transparent border-b-2 border-[#E0EBEB] py-3 focus:outline-none focus:border-[#5B9AA0] text-[#467479]"
                        value={formData.driving}
                        onChange={(e) => setFormData({...formData, driving: e.target.value})}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={RSVPStatus === 'loading'}
                className="w-full bg-[#5B9AA0] text-white py-5 uppercase tracking-[0.2em] font-medium cursor-pointer text-sm hover:bg-[#467479] transition-all disabled:opacity-50"
              >
                {RSVPStatus === 'loading' ? 'Sending...' : 'Send RSVP'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Registry */}
      <section id="registry" className="bg-[#FDFCF8] py-24 md:py-32 px-6 text-center">
        <Gift className="mx-auto mb-6 text-[#A7D0D2]" size={32} />
        <h2 className="text-3xl font-light mb-8 italic text-[#5B9AA0]">Gifts & Registry</h2>
        <p className="max-w-md mx-auto font-sans font-light text-[#467479] mb-10 leading-relaxed">
          Your presence is the greatest gift of all. If you wish to honor us with a contribution, we have a honeymoon fund set up for our first adventure as a married couple.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            className="bg-white border border-[#E0EBEB] px-10 py-4 font-sans cursor-pointer text-xs uppercase tracking-widest hover:border-[#5B9AA0] hover:text-[#5B9AA0] transition-colors text-[#7FB5B9] shadow-sm hover:shadow-md"
            onClick={() => setShowHoneyfund(true)}
          >
            Honeymoon Fund
          </button>
          <button className="bg-white border border-[#E0EBEB] px-10 py-4 font-sans cursor-pointer text-xs uppercase tracking-widest hover:border-[#5B9AA0] hover:text-[#5B9AA0] transition-colors text-[#7FB5B9] shadow-sm hover:shadow-md"
            onClick={() => window.open('https://www.crateandbarrel.com/gift-registry/erica-boyd/r7464324', '_blank')}
            >
            Crate & Barrel
          </button>
          <button className="bg-white border border-[#E0EBEB] px-10 py-4 font-sans cursor-pointer text-xs uppercase tracking-widest hover:border-[#5B9AA0] hover:text-[#5B9AA0] transition-colors text-[#7FB5B9] shadow-sm hover:shadow-md"
            onClick={() => window.open('https://www.williams-sonoma.com/registry/g9gxjbv2gq/registry-list.html', '_blank')}
            >
            WILLIAMS SONOMA
          </button>
        </div>
      </section>

      {/* HoneyFund Modal (ADDED) */}
      {showHoneyfund && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowHoneyfund(false)} />
          <div className="relative bg-[#FDFCF8] p-8 md:p-12 max-w-lg w-full shadow-2xl rounded-sm border border-[#E0EBEB] animate-slide-up">
            <button 
              onClick={() => setShowHoneyfund(false)}
              className="absolute top-4 right-4 text-[#5B9AA0] cursor-pointer hover:text-[#467479] transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="text-center space-y-6">
              <div className="aspect-video w-full overflow-hidden rounded-sm bg-[#EAF5F6]">
                 <img 
                   src="https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                   alt="Honeymoon Beach" 
                   className="w-full h-full object-cover"
                 />
              </div>
              
              <div>
                <h3 className="text-2xl font-light text-[#5B9AA0] mb-2">Our Honeymoon Fund</h3>
                <p className="font-sans font-light text-[#467479] leading-relaxed">
                  We are planning a Honeymoon trip! Please click on the buttons below to help donate to our Honeymoon. Thank you for helping us create memories that will last a lifetime.
                </p>
              </div>
              
              <div className="flex flex-col gap-3 pt-2">
                <button 
                   className="bg-[#5B9AA0] text-white px-8 py-3 font-sans cursor-pointer text-xs uppercase tracking-widest hover:bg-[#467479] transition-colors shadow-lg w-full"
                   onClick={() => window.open('https://www.paypal.com/paypalme/KevinLeary853', '_blank')}
                >
                  PayPal Us
                </button>
                <button 
                   className="bg-[#5B9AA0] text-white px-8 py-3 font-sans cursor-pointer text-xs uppercase tracking-widest hover:bg-[#467479] transition-colors shadow-sm w-full"
                   onClick={() => window.open('https://venmo.com/u/kleary10', '_blank')}
                >
                  Venmo Us
                </button>
                <button 
                   className="bg-white border border-[#5B9AA0] text-[#5B9AA0] px-8 py-3 font-sans text-xs uppercase tracking-widest hover:bg-[#EAF5F6] transition-colors shadow-sm w-full"
                >
                  or Zelle Us (via Kevin's phone number)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-20 bg-white text-center border-t border-[#E0EBEB]">
        <h2 className="text-4xl italic font-light mb-6 text-[#5B9AA0]">Erica & Kevin</h2>
        <div className="flex justify-center space-x-6 mb-8 text-[#A7D0D2]">
          <Camera size={20} />
          <span className="font-sans text-sm tracking-[0.2em] uppercase">#LearysLowcountryLove</span>
        </div>
        <p className="font-sans text-[10px] uppercase tracking-widest text-[#A7D0D2]">
          Made with love for our family and friends.
        </p>
      </footer>
    </div>
  );
};

export default App;