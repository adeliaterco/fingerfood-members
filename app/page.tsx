"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');
  const [userProgress, setUserProgress] = useState({
    currentDay: 1,
    completedDays: [],
    pillarProgress: {
      independencia: 0,
      comunicacion: 0,
      espacio: 0,
      nostalgia: 0,
      presencia: 0,
      timing: 0,
      sostenible: 0
    },
    breakupType: null,
    totalScore: 0,
    weekPhase: 1 // 1: Fundación, 2: Atracción, 3: Reconexión
  });

  // Función de login
  const handleLogin = (emailValue) => {
    setUserEmail(emailValue);
    setIsLoggedIn(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('member_email', emailValue);
      const savedProgress = localStorage.getItem('user_progress');
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      }
    }
  };

  // Función de logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setCurrentView('dashboard');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('member_email');
    }
  };

  // Guardar progreso
  const saveProgress = (newProgress) => {
    setUserProgress(newProgress);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_progress', JSON.stringify(newProgress));
    }
  };

  // Verificar localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('member_email');
      if (savedEmail) {
        setUserEmail(savedEmail);
        setIsLoggedIn(true);
        const savedProgress = localStorage.getItem('user_progress');
        if (savedProgress) {
          setUserProgress(JSON.parse(savedProgress));
        }
      }
    }
  }, []);

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Por favor ingresa tu dirección de email');
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      handleLogin(email);
      setIsLoading(false);
    }, 1500);
  };

  // Completar tarea diaria
  const completeTask = (day, pillarType) => {
    const newProgress = { ...userProgress };
    if (!newProgress.completedDays.includes(day)) {
      newProgress.completedDays.push(day);
      newProgress.totalScore += 15;
      
      // Actualizar fase de la semana
      if (day <= 7) newProgress.weekPhase = 1;
      else if (day <= 14) newProgress.weekPhase = 2;
      else newProgress.weekPhase = 3;
    }
    
    // Actualizar progreso del pilar
    if (pillarType && newProgress.pillarProgress[pillarType] < 100) {
      newProgress.pillarProgress[pillarType] += 7;
    }
    
    newProgress.currentDay = Math.max(newProgress.currentDay, day + 1);
    saveProgress(newProgress);
  };

  // Si no está logueado, mostrar pantalla de login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          
          {/* Logo/Foto del Producto */}
          <div className="text-center mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6 rounded-3xl overflow-hidden border-4 border-red-500 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-2xl">
                PLAN A
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-red-500 mb-2 uppercase tracking-tight">
              PLAN A
            </h1>
            <p className="text-gray-400 text-sm">Reconquista en 21 Días</p>
            <p className="text-gray-500 text-xs mt-1">Transformación Personal y Reconquista Sostenible</p>
          </div>

          {/* Formulario de Login */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-2">🔐 Acceso Exclusivo</h2>
              <p className="text-gray-400 text-sm">Ingresa tu email para acceder a tu transformación</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email de acceso
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
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
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                🔒 Acceso seguro y encriptado
              </p>
            </div>
          </div>

          {/* Información de Soporte */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm mb-2">¿Problemas de acceso?</p>
            <a 
              href="mailto:soporte@plana.com"
              className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-300"
            >
              soporte@plana.com
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Componente de Navegación
  const Navigation = () => (
    <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              PA
            </div>
            <span className="text-white font-bold">Plan A</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`text-sm font-medium transition-colors duration-300 ${
                currentView === 'dashboard' ? 'text-red-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('journey')}
              className={`text-sm font-medium transition-colors duration-300 ${
                currentView === 'journey' ? 'text-red-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Jornada 21 Días
            </button>
            <button
              onClick={() => setCurrentView('pillars')}
              className={`text-sm font-medium transition-colors duration-300 ${
                currentView === 'pillars' ? 'text-red-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              7 Pilares
            </button>
            <button
              onClick={() => setCurrentView('diagnosis')}
              className={`text-sm font-medium transition-colors duration-300 ${
                currentView === 'diagnosis' ? 'text-red-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Diagnóstico
            </button>
            <button
              onClick={() => setCurrentView('scripts')}
              className={`text-sm font-medium transition-colors duration-300 ${
                currentView === 'scripts' ? 'text-red-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Scripts
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-400 transition-colors duration-300"
              title="Cerrar sesión"
            >
              <span className="text-lg">⚙️</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Vista Dashboard
  const DashboardView = () => (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      
      {/* Header de Bienvenida */}
      <div className="relative max-w-5xl mx-auto p-6 md:p-8 mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-2xl border border-red-500/30"></div>
        <div className="absolute inset-2 border border-red-500/20 rounded-xl pointer-events-none"></div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-6xl font-black text-red-500 mb-4 uppercase tracking-tight">
            Plan A Dashboard
          </h1>
          <p className="text-lg md:text-2xl text-white font-light mb-6">Reconquista en 21 Días</p>
          
          <div className="bg-white/5 p-4 md:p-6 rounded-xl border-l-4 border-red-500">
            <h3 className="text-red-400 font-bold text-base md:text-xl mb-3">
              🎯 ¡Bienvenido {userEmail ? userEmail.split('@')[0] : 'Usuario'}!
            </h3>
            <p className="text-white leading-relaxed text-sm md:text-base">
              Estás en el día <strong>{userProgress.currentDay}</strong> de tu jornada de transformación. 
              Mantén el enfoque en tus objetivos y sigue el protocolo para obtener los mejores resultados.
            </p>
          </div>
        </div>
      </div>

      {/* Resumen de Progreso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">Progreso General</h3>
            <span className="text-2xl">📈</span>
          </div>
          <div className="text-3xl font-black text-red-500 mb-2">
            {Math.round((userProgress.completedDays.length / 21) * 100)}%
          </div>
          <p className="text-gray-400 text-sm">
            {userProgress.completedDays.length} de 21 días completos
          </p>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(userProgress.completedDays.length / 21) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">Puntuación Total</h3>
            <span className="text-2xl">🏆</span>
          </div>
          <div className="text-3xl font-black text-yellow-500 mb-2">
            {userProgress.totalScore}
          </div>
          <p className="text-gray-400 text-sm">
            Puntos conquistados
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">Próximo Hito</h3>
            <span className="text-2xl">🎯</span>
          </div>
          <div className="text-xl font-bold text-blue-400 mb-2">
            {userProgress.weekPhase === 1 ? 'Semana 1 - Fundación' : 
             userProgress.weekPhase === 2 ? 'Semana 2 - Atracción' : 
             'Semana 3 - Reconexión'}
          </div>
          <p className="text-gray-400 text-sm">
            {userProgress.weekPhase === 1 ? 'Reconstrucción del Yo' : 
             userProgress.weekPhase === 2 ? 'Magnetismo Personal' : 
             'Reacercamiento Estratégico'}
          </p>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <button
          onClick={() => setCurrentView('journey')}
          className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
        >
          <div className="text-3xl mb-4">📅</div>
          <h3 className="text-white font-bold text-lg mb-2">Jornada 21 Días</h3>
          <p className="text-red-100 text-sm">Sigue tu progreso diario</p>
        </button>

        <button
          onClick={() => setCurrentView('diagnosis')}
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
        >
          <div className="text-3xl mb-4">🔍</div>
          <h3 className="text-white font-bold text-lg mb-2">Diagnóstico</h3>
          <p className="text-blue-100 text-sm">Identifica tu tipo de ruptura</p>
        </button>

        <button
          onClick={() => setCurrentView('pillars')}
          className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
        >
          <div className="text-3xl mb-4">🏛️</div>
          <h3 className="text-white font-bold text-lg mb-2">7 Pilares</h3>
          <p className="text-purple-100 text-sm">Estructura de la reconquista</p>
        </button>

        <button
          onClick={() => setCurrentView('scripts')}
          className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
        >
          <div className="text-3xl mb-4">💬</div>
          <h3 className="text-white font-bold text-lg mb-2">Scripts</h3>
          <p className="text-green-100 text-sm">Mensajes y comunicación</p>
        </button>
      </div>

      {/* Preview de Tareas Diarias */}
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 mb-12">
        <h3 className="text-white font-bold text-xl mb-6 flex items-center">
          <span className="mr-3">📋</span>
          Tareas de Hoy - Día {userProgress.currentDay}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
            <h4 className="text-red-400 font-bold mb-2">Mañana (7h-12h)</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center">
                <input type="checkbox" className="mr-2 text-red-500" 
                       onChange={(e) => e.target.checked && completeTask(userProgress.currentDay, 'independencia')} />
                Ejercicio físico (30 min)
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2 text-red-500" />
                Meditación (10 min)
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2 text-red-500" />
                Journaling diario
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
            <h4 className="text-blue-400 font-bold mb-2">Tarde (12h-18h)</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center">
                <input type="checkbox" className="mr-2 text-blue-500" />
                Actividad social
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2 text-blue-500" />
                Desarrollo personal
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2 text-blue-500" />
                Autocuidado físico
              </li>
            </ul>
          </div>

          <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
            <h4 className="text-purple-400 font-bold mb-2">Noche (18h-22h)</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center">
                <input type="checkbox" className="mr-2 text-purple-500" />
                Lectura (20 min)
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2 text-purple-500" />
                Reflexión del día
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2 text-purple-500" />
                Gratitud
              </li>
            </ul>
          </div>
        </div>
        
        <button 
          onClick={() => setCurrentView('journey')}
          className="w-full mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 rounded-xl hover:from-red-600 hover:to-red-500 transition-all duration-300"
        >
          Ver Cronograma Completo
        </button>
      </div>

      {/* Progreso de los 7 Pilares */}
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-white font-bold text-xl mb-6 flex items-center">
          <span className="mr-3">🏛️</span>
          Progreso de los 7 Pilares de la Reconquista
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {Object.entries(userProgress.pillarProgress).map(([pillar, progress], index) => {
            const pillarNames = {
              independencia: 'Independencia Emocional',
              comunicacion: 'Comunicación Magnetizante',
              espacio: 'Espacio Magnético',
              nostalgia: 'Gatillo de Nostalgia',
              presencia: 'Presencia Física y Digital',
              timing: 'Timing y Señales',
              sostenible: 'Reconquista Sostenible'
            };

            const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange'];
            
            return (
              <div key={pillar} className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={`#${colors[index] === 'red' ? 'ef4444' : 
                               colors[index] === 'blue' ? '3b82f6' :
                               colors[index] === 'green' ? '10b981' :
                               colors[index] === 'yellow' ? 'eab308' :
                               colors[index] === 'purple' ? '8b5cf6' :
                               colors[index] === 'pink' ? 'ec4899' : 'f97316'}`}
                      strokeWidth="2"
                      strokeDasharray={`${progress}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                    {progress}%
                  </div>
                </div>
                <h4 className="text-white font-medium text-xs text-center leading-tight">
                  {pillarNames[pillar]}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Renderizado principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Navigation />
      
      {currentView === 'dashboard' && <DashboardView />}
      {currentView === 'journey' && <JourneyView />}
      {currentView === 'pillars' && <PillarsView />}
      {currentView === 'diagnosis' && <DiagnosisView />}
      {currentView === 'scripts' && <ScriptsView />}
    </div>
  );  // Vista Jornada 21 Días
  const JourneyView = () => {
    const weeks = [
      {
        title: "SEMANA 1: FUNDACIÓN",
        subtitle: "Reconstrucción del Yo",
        days: [1, 2, 3, 4, 5, 6, 7],
        color: "red",
        description: "Enfoque: Estabilización emocional y autotransformación"
      },
      {
        title: "SEMANA 2: ATRACCIÓN", 
        subtitle: "Magnetismo Personal",
        days: [8, 9, 10, 11, 12, 13, 14],
        color: "blue",
        description: "Enfoque: Construcción de misterio y demostración de valor"
      },
      {
        title: "SEMANA 3: RECONEXIÓN",
        subtitle: "Reacercamiento Estratégico", 
        days: [15, 16, 17, 18, 19, 20, 21],
        color: "green",
        description: "Enfoque: Comunicación estratégica y reconquista sostenible"
      }
    ];

    const getDayDetails = (day) => {
      const dailyPlans = {
        1: {
          title: "Aceptación y Estabilización",
          morning: ["Ejercicio físico (30 min)", "Baño relajante + autocuidado", "Desayuno nutritivo", "Organización del ambiente personal"],
          afternoon: ["Actividad productiva (trabajo/estudios)", "Contacto con amigo/familiar cercano", "Remoción de gatillos visuales (fotos, regalos)"],
          night: ["Meditación (10 min)", "Journaling: '¿Qué aprendí sobre mí hoy?'", "Lectura motivacional (20 min)"],
          focus: "Silencio Estratégico Total"
        },
        2: {
          title: "Redirección de Energía",
          morning: ["Actividad física más intensa (45 min)", "Inicio de nuevo hobby", "Planificación financiera/profesional"],
          afternoon: ["Contacto social significativo", "Actividad creativa", "Meta productiva del día"],
          night: ["Reflexión del progreso", "Ejercicios de gratitud", "Planificación del día siguiente"],
          focus: "Canalizar energía emocional hacia crecimiento"
        },
        15: {
          title: "Primer Contacto",
          morning: ["Ejercicio físico", "Meditación para calmar nervios", "Preparación mental"],
          afternoon: ["Actividades normales", "Mantener rutina establecida", "Envío del primer mensaje (si es el momento)"],
          night: ["Análisis del día", "No obsesionarse con respuestas", "Mantener enfoque en crecimiento"],
          focus: "Romper el hielo de forma natural"
        }
      };
      
      return dailyPlans[day] || {
        title: `Día ${day} - Transformación Continua`,
        morning: ["Ejercicio físico", "Autocuidado", "Actividad productiva"],
        afternoon: ["Desarrollo personal", "Conexión social", "Hobby/interés"],
        night: ["Meditación", "Journaling", "Lectura"],
        focus: "Mantener momentum de crecimiento"
      };
    };

    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-red-500 mb-4 uppercase tracking-tight">
            Jornada 21 Días
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Tu camino completo hacia la transformación personal
          </p>
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 max-w-2xl mx-auto">
            <p className="text-red-200 text-sm">
              "La neuroplasticidad cerebral nos muestra que 21 días es el tiempo mínimo necesario para formar nuevos hábitos y patrones conductuales."
            </p>
          </div        </div>

        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="mb-12">
            <div className={`bg-gradient-to-r ${
              week.color === 'red' ? 'from-red-600 to-red-700' :
              week.color === 'blue' ? 'from-blue-600 to-blue-700' :
              'from-green-600 to-green-700'
            } rounded-2xl p-6 mb-6`}>
              <h2 className="text-2xl font-bold text-white mb-2">{week.title}</h2>
              <p className={`${
                week.color === 'red' ? 'text-red-100' :
                week.color === 'blue' ? 'text-blue-100' :
                'text-green-100'
              } mb-2`}>{week.subtitle}</p>
              <p className={`${
                week.color === 'red' ? 'text-red-200' :
                week.color === 'blue' ? 'text-blue-200' :
                'text-green-200'
              } text-sm`}>{week.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {week.days.map((day) => {
                const isCompleted = userProgress.completedDays.includes(day);
                const isCurrent = day === userProgress.currentDay;
                const dayDetails = getDayDetails(day);

                return (
                  <div
                    key={day}
                    className={`relative rounded-2xl p-4 border-2 transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
                      isCompleted 
                        ? `bg-${week.color}-500/20 border-${week.color}-500` 
                        : isCurrent 
                        ? 'bg-yellow-500/20 border-yellow-500 ring-2 ring-yellow-400' 
                        : 'bg-gray-800/50 border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => {
                      if (!isCompleted && day <= userProgress.currentDay) {
                        completeTask(day, 'independencia');
                      }
                    }}
                  >
                    {isCompleted && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                        ✓
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <div className={`text-2xl font-bold ${
                        isCompleted ? `text-${week.color}-400` : 
                        isCurrent ? 'text-yellow-400' : 'text-white'
                      }`}>
                        {day}
                      </div>
                      <div className="text-xs text-gray-400">
                        Día {day}
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <h5 className="font-bold text-white text-center mb-2">
                        {dayDetails.title}
                      </h5>
                      
                      <div>
                        <h4 className="font-semibold text-red-400 mb-1">Mañana:</h4>
                        <ul className="text-gray-300 space-y-1">
                          {dayDetails.morning.slice(0, 2).map((task, i) => (
                            <li key={i} className="text-xs">• {task}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-blue-400 mb-1">Tarde:</h4>
                        <ul className="text-gray-300 space-y-1">
                          {dayDetails.afternoon.slice(0, 2).map((task, i) => (
                            <li key={i} className="text-xs">• {task}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-purple-400 mb-1">Noche:</h4>
                        <ul className="text-gray-300 space-y-1">
                          {dayDetails.night.slice(0, 2).map((task, i) => (
                            <li key={i} className="text-xs">• {task}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {isCurrent && (
                      <div className="mt-3 text-center">
                        <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-medium">
                          HOY
                        </span>
                      </div>
                    )}

                    <div className="mt-2 text-center">
                      <p className="text-xs text-gray-400 italic">
                        {dayDetails.focus}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Resumen de Progreso */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Tu Progreso en la Jornada</h3>
          <div className="text-6xl font-black text-red-500 mb-2">
            {userProgress.completedDays.length}/21
          </div>
          <p className="text-gray-300 mb-6">Días completos en la transformación</p>
          
          <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
            <div 
              className="bg-gradient-to-r from-red-500 to-red-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${(userProgress.completedDays.length / 21) * 100}%` }}
            ></div>
          </div>

          {userProgress.completedDays.length === 21 && (
            <div className="bg-green-500/20 border border-green-500 rounded-xl p-6">
              <h4 className="text-2xl font-bold text-green-400 mb-2">¡Transformación Completa!</h4>
              <p className="text-green-200">
                Has completado los 21 días de transformación. Ahora eres una versión completamente renovada de ti mismo.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Vista de los 7 Pilares
  const PillarsView = () => {
    const pillars = [
      {
        id: 'independencia',
        title: 'Independencia Emocional Absoluta',
        description: 'Técnicas avanzadas de desapego y construcción de autoestima inquebrantable',
        icon: '🧘‍♂️',
        color: 'red',
        techniques: [
          'Técnica de la Observación Neutra',
          'Anclaje de Estado Positivo', 
          'Reestructuración Cognitiva',
          'Diario de la Independencia'
        ]
      },
      {
        id: 'comunicacion',
        title: 'Comunicación Magnetizante',
        description: 'La psicología de la primera impresión post-ruptura y scripts probados',
        icon: '💬',
        color: 'blue',
        techniques: [
          'Timing perfecto (nunca antes de 14 días)',
          'Regla del "menos es más"',
          'Scripts por fases de comunicación',
          'Técnica del espejo emocional'
        ]
      },
      {
        id: 'espacio',
        title: 'Espacio Magnético',
        description: 'El arte de la presencia/ausencia y los ciclos de proximidad',
        icon: '🎭',
        color: 'green',
        techniques: [
          'Ausencia Total (Días 1-14)',
          'Presencia Sutil (Días 15-18)', 
          'Proximidad Calculada (Días 19-21)',
          'Manejo de la tensión emocional'
        ]
      },
      {
        id: 'nostalgia',
        title: 'Gatillo de la Nostalgia',
        description: 'Neurociencia de las memorias románticas y activación estratégica',
        icon: '💭',
        color: 'yellow',
        techniques: [
          'Anclas Sensoriales (perfume, música)',
          'Referencias Indirectas a memorias',
          'Objetos Simbólicos',
          'Protocolo de Nostalgia Estratégica'
        ]
      },
      {
        id: 'presencia',
        title: 'Presencia Física y Digital',
        description: 'Tu marca personal y estrategia de redes sociales magnética',
        icon: '📱',
        color: 'purple',
        techniques: [
          'Regla 80/20 en contenido',
          'Tipos de contenido magnético',
          'Lenguaje corporal irresistible',
          'Frecuencia ideal de posts'
        ]
      },
      {
        id: 'timing',
        title: 'Timing y Lectura de Señales',
        description: 'Sistema de semáforo emocional y lectura de receptividad',
        icon: '🚦',
        color: 'pink',
        techniques: [
          'Señales de Apertura (Verde)',
          'Señales de Resistencia (Amarillo)',
          'Señales de Rechazo (Rojo)',
          'Calibración emocional'
        ]
      },
      {
        id: 'sostenible',
        title: 'Reconquista Sostenible',
        description: 'Construyendo la Relación 2.0 con bases sólidas',
        icon: '💎',
        color: 'orange',
        techniques: [
          'Comunicación Consciente',
          'Individualidad Preservada',
          'Intimidad Renovada',
          'Prevención de Recaídas'
        ]
      }
    ];

    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-red-500 mb-4 uppercase tracking-tight">
            7 Pilares de la Reconquista
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Estructura avanzada para una reconquista sostenible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const progress = userProgress.pillarProgress[pillar.id] || 0;
            
            return (
              <div key={pillar.id} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:-translate-y-2 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{pillar.icon}</div>
                  <h3 className={`text-xl font-bold mb-3 text-${pillar.color}-400`}>
                    {pillar.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Progreso del Pilar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium text-sm">Progreso</span>
                    <span className={`text-${pillar.color}-400 font-bold`}>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`bg-${pillar.color}-500 h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Técnicas del Pilar */}
                <div className="space-y-2">
                  <h4 className="text-white font-semibold text-sm mb-3">Técnicas Principales:</h4>
                  {pillar.techniques.map((technique, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-300">
                      <span className={`text-${pillar.color}-400 mr-2`}>•</span>
                      {technique}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    const newProgress = { ...userProgress };
                    newProgress.pillarProgress[pillar.id] = Math.min(100, progress + 10);
                    saveProgress(newProgress);
                  }}
                  className={`w-full mt-6 bg-gradient-to-r from-${pillar.color}-500 to-${pillar.color}-600 text-white font-semibold py-2 rounded-xl hover:from-${pillar.color}-600 hover:to-${pillar.color}-500 transition-all duration-300 text-sm`}
                >
                  Practicar Pilar
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Vista de Diagnóstico
  const DiagnosisView = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    const questions = [
      {
        id: 'duration',
        question: '¿Cuánto duró tu relación?',
        options: [
          { value: 'short', label: 'Menos de 6 meses', points: { desgaste: 1, traicion: 2, abrupta: 3, terceros: 2 } },
          { value: 'medium', label: '6 meses - 2 años', points: { desgaste: 2, traicion: 3, abrupta: 2, terceros: 3 } },
          { value: 'long', label: '2 - 5 años', points: { desgaste: 3, traicion: 2, abrupta: 1, terceros: 2 } },
          { value: 'verylong', label: 'Más de 5 años', points: { desgaste: 4, traicion: 1, abrupta: 1, terceros: 1 } }
        ]
      },
      {
        id: 'reason',
        question: '¿Cuál fue el motivo principal de la ruptura?',
        options: [
          { value: 'routine', label: 'Rutina y falta de pasión', points: { desgaste: 4, traicion: 0, abrupta: 1, terceros: 1 } },
          { value: 'betrayal', label: 'Traición o infidelidad', points: { desgaste: 0, traicion: 4, abrupta: 1, terceros: 2 } },
          { value: 'fight', label: 'Pelea fuerte o discusión', points: { desgaste: 1, traicion: 1, abrupta: 4, terceros: 1 } },
          { value: 'someone', label: 'Apareció otra persona', points: { desgaste: 1, traicion: 2, abrupta: 2, terceros: 4 } }
        ]
      },
      {
        id: 'communication',
        question: '¿Cómo era la comunicación en los últimos meses?',
        options: [
          { value: 'good', label: 'Buena, hablábamos de todo', points: { desgaste: 1, traicion: 2, abrupta: 3, terceros: 2 } },
          { value: 'superficial', label: 'Superficial, solo temas cotidianos', points: { desgaste: 4, traicion: 1, abrupta: 2, terceros: 2 } },
          { value: 'tense', label: 'Tensa, muchas discusiones', points: { desgaste: 2, traicion: 3, abrupta: 4, terceros: 1 } },
          { value: 'distant', label: 'Distante, casi no hablábamos', points: { desgaste: 3, traicion: 2, abrupta: 1, terceros: 3 } }
        ]
      },
      {
        id: 'ending',
        question: '¿Cómo terminó la relación?',
        options: [
          { value: 'gradual', label: 'Gradualmente, se fue apagando', points: { desgaste: 4, traicion: 1, abrupta: 0, terceros: 1 } },
          { value: 'sudden', label: 'De repente, sin previo aviso', points: { desgaste: 1, traicion: 2, abrupta: 4, terceros: 3 } },
          { value: 'expected', label: 'Era esperado, venía mal', points: { desgaste: 3, traicion: 3, abrupta: 1, terceros: 2 } },
          { value: 'shock', label: 'Fue un shock total para ti', points: { desgaste: 0, traicion: 4, abrupta: 3, terceros: 4 } }
        ]
      },
      {
        id: 'contact',
        question: '¿Cómo ha sido el contacto después de la ruptura?',
        options: [
          { value: 'none', label: 'Sin contacto alguno', points: { desgaste: 2, traicion: 3, abrupta: 4, terceros: 3 } },
          { value: 'minimal', label: 'Contacto mínimo y frío', points: { desgaste: 3, traicion: 4, abrupta: 2, terceros: 2 } },
          { value: 'friendly', label: 'Amigable pero distante', points: { desgaste: 4, traicion: 1, abrupta: 1, terceros: 1 } },
          { value: 'hostile', label: 'Hostil o conflictivo', points: { desgaste: 1, traicion: 4, abrupta: 3, terceros: 2 } }
        ]
      }
    ];

    const breakupTypes = {
      desgaste: {
        title: 'Ruptura por Desgaste Emocional',
        description: 'La relación "murió" gradualmente por rutina, falta de pasión y comunicación superficial.',
        strategy: 'Reencender la pasión a través de la novedad y misterio',
        color: 'blue',
        icon: '😔',
        approach: [
          'Renovación Total: Cambia todo lo que puedas sobre ti mismo',
          'Experiencias Inéditas: Muestra que te volviste más interesante', 
          'Energía Vibrante: Demuestra entusiasmo por la vida',
          'Sorpresas Positivas: Sé impredecible de forma positiva'
        ]
      },
      traicion: {
        title: 'Ruptura por Traición',
        description: 'Confianza rota por infidelidad o mentiras. Necesidad de reconstruir credibilidad.',
        strategy: 'Reconstrucción de la confianza a través de acciones consistentes',
        color: 'red',
        icon: '💔',
        approach: [
          'Responsabilidad Total: Asume 100% de la culpa sin justificaciones',
          'Transparencia Absoluta: Sé un libro abierto',
          'Paciencia Estratégica: Acepta que el proceso será más largo',
          'Demostración por Acciones: Las palabras no bastan'
        ]
      },
      abrupta: {
        title: 'Ruptura Abrupta/Impulsiva',
        description: 'Decisión tomada en el calor de la emoción. Posible arrepentimiento posterior.',
        strategy: 'Dar tiempo para enfriar y demostrar madurez',
        color: 'yellow',
        icon: '⚡',
        approach: [
          'Distancia Respetuosa: Más tiempo de silencio (21 días)',
          'Madurez Emocional: Demuestra que procesaste la situación',
          'Abordaje Suave: Primer contacto extremadamente cuidadoso',
          'Enfoque en el Futuro: No revivas el momento de la ruptura'
        ]
      },
      terceros: {
        title: 'Ruptura con Terceros Involucrados',
        description: 'Nueva relación iniciada rápidamente. Sentimientos de sustitución.',
        strategy: 'Ser incomparablemente mejor, no competir directamente',
        color: 'purple',
        icon: '👥',
        approach: [
          'Elevación Personal: Conviértete en la mejor versión posible',
          'Diferenciación: Muestra cualidades únicas que el rival no tiene',
          'Paciencia Estratégica: Las relaciones de rebote raramente duran',
          'Positividad: Nunca hables mal del rival o de la situación'
        ]
      }
    };

    const calculateResult = () => {
      const scores = { desgaste: 0, traicion: 0, abrupta: 0, terceros: 0 };
      
      Object.values(answers).forEach(answer => {
        Object.entries(answer.points).forEach(([type, points]) => {
          scores[type] += points;
        });
      });

      const maxScore = Math.max(...Object.values(scores));
      const resultType = Object.keys(scores).find(key => scores[key] === maxScore);
      
      return breakupTypes[resultType];
    };

    const handleAnswer = (option) => {
      const newAnswers = { ...answers, [questions[currentQuestion].id]: option };
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
        // Guardar resultado en el progreso
        const result = calculateResult();
        const newProgress = { ...userProgress, breakupType: result.title };
        saveProgress(newProgress);
      }
    };

    const resetDiagnosis = () => {
      setCurrentQuestion(0);
      setAnswers({});
      setShowResult(false);
    };

    if (showResult) {
      const result = calculateResult();
      
      return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-red-500 mb-4">Tu Diagnóstico</h1>
          </div>

          <div className={`bg-${result.color}-500/10 border border-${result.color}-500/30 rounded-2xl p-8 mb-8`}>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{result.icon}</div>
              <h2 className={`text-2xl font-bold text-${result.color}-400 mb-4`}>
                {result.title}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {result.description}
              </p>
              <div className={`bg-${result.color}-500/20 rounded-xl p-4`}>
                <h3 className={`text-${result.color}-300 font-bold mb-2`}>Estrategia Recomendada:</h3>
                <p className={`text-${result.color}-100`}>{result.strategy}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h4 className="text-white font-bold text-lg mb-4">Plan de Acción:</h4>
                <ul className="space-y-3">
                  {result.approach.map((step, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-300">
                      <span className={`text-${result.color}-400 mr-3 font-bold`}>
                        {index + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6">
                <h4 className="text-white font-bold text-lg mb-4">Enfoque Específico:</h4>
                <div className="space-y-4 text-sm text-gray-300">
                  <div>
                    <strong className={`text-${result.color}-400`}>Tiempo de Silencio:</strong>
                    <p>{result.title.includes('Traición') ? '21-30 días' : 
                        result.title.includes('Abrupta') ? '21-28 días' : '14-21 días'}</p>
                  </div>
                  <div>
                    <strong className={`text-${result.color}-400`}>Probabilidad de Éxito:</strong>
                    <p>{result.title.includes('Desgaste') ? 'Alta (70-80%)' : 
                        result.title.includes('Terceros') ? 'Media (50-60%)' :
                        result.title.includes('Traición') ? 'Media-Baja (40-50%)' : 'Alta (65-75%)'}</p>
                  </div>
                  <div>
                    <strong className={`text-${result.color}-400`}>Factor Clave:</strong>
                    <p>{result.title.includes('Desgaste') ? 'Renovación personal' : 
                        result.title.includes('Traición') ? 'Reconstruir confianza' :
                        result.title.includes('Abrupta') ? 'Demostrar madurez' : 'Paciencia estratégica'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 space-y-4">
              <button
                onClick={() => setCurrentView('journey')}
                className={`bg-gradient-to-r from-${result.color}-500 to-${result.color}-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-${result.color}-600 hover:to-${result.color}-500 transition-all duration-300 mr-4`}
              >
                Comenzar Jornada 21 Días
              </button>
              <button
                onClick={resetDiagnosis}
                className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
              >
                Hacer Diagnóstico Nuevamente
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-red-500 mb-4">Diagnóstico de Ruptura</h1>
          <p className="text-xl text-gray-300">
            Identifica tu tipo de ruptura para una estrategia personalizada
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-sm">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-red-400 font-bold">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {questions[currentQuestion].question}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 hover:border-red-500 rounded-xl p-6 text-left transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-white font-medium">
                  {option.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Vista de Scripts
  const ScriptsView = () => {
    const scriptCategories = [
      {
        title: 'Primer Contacto (Días 14-16)',
        color: 'blue',
        icon: '📞',
        scripts: [
          {
            title: 'Script Universal',
            content: 'Hola [nombre], vi [algo relacionado a interés común] y me acordé de ti. ¡Espero que estés bien! 😊',
            when: 'Para cualquier tipo de ruptura después de 14 días'
          },
          {
            title: 'Script con Crecimiento',
            content: 'Hola [nombre], empecé [actividad que siempre me incentivaste]. Me acordé de cómo creías en mí más que yo mismo. ¿Cómo estás?',
            when: 'Cuando has tenido crecimiento personal visible'
          }
        ]
      },
      {
        title: 'Construcción de Rapport (Días 17-19)',
        color: 'green',
        icon: '💬',
        scripts: [
          {
            title: 'Compartiendo Experiencia',
            content: 'Acabo de [experiencia interesante]. Siempre dijiste que querías hacer esto también. ¿Cómo van tus proyectos?',
            when: 'Para generar curiosidad y conexión'
          }
        ]
      },
      {
        title: 'Invitación Sutil (Días 20-21)',
        color: 'purple',
        icon: '☕',
        scripts: [
          {
            title: 'Encuentro Casual',
            content: 'Voy a ir a [evento/lugar que les gustaba] el [día]. Me acordé de cómo te gustaba [aspecto específico]. Si quieres aparecer, sería genial verte por ahí.',
            when: 'Para proponer un reencuentro sin presión'
          }
        ]
      }
    ];

    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-red-500 mb-4">Scripts de Comunicación</h1>
          <p className="text-xl text-gray-300">Mensajes probados para cada fase de la reconquista</p>
        </div>

        {scriptCategories.map((category, index) => (
          <div key={index} className="mb-8">
            <div className={`bg-gradient-to-r from-${category.color}-600 to-${category.color}-700 rounded-2xl p-6 mb-6`}>
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-3">{category.icon}</span>
                {category.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.scripts.map((script, scriptIndex) => (
                <div key={scriptIndex} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                  <h3 className={`text-${category.color}-400 font-bold text-lg mb-4`}>
                    {script.title}
                  </h3>
                  <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                    <p className="text-white italic">"{script.content}"</p>
                  </div>
                  <p className="text-gray-400 text-sm">
                    <strong>Cuándo usar:</strong> {script.when}
                  </p>
                  <button 
                    onClick={() => navigator.clipboard.writeText(script.content)}
                    className={`mt-4 bg-${category.color}-500 hover:bg-${category.color}-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300`}
                  >
                    Copiar Script
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Consejos Generales */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <h3 className="text-red-400 font-bold text-xl mb-4">⚠️ Reglas de Oro para Todos los Scripts</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• <strong>Timing es todo:</strong> Nunca hagas contacto antes del tiempo recomendado</li>
            <li>• <strong>Menos es más:</strong> Mensajes concisos son más poderosos</li>
            <li>• <strong>Valor primero:</strong> Siempre ofrece algo (humor, información, experiencia)</li>
            <li>• <strong>Deja abierto:</strong> Termina conversaciones en el pico, no en el valle</li>
            <li>• <strong>Sin desesperación:</strong> Nunca muestres carencia o necesidad</li>
          </ul>
        </div>
      </div>
    );
  };

  // Footer de Soporte
  const SupportFooter = () => (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center">
          <h3 className="text-red-400 text-xl font-bold mb-4">💬 ¿Necesitas Ayuda?</h3>
          <p className="text-white mb-6 leading-relaxed">
            Nuestro equipo de soporte está disponible para aclarar dudas y asistirte en tu jornada de transformación.
          </p>
          <a 
            href="mailto:soporte@plana.com"
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30"
          >
            soporte@plana.com
          </a>
          
          <div className="text-center py-8 border-t border-gray-800 mt-8 text-gray-400">
            <p className="mb-2">© 2024 - Plan A - Todos los derechos reservados</p>
            <p className="font-semibold">Tu experiencia de transformación personal comienza ahora.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
