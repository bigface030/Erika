import { Carousel } from './Carousel'
import { Arrival } from './Arrival'
import { Feed } from '../../components/Feed'
import { Trend } from './Trend'

export default function HomePage() {
  return (
    <main>
      <Carousel />
      <Arrival />
      <Trend />
      {process.env.NODE_ENV === 'production' && (
        <Feed />
      )}
    </main>
  );
}