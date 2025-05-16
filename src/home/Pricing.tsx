import { PLANS } from "../utils/constant"
import { PlansCard } from "../verification/components/PlansCard"

export const Pricing = () => {
  return (
    <div className="pricing">
      <h1>Pricing Plans</h1>
      <PlansCard plans={PLANS} />
    </div>
  )
}