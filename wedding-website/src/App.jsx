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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes',
    guests: '1',
    dietary: ''
  });

  useEffect(() => {
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

  const handleRSVP = (e) => {
    e.preventDefault();
    setRSVPStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setRSVPStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#467479] font-serif">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#FDFCF8]/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-light tracking-widest cursor-pointer text-[#5B9AA0]" onClick={() => scrollTo('hero')}>
            E & K
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-sans font-medium text-[#467479]">
            {['our story', 'the venue', 'schedule', 'travel', 'rsvp'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.replace(' ', '-'))}
                className="hover:text-[#5B9AA0] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-[#5B9AA0]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#FDFCF8] border-t border-[#E0EBEB] flex flex-col items-center py-8 space-y-6 text-sm uppercase tracking-widest font-sans animate-in fade-in slide-in-from-top-4">
            {['our story', 'the venue', 'schedule', 'travel', 'rsvp'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.replace(' ', '-'))} className="text-[#467479]">{item}</button>
            ))}
          </div>
        )}
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
              className="bg-[#5B9AA0]/90 backdrop-blur-sm text-white px-10 py-4 font-sans uppercase tracking-widest text-sm hover:bg-[#467479] transition-all rounded-sm shadow-xl"
            >
              Kindly RSVP
            </button>
          </div>
        </div>

        <button 
          onClick={() => scrollTo('our-story')}
          className="absolute bottom-10 animate-bounce text-[#467479]"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* Our Story */}
      <section id="our-story" className="py-24 md:py-32 px-6 bg-[#FDFCF8]">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="mx-auto mb-8 text-[#5B9AA0] opacity-60" size={40} />
          <h2 className="text-4xl md:text-5xl font-light mb-12 text-[#5B9AA0]">Our Journey</h2>
          <div className="space-y-6 text-lg leading-relaxed text-[#467479] font-sans font-light">
            <p>
              It started with a conversation about Lowcountry sunsets and a shared love for the coastal breeze. 
              From weekend trips to Hilton Head to quiet mornings on the riverfront, 
              we knew we wanted to share our "I do" in the heart of the place that feels most like home.
            </p>
            <p>
              We are so excited to welcome our closest friends and family to Okatie to celebrate 
              the beginning of our next chapter together at the beautiful Legacy Lookout.
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
                    <p className="text-sm">Southern Gothic meets Modern Luxury</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#5B9AA0] text-xs uppercase mb-2">Highlight</h4>
                    <p className="text-sm">Sunset cocktails on the deepwater dock house</p>
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
      <section id="schedule" className="py-24 md:py-32 px-6 bg-[#FDFCF8]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-light mb-16 italic text-[#5B9AA0]">The Big Day</h2>
          <div className="space-y-16">
            <div className="relative flex flex-col items-center">
              <div className="w-px h-12 bg-[#E0EBEB] mb-8" />
              <div className="flex items-center space-x-4 mb-4">
                <Clock className="text-[#5B9AA0]/60" size={20} />
                <span className="font-sans text-sm tracking-widest uppercase text-[#7FB5B9]">4:30 PM</span>
              </div>
              <h3 className="text-2xl mb-4 font-light text-[#5B9AA0]">Waterfront Ceremony</h3>
              <p className="text-[#467479] font-sans font-light italic">The Great Lawn facing the River</p>
            </div>

            <div className="relative flex flex-col items-center">
              <div className="w-px h-12 bg-[#E0EBEB] mb-8" />
              <div className="flex items-center space-x-4 mb-4">
                <Clock className="text-[#5B9AA0]/60" size={20} />
                <span className="font-sans text-sm tracking-widest uppercase text-[#7FB5B9]">5:30 PM</span>
              </div>
              <h3 className="text-2xl mb-4 font-light text-[#5B9AA0]">Cocktail Hour</h3>
              <p className="text-[#467479] font-sans font-light italic text-center max-w-sm">
                Drinks and Hors d'oeuvres at the "James Bond" Dock House
              </p>
            </div>

            <div className="relative flex flex-col items-center">
              <div className="w-px h-12 bg-[#E0EBEB] mb-8" />
              <div className="flex items-center space-x-4 mb-4">
                <Clock className="text-[#5B9AA0]/60" size={20} />
                <span className="font-sans text-sm tracking-widest uppercase text-[#7FB5B9]">7:00 PM</span>
              </div>
              <h3 className="text-2xl mb-4 font-light text-[#5B9AA0]">Dinner & Dancing</h3>
              <p className="text-[#467479] font-sans font-light italic">The Main Pavillion</p>
              <div className="w-px h-12 bg-[#E0EBEB] mt-8" />
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
                  The hotel is a <strong>20 minute drive</strong> to Legacy Lookout.
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
                  A shuttle will be provided from the downtown Beaufort Inn at 3:45 PM on Saturday.
                </p>
              </div>
              <p className="text-xs font-sans uppercase tracking-widest text-[#7FB5B9] opacity-60 italic">Parking available on-site</p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-24 md:py-32 px-6 bg-[#FDFCF8]">
        <div className="max-w-2xl mx-auto bg-white shadow-2xl p-10 md:p-16 rounded-sm border border-[#E0EBEB]">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-[#5B9AA0]">Kindly Respond</h2>
            <p className="font-sans text-sm uppercase tracking-widest text-[#7FB5B9] font-medium">Please RSVP by April 1st, 2026</p>
          </div>

          {RSVPStatus === 'success' ? (
            <div className="text-center py-12 animate-in zoom-in-95 duration-500">
              <Heart className="mx-auto text-[#5B9AA0] mb-6" size={48} />
              <h3 className="text-2xl mb-2 text-[#5B9AA0]">Thank you!</h3>
              <p className="text-[#467479] font-sans font-light">We can't wait to see you in South Carolina.</p>
              <button 
                onClick={() => setRSVPStatus('idle')}
                className="mt-8 text-[#7FB5B9] font-sans text-xs uppercase tracking-widest border-b border-[#E0EBEB] hover:text-[#5B9AA0]"
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

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#7FB5B9]">Attendance</label>
                  <select 
                    className="w-full bg-transparent border-b-2 border-[#E0EBEB] py-3 focus:outline-none focus:border-[#5B9AA0] appearance-none text-[#467479]"
                    value={formData.attending}
                    onChange={(e) => setFormData({...formData, attending: e.target.value})}
                  >
                    <option value="yes">Joyfully Accepts</option>
                    <option value="no">Regretfully Declines</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#7FB5B9]">Number of Guests</label>
                  <select 
                    className="w-full bg-transparent border-b-2 border-[#E0EBEB] py-3 focus:outline-none focus:border-[#5B9AA0] text-[#467479]"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#7FB5B9]">Dietary Restrictions</label>
                <textarea 
                  rows="2"
                  className="w-full border-b-2 border-[#E0EBEB] py-3 focus:outline-none focus:border-[#5B9AA0] transition-colors font-light text-[#467479] bg-transparent"
                  placeholder="Allergies or preferences?"
                  value={formData.dietary}
                  onChange={(e) => setFormData({...formData, dietary: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={RSVPStatus === 'loading'}
                className="w-full bg-[#5B9AA0] text-white py-5 uppercase tracking-[0.2em] font-medium text-sm hover:bg-[#467479] transition-all disabled:opacity-50"
              >
                {RSVPStatus === 'loading' ? 'Sending...' : 'Send RSVP'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Registry */}
      <section className="bg-[#FDFCF8] py-24 md:py-32 px-6 text-center">
        <Gift className="mx-auto mb-6 text-[#A7D0D2]" size={32} />
        <h2 className="text-3xl font-light mb-8 italic text-[#5B9AA0]">Gifts & Registry</h2>
        <p className="max-w-md mx-auto font-sans font-light text-[#467479] mb-10 leading-relaxed">
          Your presence is the greatest gift of all. If you wish to honor us with a contribution, we have a honeymoon fund set up for our first adventure as a married couple.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white border border-[#E0EBEB] px-8 py-3 font-sans text-xs uppercase tracking-widest hover:border-[#5B9AA0] hover:text-[#5B9AA0] transition-colors text-[#7FB5B9]">HoneyFund</button>
          <button className="bg-white border border-[#E0EBEB] px-8 py-3 font-sans text-xs uppercase tracking-widest hover:border-[#5B9AA0] hover:text-[#5B9AA0] transition-colors text-[#7FB5B9]">Crate & Barrel</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white text-center border-t border-[#E0EBEB]">
        <h2 className="text-4xl italic font-light mb-6 text-[#5B9AA0]">Erica & Kevin</h2>
        <div className="flex justify-center space-x-6 mb-8 text-[#A7D0D2]">
          <Camera size={20} />
          <span className="font-sans text-sm tracking-[0.2em] uppercase">#LowcountryLove2026</span>
        </div>
        <p className="font-sans text-[10px] uppercase tracking-widest text-[#A7D0D2]">
          Made with love for our family and friends.
        </p>
      </footer>
    </div>
  );
};

export default App;