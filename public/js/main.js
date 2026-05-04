// Common JS utility

const API_BASE = '/api';

function getToken() {
    return localStorage.getItem('token');
}

function checkAuth() {
    const token = getToken();
    if (!token && window.location.pathname !== '/') {
        window.location.href = '/';
    }
    if (token && window.location.pathname === '/') {
        window.location.href = '/dashboard';
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
}

async function fetchAPI(endpoint, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
    });

    if (response.status === 401 || response.status === 403) {
        logout();
        throw new Error('Unauthorized');
    }

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error || 'API Error');
    }

    return data;
}

// Check auth on load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

function getBadgeClass(status) {
    if (!status) return '';
    const s = status.toLowerCase();
    if (s === 'available' || s === 'approved' || s === 'completed' || s === 'negative') return 'badge available';
    if (s === 'used') return 'badge used';
    if (s === 'testing' || s === 'pending') return 'badge testing';
    if (s === 'unsafe' || s === 'expired' || s === 'positive') return 'badge unsafe';
    return 'badge';
}
