"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Login function
  const handleLogin = (emailValue) => {
    setUserEmail(emailValue);
    setIsLoggedIn(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('member_email', emailValue);
    }
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('member_email');
    }
  };

  // Check localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('member_email');
      if (savedEmail) {
        setUserEmail(savedEmail);
        setIsLoggedIn(true);
      }
    }
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      handleLogin(email);
      setIsLoading(false);
    }, 1500);
  };

  // If not logged in, show login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          
          {/* Logo/Product Photo */}
          <div className="text-center mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6 rounded-3xl overflow-hidden border-4 border-orange-500 shadow-2xl">
              <img
                src="https://nutricaoalimentos.shop/wp-content/uploads/2025/10/eec5bd9a-20fc-45f2-a43c-007d488865f6.webp"
                alt="Finger Foods Gourmet Collection"
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-orange-500 mb-2 uppercase tracking-tight">
              Members Area
            </h1>
          </div>

          {/* Login Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-2">🔐 Exclusive Access</h2>
              <p className="text-gray-400 text-sm">Enter your email address to access your content</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Access email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying access...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Access my area
                    <span className="ml-2">→</span>
                  </span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs">
                🔒 Secure and encrypted access
              </p>
            </div>
          </div>

          {/* Support Information */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm mb-2">Access problems?</p>
            <a 
              href="mailto:sflourcraft@gmail.com"
              className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors duration-300"
            >
              sflourcraft@gmail.com
            </a>
          </div>
        </div>
      </div>
    );
  }

  // If logged in, show members area
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Members Area Header */}
        <div className="relative max-w-5xl mx-auto p-6 md:p-8 mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-orange-800/10 rounded-2xl border border-orange-500/30"></div>
          <div className="absolute inset-2 border border-orange-500/20 rounded-xl pointer-events-none"></div>
          
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 text-gray-400 hover:text-orange-400 transition-colors duration-300 z-10"
            title="Logout"
          >
            <span className="text-xl">⚙️</span>
          </button>
          
          <div className="relative z-10 text-center">
            <h1 className="text-3xl md:text-6xl font-black text-orange-500 mb-4 uppercase tracking-tight">
              Members Area
            </h1>
            <p className="text-lg md:text-2xl text-white font-light mb-6">Finger Foods Gourmet</p>
            
            <div className="bg-white/5 p-4 md:p-6 rounded-xl border-l-4 border-orange-500">
              <h3 className="text-orange-400 font-bold text-base md:text-xl mb-3">
                🎯 Welcome {userEmail ? userEmail.split('@')[0] : 'User'}!
              </h3>
              <p className="text-white leading-relaxed text-sm md:text-base">
                You now have access to the most complete collection of gourmet finger food recipes. 
                Click on the images below to access your exclusive ebooks and bonuses.
              </p>
            </div>
          </div>
        </div>
        
        {/* Ebook #1 Card */}
        <div className="mb-12">
          <a 
            href="https://www.canva.com/design/DAG1GDjGTug/mQ_CDhqRHlg3Nb45Rm0fqw/view?utm_content=DAG1GDjGTug&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb124006f0d"
            
            className="block relative group"
          >
            <div className="relative bg-gray-800 rounded-3xl p-6 md:p-10 border-2 border-transparent transition-all duration-500 overflow-hidden cursor-pointer hover:border-orange-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20">
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-40 md:w-48 h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-orange-500 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="https://nutricaoalimentos.shop/wp-content/uploads/2025/10/eec5bd9a-20fc-45f2-a43c-007d488865f6.webp"
                    alt="Finger Foods Gourmet - Volume 1"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-orange-500 mb-4 leading-tight">
                    Finger Foods Gourmet - Volume 1
                  </h2>
                  
                  <p className="text-white text-sm md:text-lg mb-6 leading-relaxed">
                    The definitive collection of gourmet finger foods to impress at any event. Exclusive recipes that will transform your gatherings into unforgettable gastronomic experiences.
                  </p>
                  
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0">✓</span>
                      <span>50+ exclusive finger food recipes</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0">✓</span>
                      <span>Professional presentation techniques</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0">✓</span>
                      <span>Easy-to-find ingredients</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0">✓</span>
                      <span>Detailed step-by-step instructions</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0">✓</span>
                      <span>Professional-level results</span>
                    </li>
                  </ul>
                  
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-orange-600 hover:to-orange-500 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Access Volume 1
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Ebook #2 Card */}
        <div className="mb-12">
          <a 
            href="https://www.canva.com/design/DAG1Gw2lZew/2CL3KJdhcx_kddMmlrshfg/view?utm_content=DAG1Gw2lZew&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb7345fa760"
            
            className="block relative group"
          >
            <div className="relative bg-gray-800 rounded-3xl p-6 md:p-10 border-2 border-transparent transition-all duration-500 overflow-hidden cursor-pointer hover:border-blue-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-40 md:w-48 h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-blue-500 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="https://nutricaoalimentos.shop/wp-content/uploads/2025/10/cece0083-b468-4463-bbbb-50e7e382f39d.webp"
                    alt="Finger Foods Gourmet - Volume 2"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-blue-500 mb-4 leading-tight">
                    Finger Foods Gourmet - Volume 2
                  </h2>
                  
                  <p className="text-white text-sm md:text-lg mb-6 leading-relaxed">
                    Advanced techniques and sophisticated combinations to elevate your culinary skills. Premium recipes that will make you the host everyone admires.
                  </p>
                  
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0">✓</span>
                      <span>55+ advanced premium recipes</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0">✓</span>
                      <span>Professional plating techniques</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0">✓</span>
                      <span>Gourmet ingredient combinations</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0">✓</span>
                      <span>Professional chef secrets</span>
                    </li>
                  </ul>
                  
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-blue-600 hover:to-blue-500 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Access Volume 2
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Ebook #3 Card */}
        <div className="mb-12">
          <a 
            href="https://www.canva.com/design/DAG1G8XqNnY/-QcBDCRtWP-gbJFtfd8YSQ/view?utm_content=DAG1G8XqNnY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h16ab3dd001"
            
            className="block relative group"
          >
            <div className="relative bg-gray-800 rounded-3xl p-6 md:p-10 border-2 border-transparent transition-all duration-500 overflow-hidden cursor-pointer hover:border-purple-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-40 md:w-48 h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-purple-500 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="https://nutricaoalimentos.shop/wp-content/uploads/2025/10/22d0f926-eac5-42b5-a017-9dcd231cb7ef.webp"
                    alt="Finger Foods Gourmet - Volume 3"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-4xl font-bold text-purple-500 mb-4 leading-tight">
                    Finger Foods Gourmet - Volume 3
                  </h2>
                  
                  <p className="text-white text-sm md:text-lg mb-6 leading-relaxed">
                    International finger foods and exclusive recipes that will make you the center of attention at any event. Cultural fusion and unique creations that will surprise everyone.
                  </p>
                  
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0">✓</span>
                      <span>55+ exclusive international recipes</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0">✓</span>
                      <span>Unique and original creations</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0">✓</span>
                      <span>Cultural fusion techniques</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0">✓</span>
                      <span>Flavors from 5 continents</span>
                    </li>
                  </ul>
                  
                  <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-purple-600 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Access Volume 3
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Bonuses Section */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-8">🎁 Exclusive Bonuses</h2>
          
          {/* Bonuses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Bonus 1: Gourmet Patés & Mousses */}
            <a 
              href="https://gourmet-pates-mousses-el-iuxexoq.gamma.site/"
              
              className="block group"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-transparent transition-all duration-300 hover:border-green-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/20">
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 border border-green-500">
                  <img
                    src="https://cdn.gamma.app/05es2grqn2v8wkw/generated-images/nmuQ2B7sQxRTs5r4T4qSB.png"
                    alt="Gourmet Patés & Mousses"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-green-500 font-bold text-lg mb-2">Gourmet Patés & Mousses</h3>
                <p className="text-gray-300 text-sm">Exclusive recipes for gourmet patés and mousses to complement your finger foods.</p>
              </div>
            </a>

            {/* Bonus 2: Gourmet Pairings */}
            <a 
              href="https://gourmet-pairings-the-art-hxr2dbd.gamma.site/"
              
              className="block group"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-transparent transition-all duration-300 hover:border-yellow-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-yellow-500/20">
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 border border-yellow-500">
                  <img
                    src="https://cdn.gamma.app/05es2grqn2v8wkw/generated-images/WRH-WhPrw43kQ4JRhY3rw.png"
                    alt="Gourmet Pairings"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-yellow-500 font-bold text-lg mb-2">Gourmet Pairings</h3>
                <p className="text-gray-300 text-sm">The art of perfectly combining flavors to create unique gastronomic experiences.</p>
              </div>
            </a>

            {/* Bonus 3: From Host to Entrepreneur */}
            <a 
              href="https://from-host-to-entrepreneu-ny1j5mb.gamma.site/"
              
              className="block group"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-transparent transition-all duration-300 hover:border-red-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-500/20">
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 border border-red-500">
                  <img
                    src="https://cdn.gamma.app/05es2grqn2v8wkw/generated-images/iVfx27r_BwFttbXr7nkPW.png"
                    alt="From Host to Entrepreneur"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-red-500 font-bold text-lg mb-2">From Host to Entrepreneur</h3>
                <p className="text-gray-300 text-sm">Turn your passion for cooking into a profitable business with proven strategies.</p>
              </div>
            </a>

            {/* Bonus 4: Calculator + Shopping List */}
            <a 
              href="https://essential-tools-for-effi-jw5lgyl.gamma.site/"
              
              className="block group"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-transparent transition-all duration-300 hover:border-cyan-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20">
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 border border-cyan-500">
                  <img
                    src="https://cdn.gamma.app/05es2grqn2v8wkw/generated-images/DElzB1GxcC3Iq89i5XgkG.png"
                    alt="Calculator + Shopping List"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-cyan-500 font-bold text-lg mb-2">Calculator + Shopping List</h3>
                <p className="text-gray-300 text-sm">Essential tools for planning events and calculating perfect quantities.</p>
              </div>
            </a>

            {/* Bonus 5: The Most Loved Snacks */}
            <a 
              href="https://the-most-loved-snacks-cl-yqhh96e.gamma.site/"
              
              className="block group"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-transparent transition-all duration-300 hover:border-pink-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-500/20">
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 border border-pink-500">
                  <img
                    src="https://cdn.gamma.app/05es2grqn2v8wkw/generated-images/lgyQ9H9Uq0kORknMufNTA.png"
                    alt="The Most Loved Snacks"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-pink-500 font-bold text-lg mb-2">The Most Loved Snacks</h3>
                <p className="text-gray-300 text-sm">The most popular and beloved snacks that are always a guaranteed success.</p>
              </div>
            </a>

            {/* Bonus 6: Express Combo in 10 Minutes */}
            <a 
              href="https://express-combo-in-10-minu-sibrv1o.gamma.site/"
              
              className="block group"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-transparent transition-all duration-300 hover:border-orange-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/20">
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 border border-orange-500">
                  <img
                    src="https://cdn.gamma.app/05es2grqn2v8wkw/generated-images/JF7SNdJnJxYl6Cgf9BwNk.png"
                    alt="Express Combo in 10 Minutes"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-orange-500 font-bold text-lg mb-2">Express Combo in 10 Minutes</h3>
                <p className="text-gray-300 text-sm">Quick and delicious combinations for when you have little time but want to impress.</p>
              </div>
            </a>

            {/* Bonus 7: 4-Course Gourmet Dinners */}
            <a 
              href="https://gange-gourmet-dinner-ein-kw35y5d.gamma.site/"
              
              className="block group"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-transparent transition-all duration-300 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/20">
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 border border-indigo-500">
                  <img
                    src="https://cdn.gamma.app/05es2grqn2v8wkw/generated-images/01f4kJD7Df64tkADpeO9e.png"
                    alt="4-Course Gourmet Dinners"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-indigo-500 font-bold text-lg mb-2">4-Course Gourmet Dinners</h3>
                <p className="text-gray-300 text-sm">Complete 4-course menus for gourmet dinners that will leave everyone speechless.</p>
              </div>
            </a>

            {/* Bonus 8: +40 Gourmet Breakfasts */}
            <a 
              href="https://gourmet-breakfasts-6f9xkjk.gamma.site/"
              
              className="block group"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-transparent transition-all duration-300 hover:border-amber-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-500/20">
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 border border-amber-500">
                  <img
                    src="https://cdn.gamma.app/05es2grqn2v8wkw/generated-images/sVPZi1uT1f0kAE3lqK-t2.png"
                    alt="+40 Gourmet Breakfasts"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-amber-500 font-bold text-lg mb-2">+40 Gourmet Breakfasts</h3>
                <p className="text-gray-300 text-sm">More than 40 gourmet breakfasts to start the day with style and exceptional flavor.</p>
              </div>
            </a>

            {/* Bonus 9: Gourmet Drinks & Cocktails */}
            <a 
              href="https://gourmet-drinks-cocktails-djhbqmt.gamma.site/"
              
              className="block group"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-transparent transition-all duration-300 hover:border-teal-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/20">
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 border border-teal-500">
                  <img
                    src="https://cdn.gamma.app/w1tq52d7i64lsqw/generated-images/LIotRB-aOOl_2ZHu_99Y1.png"
                    alt="Gourmet Drinks & Cocktails"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-teal-500 font-bold text-lg mb-2">Gourmet Drinks & Cocktails</h3>
                <p className="text-gray-300 text-sm">Gourmet drinks and cocktails to perfectly accompany your finger foods.</p>
              </div>
            </a>

            {/* Bonus 10: Event Planning Guide */}
            <a 
              href="https://the-art-of-unforgettable-zclccx7.gamma.site/"
              
              className="block group"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-transparent transition-all duration-300 hover:border-violet-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-violet-500/20">
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 border border-violet-500">
                  <img
                    src="https://cdn.gamma.app/w1tq52d7i64lsqw/generated-images/q6YqdBbxAiXlNVKcu-oS8.png"
                    alt="Event Planning Guide"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-violet-500 font-bold text-lg mb-2">Event Planning Guide</h3>
                <p className="text-gray-300 text-sm">The art of creating unforgettable events with professional planning and perfect details.</p>
              </div>
            </a>

            {/* Bonus 11: Gourmet Conservation */}
            <a 
              href="https://gourmet-conservation-s7xr5kb.gamma.site/"
              
              className="block group"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border-2 border-transparent transition-all duration-300 hover:border-emerald-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/20">
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 border border-emerald-500">
                  <img
                    src="https://cdn.gamma.app/w1tq52d7i64lsqw/generated-images/L-0fqLW8S5F8WoEiN9Y1X.png"
                    alt="Gourmet Conservation"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-emerald-500 font-bold text-lg mb-2">Gourmet Conservation</h3>
                <p className="text-gray-300 text-sm">Advanced conservation techniques to maintain freshness and gourmet quality.</p>
              </div>
            </a>

          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white/5 p-6 md:p-8 rounded-2xl text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-orange-400 text-xl md:text-2xl font-bold mb-4">💬 Need Help?</h3>
          <p className="text-white mb-6 leading-relaxed text-sm md:text-base">
            Our support team is available to clarify doubts and assist you on your gourmet culinary journey.
          </p>
          <a 
            href="mailto:sflourcraft@gmail.com"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/30 text-sm md:text-base"
          >
            sflourcraft@gmail.com
          </a>
        </div>

        {/* Footer */}
        <div className="text-center py-8 md:py-12 border-t border-orange-500/30 text-gray-400">
          <p className="mb-2 text-sm md:text-base">© 2025 Finger Foods Gourmet. All rights reserved.</p>
          <p className="font-semibold text-sm md:text-base">Your gourmet culinary experience starts now.</p>
        </div>
      </div>
    </div>
  );
}