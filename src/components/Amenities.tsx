const amenities = [
  {
    category: 'Espaces extérieurs',
    icon: '☀️',
    items: ['Piscine à débordement 15×5 m', 'Pool house avec bar', 'Terrasse panoramique 200 m²', 'Jardin méditerranéen 3 000 m²', 'Espace barbecue & cuisine d\'été', 'Parking privé 6 véhicules'],
  },
  {
    category: 'Suites & chambres',
    icon: '🛏',
    items: ['6 suites avec salle de bain privée', 'Suite master avec baignoire vue mer', 'Draps & serviettes de luxe', 'Climatisation individuelle', 'Wi-Fi haut débit partout', 'Coffre-fort & blackout'],
  },
  {
    category: 'Espaces de vie',
    icon: '🏛',
    items: ['Grand salon 80 m² avec cheminée', 'Salle à manger 20 couverts', 'Cuisine professionnelle Miele', 'Cave à vins climatisée', 'Salle de cinéma 10 places', 'Bureau & espace de travail'],
  },
  {
    category: 'Bien-être & loisirs',
    icon: '🧘',
    items: ['Spa avec hammam & jacuzzi', 'Salle de sport équipée', 'Vélos disponibles', 'Bibliothèque & jeux de société', 'Kayaks & matériel de snorkeling', 'Conciergerie 24h/24'],
  },
]

export default function Amenities() {
  return (
    <section id="equipements" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-subtitle">Le confort absolu</p>
          <h2 className="section-title">Équipements & services</h2>
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

        {/* Services */}
        <div className="mt-12 bg-navy text-white p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-2xl mb-4 text-gold-light">Services inclus</h3>
              <ul className="space-y-2 font-sans text-sm text-white/80">
                <li>✓ Conciergerie personnelle</li>
                <li>✓ Ménage quotidien</li>
                <li>✓ Draps & serviettes changés chaque jour</li>
                <li>✓ Accueil à l&apos;aéroport (option)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-4 text-gold-light">Services à la carte</h3>
              <ul className="space-y-2 font-sans text-sm text-white/80">
                <li>+ Chef privé & petit-déjeuner</li>
                <li>+ Location de bateau / yacht</li>
                <li>+ Excursions guidées en Sicile</li>
                <li>+ Transferts privés</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-4 text-gold-light">À proximité</h3>
              <ul className="space-y-2 font-sans text-sm text-white/80">
                <li>🏖 Plage privée — 5 min à pied</li>
                <li>🍋 Taormine — 20 min en voiture</li>
                <li>🌋 Etna — 1h en voiture</li>
                <li>✈️ Aéroport Catane — 1h30</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
