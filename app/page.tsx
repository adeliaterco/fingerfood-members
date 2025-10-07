"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Función de login
  const handleLogin = (emailValue) => {
    setUserEmail(emailValue);
    setIsLoggedIn(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('member_email', emailValue);
    }
  };

  // Función de logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('member_email');
    }
  };

  // Verificar localStorage
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
      setError('Por favor, introduce tu correo electrónico');
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor, introduce un correo electrónico válido');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      handleLogin(email);
      setIsLoading(false);
    }, 1500);
  };

  // Si no está conectado, mostrar pantalla de login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          
          {/* Logo/Foto del Producto */}
          <div className="text-center mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6 rounded-3xl overflow-hidden border-4 border-orange-500 shadow-2xl">
              <img
                src="https://nutricaoalimentos.shop/wp-content/uploads/2025/10/eec5bd9a-20fc-45f2-a43c-007d488865f6.webp"
                alt="Finger Foods Gourmet Collection"
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-orange-500 mb-2 uppercase tracking-tight">
              Área de Socios
            </h1>
          </div>

          {/* Formulario de Login */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-2">🔐 Acceso Exclusivo</h2>
              <p className="text-gray-400 text-sm">Introduce tu correo electrónico para acceder a tu contenido</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Correo electrónico de acceso
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="tu@correo.com"
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
                    Verificando acceso...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Acceder a mi área
                    <span className="ml-2">→</span>
                  </span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs">
                🔒 Acceso seguro y cifrado
              </p>
            </div>
          </div>

          {/* Información de soporte */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm mb-2">¿Problemas de acceso?</p>
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

  // Si está conectado, mostrar área de socios
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Cabecera del Área de Socios */}
        <div className="relative max-w-5xl mx-auto p-6 md:p-8 mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-orange-800/10 rounded-2xl border border-orange-500/30"></div>
          <div className="absolute inset-2 border border-orange-500/20 rounded-xl pointer-events-none"></div>
          
          {/* Botón de logout */}
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 text-gray-400 hover:text-orange-400 transition-colors duration-300 z-10"
            title="Cerrar sesión"
          >
            <span className="text-xl">⚙️</span>
          </button>
          
          <div className="relative z-10 text-center">
            <h1 className="text-3xl md:text-6xl font-black text-orange-500 mb-4 uppercase tracking-tight">
              Área de Socios
            </h1>
            <p className="text-lg md:text-2xl text-white font-light mb-6">Finger Foods Gourmet</p>
            
            <div className="bg-white/5 p-4 md:p-6 rounded-xl border-l-4 border-orange-500">
              <h3 className="text-orange-400 font-bold text-base md:text-xl mb-3">
                🎯 ¡Bienvenido {userEmail ? userEmail.split('@')[0] : 'Usuario'}!
              </h3>
              <p className="text-white leading-relaxed text-sm md:text-base">
                Ahora tienes acceso a la colección más completa de recetas gourmet para finger foods. 
                Haz clic en las imágenes de abajo para acceder a tus ebooks y bonos exclusivos.
              </p>
            </div>
          </div>
        </div>
        
        {/* Tarjeta del Ebook #1 */}
        <div className="mb-12">
          <a 
            href="https://www.canva.com/design/DAG1GDjGTug/mQ_CDhqRHlg3Nb45Rm0fqw/view?utm_content=DAG1GDjGTug&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb124006f0d"
            target="_blank"
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
                    La colección definitiva de finger foods gourmet para impresionar en cualquier evento. Recetas exclusivas que transformarán tus reuniones en experiencias gastronómicas inolvidables.
                  </p>
                  
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0">✓</span>
                      <span>50+ recetas exclusivas de finger foods</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0">✓</span>
                      <span>Técnicas profesionales de presentación</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0">✓</span>
                      <span>Ingredientes fáciles de encontrar</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0">✓</span>
                      <span>Instrucciones paso a paso detalladas</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0">✓</span>
                      <span>Resultados de nivel profesional</span>
                    </li>
                  </ul>
                  
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-orange-600 hover:to-orange-500 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Acceder al Volumen 1
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Tarjeta del Ebook #2 */}
        <div className="mb-12">
          <a 
            href="https://www.canva.com/design/DAG1Gw2lZew/2CL3KJdhcx_kddMmlrshfg/view?utm_content=DAG1Gw2lZew&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb7345fa760"
            target="_blank"
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
                    Técnicas avanzadas y combinaciones sofisticadas para elevar tus habilidades culinarias. Recetas premium que te convertirán en el anfitrión que todos admiran.
                  </p>
                  
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0">✓</span>
                      <span>55+ recetas premium avanzadas</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0">✓</span>
                      <span>Técnicas de emplatado profesional</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0">✓</span>
                      <span>Combinaciones gourmet de ingredientes</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0">✓</span>
                      <span>Secretos de chefs profesionales</span>
                    </li>
                  </ul>
                  
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-blue-600 hover:to-blue-500 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Acceder al Volumen 2
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Tarjeta del Ebook #3 */}
        <div className="mb-12">
          <a 
            href="https://www.canva.com/design/DAG1G8XqNnY/-QcBDCRtWP-gbJFtfd8YSQ/view?utm_content=DAG1G8XqNnY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h16ab3dd001"
            target="_blank"
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
                    Finger foods internacionales y recetas exclusivas que te harán el centro de atención en cualquier evento. Fusión cultural y creaciones únicas que sorprenderán a todos.
                  </p>
                  
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0">✓</span>
                      <span>55+ recetas internacionales exclusivas</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0">✓</span>
                      <span>Creaciones únicas y originales</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0">✓</span>
                      <span>Técnicas de fusión cultural</span>
                    </li>
                    <li className="flex items-center text-white text-sm md:text-base">
                      <span className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0">✓</span>
                      <span>Sabores de 5 continentes</span>
                    </li>
                  </ul>
                  
                  <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:from-purple-600 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
                    Acceder al Volumen 3
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Sección de Bonos */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-8">🎁 Bonos Exclusivos</h2>
          
          {/* Grid de Bonos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Bono 1: Gourmet Patés & Mousses */}
            <a 
              href="https://gourmet-pates-mousses-el-iuxexoq.gamma.site/"
              target="_blank"
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
                <p className="text-gray-300 text-sm">Recetas exclusivas de patés y mousses gourmet para complementar tus finger foods.</p>
              </div>
            </a>

            {/* Bono 2: Gourmet Pairings */}
            <a 
              href="https://gourmet-pairings-the-art-hxr2dbd.gamma.site/"
              target="_blank"
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
                <p className="text-gray-300 text-sm">El arte de combinar sabores perfectamente para crear experiencias gastronómicas únicas.</p>
              </div>
            </a>

            {/* Bono 3: From Host to Entrepreneur */}
            <a 
              href="https://from-host-to-entrepreneu-ny1j5mb.gamma.site/"
              target="_blank"
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
                <p className="text-gray-300 text-sm">Convierte tu pasión por la cocina en un negocio rentable con estrategias probadas.</p>
              </div>
            </a>

            {/* Bono 4: Calculator + Shopping List */}
            <a 
              href="https://essential-tools-for-effi-jw5lgyl.gamma.site/"
              target="_blank"
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
                <p className="text-gray-300 text-sm">Herramientas esenciales para planificar eventos y calcular cantidades perfectas.</p>
              </div>
            </a>

            {/* Bono 5: The Most Loved Snacks */}
            <a 
              href="https://the-most-loved-snacks-cl-yqhh96e.gamma.site/"
              target="_blank"
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
                <p className="text-gray-300 text-sm">Los snacks más populares y queridos que siempre son un éxito garantizado.</p>
              </div>
            </a>

            {/* Bono 6: Express Combo in 10 Minutes */}
            <a 
              href="https://express-combo-in-10-minu-sibrv1o.gamma.site/"
              target="_blank"
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
                <p className="text-gray-300 text-sm">Combinaciones rápidas y deliciosas para cuando tienes poco tiempo pero quieres impresionar.</p>
              </div>
            </a>

            {/* Bono 7: 4-Course Gourmet Dinners */}
            <a 
              href="https://gange-gourmet-dinner-ein-kw35y5d.gamma.site/"
              target="_blank"
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
                <p className="text-gray-300 text-sm">Menús completos de 4 tiempos para cenas gourmet que dejarán a todos sin palabras.</p>
              </div>
            </a>

            {/* Bono 8: +40 Gourmet Breakfasts */}
            <a 
              href="https://gourmet-breakfasts-6f9xkjk.gamma.site/"
              target="_blank"
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
                <p className="text-gray-300 text-sm">Más de 40 desayunos gourmet para empezar el día con estilo y sabor excepcional.</p>
              </div>
            </a>

            {/* Bono 9: Gourmet Drinks & Cocktails */}
            <a 
              href="https://gourmet-drinks-cocktails-djhbqmt.gamma.site/"
              target="_blank"
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
                <p className="text-gray-300 text-sm">Bebidas y cócteles gourmet para acompañar perfectamente tus finger foods.</p>
              </div>
            </a>

            {/* Bono 10: Event Planning Guide */}
            <a 
              href="https://the-art-of-unforgettable-zclccx7.gamma.site/"
              target="_blank"
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
                <p className="text-gray-300 text-sm">El arte de crear eventos inolvidables con planificación profesional y detalles perfectos.</p>
              </div>
            </a>

            {/* Bono 11: Gourmet Conservation */}
            <a 
              href="https://gourmet-conservation-s7xr5kb.gamma.site/"
              target="_blank"
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
                <p className="text-gray-300 text-sm">Técnicas avanzadas de conservación para mantener la frescura y calidad gourmet.</p>
              </div>
            </a>

          </div>
        </div>

        {/* Sección de Soporte */}
        <div className="bg-white/5 p-6 md:p-8 rounded-2xl text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-orange-400 text-xl md:text-2xl font-bold mb-4">💬 ¿Necesitas Ayuda?</h3>
          <p className="text-white mb-6 leading-relaxed text-sm md:text-base">
            Nuestro equipo de soporte está disponible para aclarar dudas y asistirte en tu viaje culinario gourmet.
          </p>
          <a 
            href="mailto:sflourcraft@gmail.com"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/30 text-sm md:text-base"
          >
            sflourcraft@gmail.com
          </a>
        </div>

        {/* Pie de página */}
        <div className="text-center py-8 md:py-12 border-t border-orange-500/30 text-gray-400">
          <p className="mb-2 text-sm md:text-base">© 2025 Finger Foods Gourmet. Todos los derechos reservados.</p>
          <p className="font-semibold text-sm md:text-base">Tu experiencia culinaria gourmet comienza ahora.</p>
        </div>
      </div>
    </div>
  );
}