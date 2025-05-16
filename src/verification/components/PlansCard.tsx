import { Plans } from "../../types"
import '../../styles/Pricing.css'

export const PlansCard = ({ plans }: Plans) => {
  return (
    <div className="plans__card">
      <h2>Choose Your Plan</h2>
      <div className="plans__list">
        {plans.map((plan) => (
          <div key={plan.name} className="plan-card">
            <h3>{plan.name}</h3>
            <p>${plan.price}/month</p>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button className="btn-select">Select</button>
          </div>
        ))}
      </div>
    </div>
  )
}