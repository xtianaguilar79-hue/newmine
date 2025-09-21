import React, { useState, useEffect } from 'react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentNewsId, setCurrentNewsId] = useState(null);
  const [newsData, setNewsData] = useState({
    nacionales: [],
    sanjuan: [],
    sindicales: [],
    opinion: []
  });
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const loadNewsFromWordPress = async () => {
      try {
        setLoading(true);

        const postsResponse = await fetch('https://xtianaguilar79-hbsty.wordpress.com/wp-json/wp/v2/posts?per_page=100&_embed');
        const posts = await postsResponse.json();

        const transformed = {
          nacionales: [],
          sanjuan: [],
          sindicales: [],
          opinion: []
        };

        for (const post of posts) {
          let imageUrl = '';
          if (post._embedded && post._embedded['wp:featuredmedia']) {
            imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
          }

          let section = 'nacionales';

          if (post.tags && post.tags.length > 0) {
            try {
              const tagResponse = await fetch(`https://xtianaguilar79-hbsty.wordpress.com/wp-json/wp/v2/tags/${post.tags[0]}`);
              const tag = await tagResponse.json();
              const tagSlug = tag.slug;

              if (tagSlug === 'sanjuan') section = 'sanjuan';
              if (tagSlug === 'sindicales') section = 'sindicales';
              if (tagSlug === 'opinion') section = 'opinion';
            } catch (err) {
              console.warn("No se pudo obtener etiqueta, usando default");
            }
          }

          const temp = document.createElement('div');
          temp.innerHTML = post.excerpt.rendered;
          const cleanExcerpt = temp.textContent || temp.innerText || '';

          const postDate = new Date(post.date);
          const options = { day: 'numeric', month: 'long', year: 'numeric' };
          const formattedDate = postDate.toLocaleDateString('es-ES', options);

          transformed[section].push({
            id: post.id.toString(),
            title: post.title.rendered.replace(/<\/?[^>]+(>|$)/g, ""),
            subtitle: cleanExcerpt.substring(0, 150) + (cleanExcerpt.length > 150 ? "..." : ""),
            image: imageUrl,
            additionalImages: [imageUrl],
            category: section === 'nacionales' ? 'NACIONAL' :
                     section === 'sanjuan' ? 'SAN JUAN' :
                     section === 'sindicales' ? 'SINDICAL' : 'OPINIÓN',
            categoryColor: section === 'nacionales' ? 'bg-blue-600' :
                          section === 'sanjuan' ? 'bg-red-500' :
                          section === 'sindicales' ? 'bg-yellow-500' : 'bg-purple-500',
            content: post.content.rendered,
            source: "Fuente: WordPress",
            date: formattedDate,
            related: []
          });
        }

        setNewsData(transformed);
      } catch (error) {
        console.error("❌ Error al cargar noticias:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNewsFromWordPress();

    const dateInterval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(dateInterval);
  }, []);

  const formatDate = (date) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName} ${day} de ${month} de ${year}`;
  };

  const getNewsById = (id) => {
    for (const section in newsData) {
      const news = newsData[section].find(item => item.id === id);
      if (news) return news;
    }
    return null;
  };

  const getRelatedNews = (relatedIds) => {
    const relatedNews = [];
    for (const section in newsData) {
      for (const news of newsData[section]) {
        if (relatedIds.includes(news.id)) {
          relatedNews.push(news);
        }
      }
    }
    return relatedNews;
  };

  const navigateToNews = (section, newsId = null) => {
    setCurrentPage(section);
    setCurrentNewsId(newsId);
    window.scrollTo(0, 0);
  };

  const renderNewsArticle = (news) => {
    if (!news) return null;

    const relatedNews = getRelatedNews(news.related || []);

    return (
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6">
            <h2 className="text-2xl font-bold text-white">
              {news.category === 'NACIONAL' ? 'Noticias Nacionales' : 
               news.category === 'SAN JUAN' ? 'Noticias de San Juan' : 
               news.category === 'SINDICAL' ? 'Noticias Sindicales' : 'Columnas de Opinión'}
            </h2>
            <div className="w-24 h-1 bg-red-500 mt-2"></div>
          </div>
          <div className="p-6">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg border border-blue-200 overflow-hidden">
              {news.image && (
                <div className="h-80 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center">
                          <div class="text-blue-800 font-bold text-center p-4">${news.title}</div>
                        </div>
                      `;
                    }}
                  />
                  <div className={`absolute top-4 left-4 ${news.categoryColor} text-white px-3 py-1 rounded-full font-semibold text-sm`}>{news.category}</div>
                </div>
              )}
              <div className="p-6">
                <h3 className="font-bold text-2xl text-blue-900 mb-3">{news.title}</h3>
                {news.subtitle && <p className="text-blue-700 font-medium mb-4">{news.subtitle}</p>}
                
                {news.additionalImages && news.additionalImages.length > 1 && (
                  <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {news.additionalImages.slice(1).map((img, index) => (
                      <div key={index} className="rounded-lg overflow-hidden shadow-md">
                        <img 
                          src={img} 
                          alt={`Imagen adicional ${index + 1}`} 
                          className="w-full h-48 object-cover object-center hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = `
                              <div class="w-full h-48 bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center">
                                <div class="text-blue-800 font-bold text-center p-4">Imagen ${index + 1}</div>
                              </div>
                            `;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="prose text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: news.content }} />
                
                <div className="mt-6 pt-4 border-t border-blue-100">
                  <p className="text-blue-800 font-medium">{news.source}</p>
                  <p className="text-gray-500 text-sm mt-1">Publicado: {news.date}</p>
                </div>
              </div>
            </div>

            {relatedNews.length > 0 && (
              <div className="mt-8">
                <h4 className="text-xl font-bold text-blue-900 mb-4">Noticias Relacionadas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedNews.map((related) => (
                    <div 
                      key={related.id}
                      className="border-l-4 border-blue-600 pl-4 py-3 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
                      onClick={() => navigateToNews(
                        related.id.includes('sanjuan') ? 'sanjuan' :
                        related.id.includes('sindical') ? 'sindicales' :
                        related.id.includes('opinion') ? 'opinion' : 'nacionales',
                        related.id
                      )}
                    >
                      <h5 className="font-medium text-blue-900">{related.title}</h5>
                      <p className="text-gray-600 text-sm mt-1">{related.subtitle}</p>
                      <p className="text-gray-500 text-xs mt-2">{related.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderNewsList = (section) => {
    const newsList = newsData[section];
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6">
            <h2 className="text-2xl font-bold text-white">
              {section === 'nacionales' ? 'Noticias Nacionales' : 
               section === 'sanjuan' ? 'Noticias de San Juan' : 
               section === 'sindicales' ? 'Noticias Sindicales' : 'Columnas de Opinión'}
            </h2>
            <div className="w-24 h-1 bg-red-500 mt-2"></div>
          </div>
          <div className="p-6">
            <div className="space-y-8">
              {newsList.map((news, index) => (
                <div 
                  key={news.id} 
                  className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100 overflow-hidden cursor-pointer"
                  onClick={() => navigateToNews(section, news.id)}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className={`${news.categoryColor} text-white px-2 py-1 rounded text-xs font-semibold mr-3`}>{news.category}</span>
                      <h3 className="font-bold text-blue-900 text-xl">{news.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{news.subtitle}</p>
                    <div className="mt-6 pt-4 border-t border-blue-100 flex justify-between items-center">
                      <p className="text-blue-800 font-medium">{news.source}</p>
                      <p className="text-gray-500 text-sm">{news.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPageContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-blue-900 text-xl font-semibold">Cargando noticias desde WordPress...</div>
        </div>
      );
    }

    switch(currentPage) {
      case 'nacionales':
      case 'sanjuan':
      case 'sindicales':
      case 'opinion':
        if (currentNewsId) {
          const news = getNewsById(currentNewsId);
          return renderNewsArticle(news);
        }
        return renderNewsList(currentPage);
      default:
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6">
                <h2 className="text-2xl font-bold text-white">Noticias Destacadas</h2>
                <div className="w-24 h-1 bg-red-500 mt-2"></div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {newsData.nacionales.slice(0,1).map(news => (
                    <div 
                      key={news.id}
                      className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg border border-blue-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                      onClick={() => navigateToNews('nacionales', news.id)}
                    >
                      <div className="h-80 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center relative overflow-hidden">
                        <img 
                          src={news.image} 
                          alt={news.title} 
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = `
                              <div class="w-full h-full bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center">
                                <div class="text-blue-800 font-bold text-center p-4">${news.title}</div>
                              </div>
                            `;
                          }}
                        />
                        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full font-semibold text-sm">NACIONAL</div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-blue-900 mb-3 text-xl">{news.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{news.subtitle}</p>
                        <div className="mt-4">
                          <span className="text-blue-700 text-sm font-medium flex items-center">
                            <span>Ver noticia completa</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {newsData.sanjuan.slice(0,1).map(news => (
                    <div 
                      key={news.id}
                      className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg border border-blue-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                      onClick={() => navigateToNews('sanjuan', news.id)}
                    >
                      <div className="h-80 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center relative overflow-hidden">
                        <img 
                          src={news.image} 
                          alt={news.title} 
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = `
                              <div class="w-full h-full bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center">
                                <div class="text-blue-800 font-bold text-center p-4">${news.title}</div>
                              </div>
                            `;
                          }}
                        />
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-semibold text-sm">SAN JUAN</div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-blue-900 mb-3 text-xl">{news.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{news.subtitle}</p>
                        <div className="mt-4">
                          <span className="text-blue-700 text-sm font-medium flex items-center">
                            <span>Ver noticia completa</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                      </div>
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
      <header className="bg-white border-b-4 border-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <a href="#" onClick={(e) => { e.preventDefault(); navigateToNews('home'); }}>
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center border-4 border-red-500 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                </a>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
                </div>
              </div>
              <div>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateToNews('home'); }} className="block">
                  <h1 className="text-3xl font-bold text-blue-900 tracking-tight hover:text-blue-700 transition-colors">UG Noticias Mineras</h1>
                </a>
                <p className="text-blue-700 text-sm font-medium">Información del sector minero argentino</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-900">{formatDate(currentDate)}</div>
            </div>
          </div>

          <div className="py-4 bg-blue-50 border-t border-blue-100">
            <div className="flex justify-center items-center space-x-8">
              <div className="h-12 bg-gray-200 rounded flex items-center justify-center px-4">Logo 1</div>
              <div className="h-12 bg-gray-200 rounded flex items-center justify-center px-4">Logo 2</div>
              <div className="h-12 bg-gray-200 rounded flex items-center justify-center px-4">Logo 3</div>
            </div>
          </div>

          <nav className="border-t border-blue-100 py-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-6">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); navigateToNews('home'); }}
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
                onClick={(e) => { e.preventDefault(); navigateToNews('nacionales'); }}
                className={`px-6 py-3 ${currentPage === 'nacionales' ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'} text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg`}
              >
                Nacionales
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); navigateToNews('sanjuan'); }}
                className={`px-6 py-3 ${currentPage === 'sanjuan' ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'} text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg`}
              >
                San Juan
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); navigateToNews('sindicales'); }}
                className={`px-6 py-3 ${currentPage === 'sindicales' ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'} text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg`}
              >
                Sindicales
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); navigateToNews('opinion'); }}
                className={`px-6 py-3 ${currentPage === 'opinion' ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'} text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg`}
              >
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>Opinión</span>
                </div>
              </a>
            </div>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-4">
            {renderPageContent()}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden mb-6 cursor-pointer"
              onClick={() => navigateToNews('opinion')}
            >
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 text-center">
                <h3 className="text-xl font-bold text-white">SIN PELOS EN LA LENGUA</h3>
                <div className="w-16 h-1 bg-red-500 mx-auto mt-2"></div>
              </div>
              <div className="p-4 h-32 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                <p className="text-red-800 font-semibold text-center">Columna de opinión semanal con análisis profundo del sector minero argentino.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="p-4 space-y-4">
                <div className="w-full h-20 bg-gray-200 rounded-lg flex items-center justify-center">Banner 1</div>
                <div className="w-full h-20 bg-gray-200 rounded-lg flex items-center justify-center">Banner 2</div>
                <div className="w-full h-20 bg-gray-200 rounded-lg flex items-center justify-center">Banner 3</div>
              </div>
            </div>

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
      </div>

      <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white mt-16 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-6 lg:mb-0">
              <a href="#" onClick={(e) => { e.preventDefault(); navigateToNews('home'); }} className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center border-2 border-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">UG Noticias Mineras</h3>
                  <p className="text-blue-300 text-sm">© 2025 Todos los derechos reservados</p>
                </div>
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.014-3.668.07-4.849.196-4.358 2.618-6.78 6.98-6.98C8.333.014 8.741 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.488.5.09.682-.216.682-.48 0-.236-.008-.864-.013-1.7-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.891 1.524 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.252-4.555-1.107-4.555-4.93 0-1.087.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.578 9.578 0 0112 6.835c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.639.696 1.029 1.588 1.029 2.675 0 3.833-2.337 4.675-4.566 4.921.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-700 text-center">
            <p className="text-blue-300 text-sm">Comprometidos con la información veraz y el desarrollo sostenible de la minería argentina</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;