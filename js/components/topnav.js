// ============================================================
// EcoNexa — Top Navigation Bar Component
// ============================================================

function buildTopNav(user) {
  const roleColors = { citizen: 'green', worker: 'teal', admin: 'blue', authority: 'purple' };
  const roleColor = roleColors[user.role] || 'green';
  const roleLabel = EcoAuth.getRoleLabel(user.role);

  const notifCounts = { citizen: EcoData.notifications.citizen, worker: EcoData.notifications.worker, admin: EcoData.notifications.admin };
  const unreadCount = (notifCounts[user.role] || []).filter(n => !n.read).length;

  return `
    <header class="topnav" id="app-topnav">
      <div class="topnav__left">
        <button class="topnav__icon-btn topnav__mobile-menu" onclick="openMobileSidebar()" aria-label="Open menu">
          ${EcoUtils.icon('menu', 20)}
        </button>

        <div class="topnav__breadcrumb">
          <span class="topnav__breadcrumb-item">EcoNexa</span>
          <span class="topnav__breadcrumb-sep">/</span>
          <span class="topnav__breadcrumb-item topnav__breadcrumb-item--current" id="topnav-breadcrumb">Dashboard</span>
        </div>
      </div>

      <div class="topnav__right">
        <!-- Dark Mode Toggle Button -->
        <button class="topnav__icon-btn theme-toggle-btn" id="theme-toggle-btn" onclick="toggleTheme()" aria-label="Toggle Dark Mode" title="Toggle Light / Dark Mode">
          <span id="theme-icon">🌙</span>
        </button>

        <span class="badge badge-${roleColor} text-xs">${roleLabel}</span>

        <span class="pulse-dot text-xs text-muted">Live</span>

        <button class="topnav__icon-btn" onclick="EcoRouter.navigate('#${user.role}-notifications')" aria-label="Notifications" title="Notifications">
          ${EcoUtils.icon('bell', 20)}
          ${unreadCount > 0 ? `<span class="topnav__notif-badge" id="notif-badge"></span>` : ''}
        </button>

        <div class="avatar avatar--sm avatar--${roleColor}" title="${user.name} — Click sidebar user to logout">
          ${user.avatar || user.name.charAt(0)}
        </div>
      </div>
    </header>`;
}

// Theme handling
function initTheme() {
  const savedTheme = localStorage.getItem('econexa_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('econexa_theme', newTheme);
  updateThemeIcon(newTheme);
  EcoUtils.toast(newTheme === 'dark' ? 'Dark mode enabled 🌙' : 'Light mode enabled ☀️', 'info', 1800);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Auto init theme
initTheme();

// Shared notification view (works for all roles)
function renderNotifications(container) {
  const user = EcoAuth.getCurrentUser();
  const notifMap = { citizen: EcoData.notifications.citizen, worker: EcoData.notifications.worker, admin: EcoData.notifications.admin, authority: EcoData.notifications.admin };
  const notifications = notifMap[user.role] || [];

  // Mark all as read
  notifications.forEach(n => n.read = true);
  document.getElementById('notif-badge')?.remove();

  const colorMap = { green: '#22c55e', teal: '#14b8a6', blue: '#3b82f6', amber: '#f59e0b', red: '#ef4444' };

  container.innerHTML = `
    <div class="page-content view-enter">
      <div class="page-title flex items-center justify-between mb-6">
        <div>
          <h1>Notifications</h1>
          <p>${notifications.length} notifications</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="EcoUtils.toast('All notifications marked as read', 'success')">
          ${EcoUtils.icon('check_circle', 16)} Mark all read
        </button>
      </div>

      <div class="card" style="max-width:720px">
        ${notifications.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state__icon">${EcoUtils.icon('bell', 32)}</div>
            <h3 class="empty-state__title">No notifications</h3>
            <p class="empty-state__body">You're all caught up!</p>
          </div>
        ` : notifications.map(n => `
          <div class="notification-item ${n.read ? '' : 'notification-item--unread'}">
            <div class="notification-item__icon" style="background:${colorMap[n.color] || '#22c55e'}22; color:${colorMap[n.color] || '#22c55e'}">
              <span style="font-size:1.1rem">${n.icon}</span>
            </div>
            <div class="notification-item__content">
              <div class="notification-item__title">${n.title}</div>
              <div class="notification-item__body">${n.body}</div>
            </div>
            <div class="notification-item__time">${n.time}</div>
          </div>
        `).join('')}
      </div>
    </div>`;
}

window.buildTopNav = buildTopNav;
window.renderNotifications = renderNotifications;
