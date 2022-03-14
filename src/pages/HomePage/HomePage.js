import { Carousel } from './Carousel';
import { Arrival } from './Arrival';
import { Trend } from './Trend';
import { Feed } from '../../components/Feed';

export default function HomePage() {
    return (
        <main>
            <Carousel />
            <Arrival />
            <Trend />
            {process.env.NODE_ENV === 'production' && <Feed />}
        </main>
    );
}
