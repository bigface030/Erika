import { Carousel } from './Carousel'
import { Arrival } from './Arrival'
import { Feed } from './Feed'
import { Trend } from './Trend'

export default function HomePage() {
  return (
    <div>
      <Carousel />
      <Arrival />
      <Trend />
      <Feed />
    </div>
  );
}