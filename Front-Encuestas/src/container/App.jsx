import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import VerificationCode from '../pages/VerificationCode';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/verification" element={<VerificationCode />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;