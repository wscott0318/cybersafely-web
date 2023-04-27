import Lottie from 'react-lottie'
import animationData from '../../../lottie/completed.json'

const options = {
  loop: true,
  animationData,
  autoplay: true,
}

export function CompletedAnimation() {
  return <Lottie options={options} height={250} width={250} />
}
