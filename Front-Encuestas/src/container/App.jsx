import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Auth from '../pages/Auth';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;