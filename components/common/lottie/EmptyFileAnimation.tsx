import Lottie from 'react-lottie'
import animationData from '../../../lottie/empty-file.json'

const options = {
  loop: true,
  animationData,
  autoplay: true,
}

export function EmptyFileAnimation() {
  return <Lottie options={options} height={400} width={400} />
}
