import { Router } from './router';
import YaMetrika from './utils/YaMetrika';

export default function App() {
    return (
        <main className="app">
            <YaMetrika />
            <Router />
        </main>
    );
}
