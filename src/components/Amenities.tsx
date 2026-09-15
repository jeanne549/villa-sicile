const amenities = [
  {
    category: 'Piscine & extérieur',
    icon: '🏊',
    items: ['Piscine privée avec plongeoir', 'Gazebo & bains de soleil', 'Transats & parasols', 'Terrasse autour de la piscine', 'Espace barbecue', 'Parking privé'],
  },
  {
    category: '4 suites parentales',
    icon: '🛏',
    items: ['Suite Olivier — vue jardins', 'Suite Citronnier — vue piscine', 'Suite Amandier — vue collines', 'Suite Rooftop — vue 360°', 'Salle de bain privée dans chaque suite', 'Terrasse privative dans chaque suite'],
  },
  {
    category: 'Espaces de vie',
    icon: '🏛',
    items: ['Grande cuisine équipée', 'Véranda vue piscine (cuisine)', '2 vérandas couvertes', 'Four à bois authentique', 'Salon & salle à manger', 'WiFi & climatisation partout'],
  },
  {
    category: 'Rooftop & jardins',
    icon: '☀️',
    items: ['Rooftop panoramique 360°', 'Canapés & salon extérieur', 'Vue sur les collines de Noto', 'Jardins méditerranéens', 'Oliviers & amandiers centenaires', 'Pergola fleurie'],
  },
]

export default function Amenities() {
  return (
    <section id="equipements" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-subtitle">Le confort absolu</p>
          <h2 className="section-title">Équipements & espaces</h2>
          <div className="gold-divider" />
          <p className="font-sans text-muted text-base max-w-xl mx-auto">
            Tout a été pensé pour que votre séjour soit parfait, du premier au dernier instant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {amenities.map((group) => (
            <div key={group.category} className="bg-white p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{group.icon}</span>
                <h3 className="font-serif text-xl text-charcoal">{group.category}</h3>
              </div>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-sm text-muted">
                    <span className="text-gold mt-0.5 flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-navy text-white p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-2xl mb-4 text-gold-light">La villa inclut</h3>
              <ul className="space-y-2 font-sans text-sm text-white/80">
                <li>✓ Linge de maison fourni</li>
                <li>✓ WiFi haut débit</li>
                <li>✓ Climatisation</li>
                <li>✓ Four à bois</li>
                <li>✓ Parking privé</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-4 text-gold-light">Les 4 suites</h3>
              <ul className="space-y-2 font-sans text-sm text-white/80">
                <li>🌿 Suite Olivier — vue jardins</li>
                <li>🍋 Suite Citronnier — vue piscine</li>
                <li>🌸 Suite Amandier — vue collines</li>
                <li>⭐ Suite Rooftop — vue 360°</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-4 text-gold-light">À proximité</h3>
              <ul className="space-y-2 font-sans text-sm text-white/80">
                <li>🏛 Noto baroque UNESCO — 5 km</li>
                <li>🏖 Plages de Vendicari — 5 km</li>
                <li>🏙 Syracuse / Ortygie — 30 km</li>
                <li>🏰 Ragusa Ibla UNESCO — 45 km</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
