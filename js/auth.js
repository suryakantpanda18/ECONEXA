// ============================================================
// EcoNexa — Auth Module
// Role-based authentication with localStorage persistence
// ============================================================

const EcoAuth = {
  STORAGE_KEY: 'econexa_session',

  getCurrentUser() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  },

  login(email, password) {
    const user = EcoData.users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, error: 'Invalid email or password.' };
    const session = { ...user };
    delete session.password;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
    return { success: true, user: session };
  },

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    window.location.href = 'index.html';
  },

  requireAuth() {
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = 'login.html';
      return null;
    }
    return user;
  },

  requireRole(role) {
    const user = this.requireAuth();
    if (!user) return null;
    if (Array.isArray(role)) {
      if (!role.includes(user.role)) {
        window.location.href = 'app.html';
        return null;
      }
    } else {
      if (user.role !== role) {
        window.location.href = 'app.html';
        return null;
      }
    }
    return user;
  },

  getDashboardForRole(role) {
    const map = { citizen: '#citizen-dashboard', worker: '#worker-dashboard', admin: '#admin-dashboard', authority: '#authority-dashboard' };
    return map[role] || '#citizen-dashboard';
  },

  getRoleLabel(role) {
    const map = { citizen: 'Citizen', worker: 'Municipal Worker', admin: 'Municipality Admin', authority: 'State Authority' };
    return map[role] || role;
  },

  getRoleColor(role) {
    const map = { citizen: 'green', worker: 'teal', admin: 'blue', authority: 'purple' };
    return map[role] || 'green';
  }
};

window.EcoAuth = EcoAuth;
