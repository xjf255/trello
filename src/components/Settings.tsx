import { useUserActions } from "../hooks/useUserActions"
import { PLANS } from "../utils/constant"
import { toast } from "sonner"
import "../styles/Settings.css"

export default function Settings() {
  const { user } = useUserActions()

  const handleUpgrade = (planName: string) => {
    toast.success(`¡Suscripción al plan ${planName} activada con éxito!`)
  }

  if (!user) {
    return <section className="settings-page">Cargando perfil...</section>
  }

  return (
    <section className="settings-page">
      <div className="settings-container">
        <header className="settings-header">
          <h4>Configuración y Ajustes</h4>
        </header>

        <div className="settings-grid">
          {/* Tarjeta de Perfil */}
          <div className="settings-card profile-card">
            <h5>Detalles de la Cuenta</h5>
            <div className="profile-details">
              <figure className="avatar-container">
                <img
                  src={user.avatar || "https://res.cloudinary.com/dkshw9hik/image/upload/v1736294033/avatardefault_w9hsxz.webp"}
                  alt={user.user}
                  className="profile-avatar"
                />
              </figure>
              <div className="profile-fields">
                <div className="field-group">
                  <label>Nombre de usuario</label>
                  <input type="text" readOnly value={user.user} />
                </div>
                <div className="field-group">
                  <label>Correo Electrónico</label>
                  <input type="email" readOnly value={user.email} />
                </div>
                <div className="field-group">
                  <label>Número de Teléfono</label>
                  <input type="text" readOnly value={user.phone || "No especificado"} />
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta de Planes de Suscripción */}
          <div className="settings-card subscription-card">
            <h5>Planes de Suscripción</h5>
            <p className="sub-desc">Mejora tu plan para desbloquear funciones de colaboración y almacenamiento ilimitado.</p>
            <div className="plans-list">
              {PLANS.map((plan) => (
                <div key={plan.name} className="plan-item">
                  <div className="plan-info">
                    <h6>{plan.name}</h6>
                    <span className="price">${plan.price}/mes</span>
                    <ul className="features">
                      {plan.features.map((feature, i) => (
                        <li key={i}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => handleUpgrade(plan.name)}
                    className={`upgrade-btn ${plan.price === 0 ? "disabled" : ""}`}
                    disabled={plan.price === 0}
                  >
                    {plan.price === 0 ? "Plan Actual" : "Obtener plan"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
