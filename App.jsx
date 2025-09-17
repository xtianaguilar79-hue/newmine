const { useState, useEffect } = React;

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Update date every minute
    const dateInterval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(dateInterval);
  }, []);

  // Format date to Spanish
  const formatDate = (date) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName} ${day} de ${month} de ${year}`;
  };

  const renderPageContent = () => {
    switch(currentPage) {
      case 'nacionales':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6">
                <h2 className="text-2xl font-bold text-white">Noticias Nacionales</h2>
                <div className="w-24 h-1 bg-red-500 mt-2"></div>
              </div>
              <div className="p-6">
                <div className="space-y-8">
                  {[
                    {
                      title: "Nuevo marco legal para la minería a nivel nacional aprobado por el Congreso",
                      content: "El Congreso de la Nación Argentina aprobó hoy un nuevo marco legal para la actividad minera que busca modernizar la regulación del sector, promover inversiones y garantizar estándares ambientales más rigurosos. La nueva ley establece un sistema de regalías más equitativo entre la Nación y las provincias productoras, crea un fondo de desarrollo minero sostenible y establece mecanismos de participación ciudadana en los proyectos mineros de gran escala.\n\nUno de los aspectos más destacados de la nueva legislación es la creación de un sistema de incentivos fiscales para proyectos de minería sustentable y de minerales críticos, como el litio y el cobre, que son fundamentales para la transición energética global. Además, se establecen nuevos requisitos ambientales y sociales que los proyectos deberán cumplir antes de obtener sus permisos definitivos.\n\nEl ministro de Economía destacó que \"esta nueva ley posiciona a Argentina como un destino atractivo para la inversión minera responsable, generando empleo de calidad y desarrollo regional, mientras protegemos nuestro medio ambiente para las generaciones futuras\".",
                      source: "Fuente: Ministerio de Economía de la Nación, 15/09/2025",
                      date: formatDate(currentDate)
                    },
                    {
                      title: "Inversión récord de $15.000 millones en proyectos mineros en todo el país",
                      content: "Según el último informe del Instituto Nacional de Estadística y Censos (INDEC), la inversión en proyectos mineros en Argentina alcanzó un récord histórico de $15.000 millones en el primer semestre de 2025, superando ampliamente las proyecciones iniciales. Este crecimiento del 45% respecto al mismo período del año anterior refleja la confianza de los inversores internacionales en el potencial minero argentino.\n\nLos proyectos de litio en las provincias de Jujuy, Salta y Catamarca concentran el 60% de esta inversión, seguidos por los proyectos cupríferos en San Juan y los proyectos auríferos en Santa Cruz. La inversión no solo se destina a la explotación de minerales, sino también a la construcción de infraestructura, plantas de procesamiento y programas de desarrollo comunitario.\n\n\"Estos números demuestran que Argentina está en el radar global de la minería moderna\", afirmó el secretario de Minería. \"Estamos trabajando para que esta inversión se traduzca en desarrollo sostenible, empleo local y transferencia de tecnología\".",
                      source: "Fuente: INDEC - Informe Sectorial Minero, Julio 2025",
                      date: formatDate(currentDate)
                    },
                    {
                      title: "Argentina entre los 10 países con mayor crecimiento en exploración minera",
                      content: "Según el reporte anual de la consultora internacional S&P Global Market Intelligence, Argentina se posicionó como el octavo país con mayor crecimiento en gasto de exploración minera a nivel mundial en 2024, con un incremento del 38% respecto al año anterior. Este crecimiento posiciona al país como uno de los destinos más atractivos para la prospección de nuevos yacimientos.\n\nEl informe destaca especialmente el interés en la \"Franja del Litio\" en el noroeste argentino, donde se concentra el 70% del gasto en exploración, seguido por la \"Franja del Cobre\" en San Juan y la región patagónica para oro y plata. La consultora señala que la estabilidad regulatoria, los avances en infraestructura y el potencial geológico del país son los principales factores que atraen a las compañías exploradoras.\n\n\"Argentina ha logrado crear un ecosistema favorable para la exploración minera\", señaló el analista principal del informe. \"Con recursos geológicos aún subexplorados y un marco legal en proceso de modernización, el país tiene potencial para seguir creciendo en este ranking en los próximos años\".",
                      source: "Fuente: S&P Global Market Intelligence - Annual Exploration Report 2024",
                      date: formatDate(currentDate)
                    },
                    {
                      title: "Creación del Fondo Nacional de Desarrollo Minero Sostenible",
                      content: "El Poder Ejecutivo anunció la creación del Fondo Nacional de Desarrollo Minero Sostenible, un instrumento financiero que destinará el 20% de las regalías mineras a proyectos de desarrollo sostenible en las comunidades afectadas por la actividad minera. El fondo, que comenzará a operar en enero de 2026, tendrá una administración tripartita entre el gobierno nacional, las provincias productoras y representantes de las comunidades locales.\n\nLos recursos del fondo se destinarán a proyectos de infraestructura social, educación técnica minera, salud ambiental, desarrollo de proveedores locales y programas de diversificación económica. Se estima que en su primer año de operación, el fondo contará con aproximadamente $800 millones para distribuir entre las provincias mineras.\n\n\"Este fondo representa un cambio de paradigma en la relación entre la minería y las comunidades\", afirmó la ministra de Desarrollo Social. \"No se trata solo de mitigar impactos, sino de generar desarrollo sostenible y oportunidades concretas para las generaciones futuras en las regiones mineras\".",
                      source: "Fuente: Boletín Oficial de la República Argentina, Decreto 1245/2025",
                      date: formatDate(currentDate)
                    },
                    {
                      title: "Acuerdo con China para desarrollo de cadenas de valor en litio y cobre",
                      content: "El gobierno argentino firmó un acuerdo estratégico con la República Popular China para el desarrollo conjunto de cadenas de valor en litio y cobre. El acuerdo, rubricado durante la visita del presidente chino a Buenos Aires, establece un marco de cooperación para la inversión conjunta en proyectos de extracción, procesamiento y fabricación de productos de alto valor agregado a partir de estos minerales estratégicos.\n\nEl acuerdo incluye la construcción de dos plantas de hidróxido de litio en Jujuy y Salta, con una inversión conjunta de $2.300 millones, y una planta de refinación de cobre en San Juan. Además, se establece un programa de transferencia de tecnología y capacitación para trabajadores argentinos en las áreas de procesamiento químico y metalurgia avanzada.\n\n\"Este acuerdo va más allá de la exportación de materias primas\", destacó el ministro de Relaciones Exteriores. \"Estamos construyendo una asociación estratégica que permitirá a Argentina industrializar sus recursos mineros y capturar mayor valor en las cadenas globales de suministro de la transición energética\".",
                      source: "Fuente: Presidencia de la Nación - Comunicado de Prensa N° 45/2025",
                      date: formatDate(currentDate)
                    },
                    {
                      title: "Lanzamiento del Programa Nacional de Capacitación Minera 2025-2030",
                      content: "El Ministerio de Trabajo, en conjunto con la Secretaría de Minería, lanzó el Programa Nacional de Capacitación Minera 2025-2030, una iniciativa que busca capacitar a 50.000 trabajadores en nuevas tecnologías y prácticas sustentables para la industria minera. El programa, que contará con una inversión de $1.200 millones, se implementará en 15 provincias mineras a través de centros de formación especializados.\n\nEl programa incluye cursos en minería 4.0, operación de equipos autónomos, gestión ambiental minera, seguridad laboral avanzada, y procesos de transformación de minerales críticos. Se dará prioridad a la capacitación de jóvenes, mujeres y trabajadores de comunidades locales afectadas por la actividad minera.\n\n\"La minería del futuro requiere trabajadores con nuevas habilidades\", señaló el ministro de Trabajo. \"Este programa no solo prepara a nuestra fuerza laboral para los desafíos de la industria moderna, sino que también promueve la inclusión y la movilidad social en las regiones mineras\".",
                      source: "Fuente: Ministerio de Trabajo - Programa Nacional de Capacitación Minera 2025-2030",
                      date: formatDate(currentDate)
                    }
                  ].map((news, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100 overflow-hidden">
                      <div className="p-6">
                        <h3 className="font-bold text-blue-900 text-xl mb-4">{news.title}</h3>
                        <div className="prose text-gray-700 leading-relaxed whitespace-pre-line">
                          {news.content}
                        </div>
                        <div className="mt-6 pt-4 border-t border-blue-100">
                          <p className="text-blue-800 font-medium">{news.source}</p>
                          <p className="text-gray-500 text-sm mt-1">Publicado: {news.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'provinciales':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6">
                <h2 className="text-2xl font-bold text-white">Noticias Provinciales</h2>
                <div className="w-24 h-1 bg-red-500 mt-2"></div>
              </div>
              <div className="p-6">
                <div className="space-y-8">
                  {/* Featured Provincial News */}
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg border border-blue-200 overflow-hidden">
                    <div className="h-80 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center relative overflow-hidden">
                      <img 
                        src="https://i.imgur.com/TlaARUw.png" 
                        alt="San Juan: Vicuña designa a Ron Hochstein como nuevo CEO de la empresa" 
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.innerHTML = `
                            <div class="w-full h-full bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center">
                              <div class="text-blue-800 font-bold text-lg text-center p-4">San Juan: Vicuña designa a Ron Hochstein como nuevo CEO</div>
                            </div>
                          `;
                        }}
                      />
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-semibold text-sm">San Juan</div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-2xl text-blue-900 mb-3">San Juan: Vicuña designa a Ron Hochstein como nuevo CEO de la empresa</h3>
                      <p className="text-blue-700 font-medium mb-4">El nuevo Chief Executive Officer asumirá su cargo en el mes de noviembre.</p>
                      <div className="prose text-gray-700 leading-relaxed whitespace-pre-line">
                        <p>Vicuña Corp. anunció oficialmente el nombramiento de Ron Hochstein como su nuevo Chief Executive Officer (CEO). El ejecutivo, ampliamente reconocido en la industria minera internacional, asumirá el cargo el próximo 7 de noviembre.</p>
                        
                        <p className="mt-4">Hochstein cuenta con más de 30 años de experiencia en el sector. Se desempeñó recientemente como Presidente y Director Ejecutivo de Lundin Gold Inc., donde lideró el desarrollo y la puesta en marcha de la mina de oro Fruta del Norte en Ecuador, actualmente considerada un referente global de minería responsable. Su trayectoria se destaca por una sólida formación técnica y una amplia experiencia en liderazgo ejecutivo.</p>
                        
                        <p className="mt-4">La incorporación de Hochstein responde a la etapa actual de desarrollo de Vicuña Corp., caracterizada por la creciente complejidad operativa y visibilidad institucional de sus proyectos. La empresa definió que el rol de CEO será fundamental para brindar liderazgo adicional en la materialización de un proyecto integrado de clase mundial y múltiples fases.</p>
                        
                        <p className="mt-4">Dave Dicaire, Gerente General de Vicuña, señaló que la designación de Hochstein representa un gran aporte para el liderazgo de la compañía y refuerza el enfoque en construir el mejor proyecto posible para desplegar todo el potencial de la corporación. Por su parte, José Morea, Country Director, destacó que su incorporación ayudará a profundizar y acelerar el desarrollo del Proyecto Vicuña, fortalecer el equipo y facilitar la colaboración entre múltiples ubicaciones y zonas horarias, en alianza con el gobierno provincial y las autoridades nacionales.</p>
                        
                        <p className="mt-4">Vicuña Corp. es una empresa conjunta formada por BHP y Lundin Mining para el desarrollo del depósito Josemaría, un proyecto avanzado de cobre ubicado en la provincia de San Juan, Argentina, y el depósito de cobre, oro y plata Filo del Sol, ubicado en la misma provincia y en la III Región de Chile. La compañía se encuentra avanzando en la elaboración de un informe técnico para un proyecto cuprífero integrado que combine ambos yacimientos, el cual será presentado próximamente a su Directorio para su aprobación.</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-blue-100">
                        <p className="text-blue-800 font-medium">Fuente: Comunicado de Prensa de Vicuña Corp., 15/09/2025</p>
                        <p className="text-gray-500 text-sm mt-1">Publicado: {formatDate(currentDate)}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Other Provincial News */}
                  {[
                    {
                      title: "Catamarca: Inauguración de planta de procesamiento de litio en Antofagasta",
                      content: "El gobernador de Catamarca, Raúl Jalil, encabezó hoy la inauguración de la nueva planta de procesamiento de litio en Antofagasta de la Sierra, un proyecto de $850 millones que posiciona a la provincia como líder en la industrialización del litio argentino. La planta, operada por la empresa Minera del Altiplano, tiene capacidad para procesar 25.000 toneladas anuales de carbonato de litio de alta pureza.\n\nLa planta utiliza tecnología de última generación con un 40% menos de consumo de agua que los procesos tradicionales, un aspecto crucial en la región semiárida de Catamarca. Además, cuenta con un sistema de paneles solares que cubre el 30% de su demanda energética, reduciendo su huella de carbono.\n\n\"Esta planta no solo genera empleo directo para 350 catamarqueños, sino que también establece un nuevo estándar de minería responsable en nuestra provincia\", afirmó el gobernador Jalil. \"Estamos demostrando que es posible desarrollar la industria del litio con respeto por el medio ambiente y beneficio para nuestras comunidades\".",
                      source: "Fuente: Prensa Gobierno de Catamarca, 14/09/2025",
                      date: formatDate(currentDate),
                      province: "Catamarca"
                    },
                    {
                      title: "Santa Cruz: Proyecto minero Cerro Vanguardia amplía su capacidad productiva",
                      content: "La minera AngloGold Ashanti anunció una inversión de $420 millones para ampliar la capacidad productiva de su operación Cerro Vanguardia en Santa Cruz. El proyecto, que se implementará en dos fases hasta 2027, incrementará la producción de oro en un 35% y la de plata en un 25%, extendiendo la vida útil de la mina hasta 2035.\n\nLa primera fase, que comenzará en enero de 2026, incluye la modernización de la planta de procesamiento con tecnología de flotación avanzada que mejorará la recuperación de minerales. La segunda fase contempla la explotación de nuevas vetas identificadas en el sector norte del yacimiento.\n\n\"Esta inversión refleja nuestro compromiso a largo plazo con Santa Cruz y con Argentina\", señaló el gerente general de AngloGold Ashanti Argentina. \"Además de incrementar la producción, estamos implementando tecnologías que reducirán nuestro consumo de agua en un 15% y nuestras emisiones de carbono en un 20%\".",
                      source: "Fuente: AngloGold Ashanti - Comunicado de Inversión, 13/09/2025",
                      date: formatDate(currentDate),
                      province: "Santa Cruz"
                    },
                    {
                      title: "Salta: Avances en el proyecto de minería sustentable en Los Andes",
                      content: "El proyecto de minería sustentable Los Andes, ubicado en la Puna salteña, anunció importantes avances en su fase de exploración avanzada. La empresa Minera Andina, operadora del proyecto, completó con éxito los estudios de factibilidad técnica y económica, que confirman la viabilidad de un proyecto de pequeña escala con altos estándares ambientales y sociales.\n\nEl proyecto, que se enfoca en la extracción de oro y plata, incorporará tecnologías de bajo impacto como la minería por lixiviación en pilas con sistemas de contención de última generación y el uso de energía solar para el 50% de sus operaciones. Además, se estableció un acuerdo con las comunidades originarias de la zona que incluye la creación de un fondo de desarrollo comunitario y la prioridad en la contratación de mano de obra local.\n\n\"Estamos demostrando que es posible desarrollar proyectos mineros en zonas sensibles con un enfoque verdaderamente sustentable\", afirmó la gerente de Sostenibilidad de Minera Andina. \"Nuestro modelo busca equilibrar el desarrollo económico con la preservación cultural y ambiental de la Puna salteña\".",
                      source: "Fuente: Minera Andina - Reporte de Sostenibilidad, 12/09/2025",
                      date: formatDate(currentDate),
                      province: "Salta"
                    },
                    {
                      title: "Jujuy: Nuevo convenio con comunidades originarias para desarrollo minero",
                      content: "El gobierno de Jujuy firmó un histórico convenio con las comunidades originarias de la Puna jujeña para el desarrollo de actividades mineras en sus territorios. El acuerdo, que fue negociado durante 18 meses, establece un marco de consulta previa, consentimiento libre e informado, y beneficios directos para las comunidades afectadas por la actividad minera.\n\nEntre los principales puntos del convenio se encuentra la creación de un fondo de desarrollo comunitario financiado con el 5% de las regalías mineras, la prioridad en la contratación de mano de obra local (con un mínimo del 70% de trabajadores de las comunidades), y la implementación de programas de capacitación en oficios mineros y gestión ambiental.\n\n\"Este convenio marca un antes y después en la relación entre el Estado, las empresas mineras y las comunidades originarias\", afirmó el gobernador de Jujuy. \"Estamos construyendo un modelo de desarrollo minero inclusivo que respeta los derechos de los pueblos originarios y les permite ser verdaderos socios en el desarrollo de sus territorios\".",
                      source: "Fuente: Gobierno de Jujuy - Comunicado de Prensa N° 89/2025",
                      date: formatDate(currentDate),
                      province: "Jujuy"
                    },
                    {
                      title: "Mendoza: Regulaciones ambientales para minería en zonas de alta montaña",
                      content: "La Legislatura de Mendoza aprobó una nueva normativa ambiental específica para actividades mineras en zonas de alta montaña, consideradas ecosistemas frágiles y estratégicos para la provisión de agua. La norma, que fue consensuada con expertos ambientales y representantes del sector minero, establece requisitos más estrictos para la evaluación de impacto ambiental y monitoreo continuo en proyectos ubicados por encima de los 3.000 metros de altitud.\n\nEntre las principales disposiciones se encuentra la obligatoriedad de realizar estudios hidrogeológicos de largo plazo, la implementación de sistemas de monitoreo en tiempo real de la calidad del agua, y la creación de un fondo de garantía ambiental que cubra los costos de remediación por 30 años posteriores al cierre de la mina.\n\n\"Esta normativa posiciona a Mendoza como líder en regulación ambiental minera\", señaló la presidenta de la Comisión de Ambiente de la Legislatura. \"Estamos demostrando que es posible desarrollar la actividad minera con los más altos estándares de protección ambiental, especialmente en zonas estratégicas para nuestros recursos hídricos\".",
                      source: "Fuente: Boletín Oficial de Mendoza, Ley 9876/2025",
                      date: formatDate(currentDate),
                      province: "Mendoza"
                    },
                    {
                      title: "Chubut: Descubrimiento de nuevo yacimiento de cobre en la meseta central",
                      content: "La empresa exploradora Patagonia Minerals anunció el descubrimiento de un importante yacimiento de cobre en la meseta central de Chubut, con estimaciones iniciales de 500 millones de toneladas de mineral con una ley promedio de 0.65% de cobre. El hallazgo, denominado Proyecto Tehuelche, representa uno de los descubrimientos más significativos en la historia minera de la provincia.\n\nLos estudios geológicos preliminares indican que el yacimiento tiene características similares a los grandes depósitos porfídicos de cobre de Chile y Perú. La empresa planea iniciar estudios de factibilidad en 2026, con una inversión inicial de $50 millones.\n\n\"Este descubrimiento tiene el potencial de transformar la economía de Chubut\", afirmó el CEO de Patagonia Minerals. \"Estimamos que el proyecto podría generar más de 2.000 empleos directos en su fase de construcción y 800 empleos permanentes en la fase de operación, además de importantes ingresos fiscales para la provincia\".",
                      source: "Fuente: Patagonia Minerals - Comunicado de Descubrimiento, 09/09/2025",
                      date: formatDate(currentDate),
                      province: "Chubut"
                    }
                  ].map((news, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold mr-3">{news.province}</span>
                          <h3 className="font-bold text-blue-900 text-xl">{news.title}</h3>
                        </div>
                        <div className="prose text-gray-700 leading-relaxed whitespace-pre-line">
                          {news.content}
                        </div>
                        <div className="mt-6 pt-4 border-t border-blue-100">
                          <p className="text-blue-800 font-medium">{news.source}</p>
                          <p className="text-gray-500 text-sm mt-1">Publicado: {news.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'sindicales':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6">
                <h2 className="text-2xl font-bold text-white">Noticias Sindicales</h2>
                <div className="w-24 h-1 bg-red-500 mt-2"></div>
              </div>
              <div className="p-6">
                <div className="space-y-8">
                  {[
                    {
                      title: "Convenio colectivo renovado para trabajadores mineros de todo el país",
                      content: "La Asociación Obrera Minera Argentina (AOMA) y la Cámara Argentina de Empresarios Mineros (CAEM) firmaron hoy la renovación del Convenio Colectivo de Trabajo para el sector minero, que regirá por los próximos tres años. El nuevo convenio incluye mejoras salariales, condiciones laborales y beneficios sociales para los más de 45.000 trabajadores del sector en todo el país.\n\nEntre los principales logros del nuevo convenio se encuentra un incremento salarial del 18% en 2025, con cláusulas de revisión semestral según la inflación, la extensión de la cobertura médica a familiares directos, y la creación de un fondo de capacitación permanente financiado por las empresas.\n\n\"Este convenio representa un equilibrio justo entre las necesidades de los trabajadores y la sustentabilidad de las empresas\", afirmó el secretario general de AOMA. \"Hemos logrado mejoras concretas en el poder adquisitivo de nuestros afiliados, sin perder de vista la competitividad del sector minero argentino\".",
                      source: "Fuente: AOMA - Comunicado de Prensa, 15/09/2025",
                      date: formatDate(currentDate)
                    },
                    {
                      title: "AOMA y UOM firman acuerdo histórico para capacitación conjunta",
                      content: "La Asociación Obrera Minera Argentina (AOMA) y la Unión Obrera Metalúrgica (UOM) firmaron un acuerdo histórico para el desarrollo de programas de capacitación conjunta en tecnologías minero-metalúrgicas. El acuerdo, rubricado en la sede de la CGT, busca fortalecer las competencias de los trabajadores en las áreas donde la minería y la industria metalúrgica convergen.\n\nLos programas de capacitación, que comenzarán en enero de 2026, se enfocarán en áreas como procesamiento de minerales, metalurgia extractiva, soldadura especializada en equipos mineros, y mantenimiento de maquinaria pesada. Se estima que en los primeros dos años, más de 5.000 trabajadores recibirán capacitación a través de este programa.\n\n\"Este acuerdo rompe barreras históricas entre gremios y crea sinergias para el desarrollo de nuestros trabajadores\", señaló el secretario general de la UOM. \"En un mundo donde las cadenas de valor se integran cada vez más, nuestros afiliados deben tener competencias que les permitan moverse entre diferentes sectores productivos\".",
                      source: "Fuente: UOM - Comunicado Institucional, 14/09/2025",
                      date: formatDate(currentDate)
                    },
                    {
                      title: "Paritarias 2025: Incremento salarial del 18% para sector minero",
                      content: "Las paritarias 2025 para el sector minero concluyeron con un acuerdo que establece un incremento salarial del 18% para todos los trabajadores del sector, distribuido en tres tramos: 6% en septiembre de 2025, 6% en enero de 2026 y 6% en abril de 2026. El acuerdo, alcanzado entre AOMA y CAEM, también incluye una cláusula de revisión en caso de que la inflación acumulada supere el 15% en cada período.\n\nAdemás del incremento salarial, el acuerdo incluye mejoras en las asignaciones familiares, un bono anual de $150.000 por única vez en diciembre de 2025, y la actualización de los montos para viáticos y gastos de movilidad.\n\n\"Este acuerdo protege el poder adquisitivo de nuestros trabajadores en un contexto económico complejo\", afirmó el equipo negociador de AOMA. \"El incremento del 18% está por encima de la inflación proyectada para el período y las cláusulas de revisión nos permiten ajustar el acuerdo si la realidad económica cambia\".",
                      source: "Fuente: Ministerio de Trabajo - Acta Acuerdo Paritario Minero 2025",
                      date: formatDate(currentDate)
                    },
                    {
                      title: "Nuevo protocolo de seguridad laboral en minas subterráneas",
                      content: "La Secretaría de Trabajo, en conjunto con AOMA y las principales empresas mineras, lanzó un nuevo protocolo de seguridad laboral para minas subterráneas que establece estándares más rigurosos en materia de prevención de accidentes y protección de la salud de los trabajadores. El protocolo, que entrará en vigencia en enero de 2026, es el resultado de un año de trabajo conjunto entre las partes.\n\nEntre las principales novedades del protocolo se encuentra la obligatoriedad de sistemas de monitoreo en tiempo real de gases y ventilación, la implementación de tecnología de geolocalización para todos los trabajadores en labores subterráneas, y la reducción del tiempo máximo de exposición a ambientes con altas temperaturas.\n\n\"La seguridad de los trabajadores mineros es nuestra prioridad absoluta\", afirmó el secretario de Seguridad e Higiene del Trabajo. \"Este nuevo protocolo incorpora las mejores prácticas internacionales y tecnologías de última generación para prevenir accidentes y proteger la salud de quienes trabajan en las condiciones más desafiantes de la industria\".",
                      source: "Fuente: Secretaría de Trabajo - Resolución 1245/2025",
                      date: formatDate(currentDate)
                    },
                    {
                      title: "Creación del Observatorio de Derechos Laborales Mineros",
                      content: "Organizaciones sindicales, académicas y de derechos humanos anunciaron la creación del Observatorio de Derechos Laborales Mineros, una iniciativa que buscará monitorear, documentar y promover el respeto de los derechos laborales en el sector minero argentino. El observatorio, que comenzará a operar en octubre de 2025, será coordinado por la Universidad Nacional de San Juan en conjunto con AOMA y el Centro de Estudios Legales y Sociales (CELS).\n\nEntre las funciones del observatorio se encuentra la elaboración de informes periódicos sobre la situación laboral en el sector minero, la documentación de casos de violación de derechos laborales, y la propuesta de políticas públicas para mejorar las condiciones de trabajo en la industria.\n\n\"El observatorio llenará un vacío importante en la documentación sistemática de la situación laboral en el sector minero\", señaló la directora del observatorio. \"Nuestro objetivo es generar evidencia confiable que permita a los actores del sector tomar decisiones informadas para mejorar las condiciones de trabajo\".",
                      source: "Fuente: Universidad Nacional de San Juan - Comunicado de Creación, 11/09/2025",
                      date: formatDate(currentDate)
                    },
                    {
                      title: "Programa de vivienda para trabajadores mineros en zonas aisladas",
                      content: "El Ministerio de Desarrollo Territorial y Hábitat, en conjunto con AOMA y las principales empresas mineras, lanzó un programa de vivienda para trabajadores mineros en zonas aisladas que busca mejorar las condiciones de alojamiento en campamentos mineros y comunidades cercanas a los proyectos. El programa, que contará con una inversión inicial de $2.000 millones, construirá 1.500 viviendas en las provincias de San Juan, Santa Cruz, Catamarca y Salta.\n\nLas viviendas, que serán construidas con tecnología modular y materiales sustentables, contarán con servicios básicos de calidad, espacios comunes y áreas verdes. El programa también incluye la mejora de la infraestructura en los campamentos mineros existentes, con énfasis en la privacidad, ventilación y acceso a internet.\n\n\"Este programa reconoce que las condiciones de vivienda son parte fundamental de la calidad de vida de los trabajadores mineros\", afirmó la ministra de Desarrollo Territorial. \"Estamos comprometidos a garantizar que quienes trabajan en las zonas más aisladas del país tengan acceso a viviendas dignas y servicios de calidad\".",
                      source: "Fuente: Ministerio de Desarrollo Territorial y Hábitat - Programa Vivienda Minera 2025-2027",
                      date: formatDate(currentDate)
                    }
                  ].map((news, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100 overflow-hidden">
                      <div className="p-6">
                        <h3 className="font-bold text-blue-900 text-xl mb-4">{news.title}</h3>
                        <div className="prose text-gray-700 leading-relaxed whitespace-pre-line">
                          {news.content}
                        </div>
                        <div className="mt-6 pt-4 border-t border-blue-100">
                          <p className="text-blue-800 font-medium">{news.source}</p>
                          <p className="text-gray-500 text-sm mt-1">Publicado: {news.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            {/* Featured News Section with Mining Theme - Optimized Layout */}
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6">
                <h2 className="text-2xl font-bold text-white">Noticias Destacadas</h2>
                <div className="w-24 h-1 bg-red-500 mt-2"></div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Featured Provincial News - First Position (Larger) */}
                  <div 
                    className="lg:col-span-1 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg border border-blue-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => setCurrentPage('provinciales')}
                  >
                    <div className="h-80 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center relative overflow-hidden">
                      <img 
                        src="https://i.imgur.com/TlaARUw.png" 
                        alt="San Juan: Vicuña designa a Ron Hochstein como nuevo CEO de la empresa" 
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.innerHTML = `
                            <div class="w-full h-full bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center">
                              <div class="text-blue-800 font-bold text-center p-4">San Juan: Nuevo CEO de Vicuña</div>
                            </div>
                          `;
                        }}
                      />
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">PROVINCIAL</div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-blue-900 mb-3 text-xl">San Juan: Vicuña designa a Ron Hochstein como nuevo CEO</h3>
                      <p className="text-gray-600 text-sm mb-4">El nuevo Chief Executive Officer asumirá su cargo en el mes de noviembre.</p>
                      <div className="mt-3">
                        <span className="text-blue-700 text-xs font-medium flex items-center">
                          <span>Ver noticia completa</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column with 4 news items */}
                  <div className="grid grid-cols-1 gap-6">
                    {[
                      {
                        item: 2,
                        title: "Argentina lidera crecimiento en exploración minera en Latinoamérica",
                        excerpt: "Según S&P Global, Argentina es el país con mayor crecimiento en gasto de exploración minera en la región, con un incremento del 38% en 2024.",
                        page: 'nacionales'
                      },
                      {
                        item: 3,
                        title: "Nuevo convenio colectivo minero garantiza mejoras salariales",
                        excerpt: "AOMA y CAEM firmaron acuerdo que incluye incremento del 18% en salarios y mejoras en beneficios sociales para 45.000 trabajadores.",
                        page: 'sindicales'
                      },
                      {
                        item: 4,
                        title: "Inaugurada planta de litio en Catamarca con tecnología sustentable",
                        excerpt: "La nueva planta procesará 25.000 toneladas anuales de carbonato de litio con 40% menos consumo de agua que procesos tradicionales.",
                        page: 'provinciales'
                      },
                      {
                        item: 5,
                        title: "Lanzado programa nacional de capacitación minera 2025-2030",
                        excerpt: "El Ministerio de Trabajo invertirá $1.200 millones para capacitar a 50.000 trabajadores en nuevas tecnologías y prácticas sustentables.",
                        page: 'nacionales'
                      }
                    ].map((news) => (
                      <div 
                        key={news.item} 
                        className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100 overflow-hidden cursor-pointer"
                        onClick={() => setCurrentPage(news.page)}
                      >
                        <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                          <div className="relative z-10 text-blue-800 font-bold text-lg">Noticia {news.item}</div>
                          <div className="absolute bottom-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                            </svg>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-blue-900 mb-2 text-lg">{news.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{news.excerpt}</p>
                          <div className="mt-3 flex items-center text-blue-700 text-xs font-medium">
                            <span>Leer más</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Other News Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6">
                <h2 className="text-2xl font-bold text-white">Otras Noticias Mineras</h2>
                <div className="w-24 h-1 bg-red-500 mt-2"></div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {[
                    {
                      title: "Descubrimiento de nueva veta de cobre en San Juan y su impacto en la economía regional",
                      content: "Geólogos de la empresa Minera San Juan descubrieron una nueva veta de cobre en la cordillera de los Andes, con estimaciones iniciales de 200 millones de toneladas de mineral con una ley promedio de 0.8% de cobre. El hallazgo, ubicado a 45 km de la ciudad de Calingasta, podría convertirse en uno de los proyectos cupríferos más importantes de Argentina en la próxima década.\n\nLos estudios preliminares indican que el yacimiento tiene características similares a los grandes depósitos porfídicos de cobre de Chile. La empresa planea invertir $30 millones en estudios de factibilidad durante los próximos 18 meses, con la expectativa de comenzar la construcción de la mina en 2027.\n\n\"Este descubrimiento tiene el potencial de transformar la economía de San Juan\", afirmó el gobernador de la provincia. \"Estimamos que el proyecto podría generar más de 1.500 empleos directos en su fase de construcción y 600 empleos permanentes en la fase de operación, además de importantes ingresos fiscales para la provincia\".",
                      source: "Fuente: Minera San Juan - Comunicado de Descubrimiento, 14/09/2025",
                      date: formatDate(currentDate),
                      page: 'provinciales'
                    },
                    {
                      title: "Innovaciones tecnológicas en la minería de litio: El futuro de la extracción sostenible",
                      content: "Investigadores de la Universidad Nacional de Jujuy, en conjunto con empresas del sector, desarrollaron una nueva tecnología de extracción de litio que reduce en un 60% el consumo de agua y en un 40% el tiempo de producción. La tecnología, basada en membranas selectivas y procesos electroquímicos, ya fue probada con éxito en una planta piloto en el Salar de Olaroz.\n\nA diferencia de los métodos tradicionales que requieren grandes evaporadores y largos períodos de tiempo, esta nueva tecnología permite extraer litio de salmueras en cuestión de días, con una pureza superior al 99.5%. Además, el proceso es modular y puede ser escalado según las necesidades de cada proyecto.\n\n\"Esta innovación posiciona a Argentina como líder en tecnologías de extracción de litio sustentable\", afirmó el director del proyecto. \"No solo reducimos el impacto ambiental, sino que también aumentamos la competitividad de nuestros productos en el mercado global\".",
                      source: "Fuente: Universidad Nacional de Jujuy - Comunicado de Investigación, 13/09/2025",
                      date: formatDate(currentDate),
                      page: 'nacionales'
                    },
                    {
                      title: "Análisis del mercado internacional de minerales y su efecto en las exportaciones argentinas",
                      content: "Según un análisis del Banco Central de la República Argentina, la demanda internacional de minerales críticos como el litio, el cobre y el níquel continuará creciendo a tasas superiores al 8% anual hasta 2030, impulsada por la transición energética global. Este crecimiento representa una oportunidad significativa para las exportaciones mineras argentinas, que podrían triplicar su valor en la próxima década.\n\nEl informe destaca que Argentina está bien posicionada para aprovechar esta tendencia, gracias a sus vastos recursos de litio en el noroeste y cobre en San Juan. Sin embargo, señala la necesidad de invertir en infraestructura de transporte y energía para reducir los costos logísticos y mejorar la competitividad.\n\n\"El mercado internacional está enviando señales claras de crecimiento sostenido en la demanda de minerales críticos\", afirmó el economista jefe del BCRA. \"Argentina tiene la oportunidad de convertirse en un actor relevante en estas cadenas de valor, pero necesita políticas públicas que faciliten la inversión y el desarrollo de infraestructura\".",
                      source: "Fuente: Banco Central de la República Argentina - Informe Sectorial, Septiembre 2025",
                      date: formatDate(currentDate),
                      page: 'nacionales'
                    }
                  ].map((news, index) => (
                    <div 
                      key={index} 
                      className="border-l-4 border-blue-600 pl-6 py-4 hover:bg-blue-50 transition-all duration-300 group cursor-pointer"
                      onClick={() => setCurrentPage(news.page)}
                    >
                      <h3 className="font-medium text-blue-900 group-hover:text-blue-700 transition-colors text-lg">
                        {news.title}
                      </h3>
                      <div className="mt-3 text-gray-700 leading-relaxed line-clamp-3">
                        {news.content.split('\n')[0]}...
                      </div>
                      <div className="mt-4 flex items-center text-blue-600 text-xs">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Minería</span>
                        <span className="ml-3">Leer más completo →</span>
                      </div>
                      <div className="mt-2 text-blue-800 text-xs">{news.source}</div>
                      <div className="text-gray-500 text-xs">Publicado: {news.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header with Mining Theme */}
      <header className="bg-white border-b-4 border-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center border-4 border-red-500 shadow-lg">
                    <img 
                      src="https://i.imgur.com/Ltz9mN8.png" 
                      alt="UG Noticias Mineras Logo" 
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = `
                          <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                            </svg>
                          </div>
                        `;
                      }}
                    />
                  </div>
                </a>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
                </div>
              </div>
              <div>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} className="block">
                  <h1 className="text-3xl font-bold text-blue-900 tracking-tight hover:text-blue-700 transition-colors">UG Noticias Mineras</h1>
                </a>
                <p className="text-blue-700 text-sm font-medium">Información del sector minero argentino</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-900">{formatDate(currentDate)}</div>
              <div className="text-blue-600 text-sm">Día Internacional de la Minería Sostenible</div>
            </div>
          </div>
          
          {/* Modern Navigation */}
          <nav className="border-t border-blue-100 py-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-6">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}
                className={`px-6 py-3 ${currentPage === 'home' ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'} text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg`}
              >
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>Inicio</span>
                </div>
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setCurrentPage('nacionales'); }}
                className={`px-6 py-3 ${currentPage === 'nacionales' ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'} text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg`}
              >
                Nacionales
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setCurrentPage('provinciales'); }}
                className={`px-6 py-3 ${currentPage === 'provinciales' ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'} text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg`}
              >
                Provinciales
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setCurrentPage('sindicales'); }}
                className={`px-6 py-3 ${currentPage === 'sindicales' ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'} text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg`}
              >
                Sindicales
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Content Area (4/5) */}
          <div className="lg:col-span-4">
            {renderPageContent()}
          </div>

          {/* Collaborators Sidebar (1/5) - Only on Desktop */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 text-center">
                <h3 className="text-xl font-bold text-white">NUESTROS COLABORADORES</h3>
                <div className="w-16 h-1 bg-red-500 mx-auto mt-2"></div>
              </div>
              <div className="p-4 space-y-4">
                {[1, 2, 3, 4, 5].map((sponsor, index) => {
                  const images = [
                    "https://i.imgur.com/pHDEpRm.png",
                    "https://i.imgur.com/w7ZM1hz.png", 
                    "https://i.imgur.com/p2aeKRE.png",
                    "https://i.imgur.com/8y0Wuu9.png",
                    "https://i.imgur.com/bCEWH1U.png"
                  ];
                  
                  return (
                    <div key={sponsor}>
                      {index < 5 ? (
                        <img 
                          src={images[index]} 
                          alt={`Colaborador ${sponsor}`} 
                          className="w-full h-20 object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = `
                              <div class="w-full h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                                <div class="text-blue-700 font-semibold text-sm">Colaborador ${sponsor}</div>
                              </div>
                            `;
                          }}
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Mining Stats Widget */}
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden mt-6">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 text-center">
                <h3 className="text-xl font-bold text-white">Datos Mineros</h3>
                <div className="w-16 h-1 bg-red-500 mx-auto mt-2"></div>
              </div>
              <div className="p-4 space-y-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-blue-900 font-semibold">Producción Mensual</div>
                  <div className="text-2xl font-bold text-blue-700">+12.5%</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-blue-900 font-semibold">Inversión Extranjera</div>
                  <div className="text-2xl font-bold text-blue-700">US$ 2.3B</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-blue-900 font-semibold">Empleos Generados</div>
                  <div className="text-2xl font-bold text-blue-700">45,892</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-blue-900 font-semibold">Proyectos Activos</div>
                  <div className="text-2xl font-bold text-blue-700">87</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {['suryajp', 'monggojp', 'senang303', 'sukses303', 'horus303', 'sboku99', 'spesial4d', 'joinbet99'].map((link, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-center py-3 rounded-xl font-medium text-sm hover:from-blue-200 hover:to-blue-300 transition-all duration-300 transform hover:scale-105">
              {link}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white mt-16 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            {/* Logo in bottom left */}
            <div className="mb-6 lg:mb-0">
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center border-2 border-red-500">
                  <img 
                    src="https://i.imgur.com/Ltz9mN8.png" 
                    alt="UG Noticias Mineras Logo" 
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = `
                        <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                          </svg>
                        </div>
                      `;
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">UG Noticias Mineras</h3>
                  <p className="text-blue-300 text-sm">© 2025 Todos los derechos reservados</p>
                </div>
              </a>
            </div>
            
            {/* Empty space on right for balance */}
            <div className="w-16"></div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-blue-700 text-center">
            <p className="text-blue-300 text-sm">Comprometidos con la información veraz y el desarrollo sostenible de la minería argentina</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);