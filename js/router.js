// ============================================================
// EcoNexa — Router
// Hash-based client-side routing
// ============================================================

const EcoRouter = {
  routes: {},
  currentRoute: null,
  container: null,

  init(container) {
    this.container = container;
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  register(hash, handler) {
    this.routes[hash] = handler;
  },

  navigate(hash) {
    window.location.hash = hash;
  },

  handleRoute() {
    const hash = window.location.hash || '#';
    const user = EcoAuth.getCurrentUser();

    // Find matching route
    let handler = this.routes[hash];

    // Default routes by role
    if (!handler && user) {
      const defaults = {
        citizen:   '#citizen-dashboard',
        worker:    '#worker-dashboard',
        admin:     '#admin-dashboard',
        authority: '#authority-dashboard'
      };
      const defaultHash = defaults[user.role];
      if (hash === '#' || hash === '') {
        handler = this.routes[defaultHash];
        if (handler) { window.location.hash = defaultHash; return; }
      }
    }

    if (!handler) {
      // Try 404 handler
      handler = this.routes['#404'] || (() => {
        this.container.innerHTML = `
          <div class="empty-state" style="min-height:60vh">
            <div class="empty-state__icon" style="font-size:3rem">😕</div>
            <h2 class="empty-state__title">Page Not Found</h2>
            <p class="empty-state__body">The page you're looking for doesn't exist.</p>
            <a href="app.html" class="btn btn-primary mt-4">Go Home</a>
          </div>`;
      });
    }

    this.currentRoute = hash;
    EcoCharts.destroyAll();

    // Transition out
    this.container.style.opacity = '0';
    this.container.style.transform = 'translateY(6px)';

    setTimeout(() => {
      handler(this.container);
      this.container.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      this.container.style.opacity = '1';
      this.container.style.transform = 'translateY(0)';
      window.scrollTo(0, 0);
    }, 80);

    // Update active nav
    this.updateNavActive(hash);
  },

  updateNavActive(hash) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.route === hash) {
        item.classList.add('active');
      }
    });

    // Update breadcrumb
    const breadcrumbEl = document.getElementById('topnav-breadcrumb');
    if (breadcrumbEl) {
      const label = document.querySelector(`.nav-item[data-route="${hash}"] .nav-item__label`)?.textContent || '';
      breadcrumbEl.textContent = label;
    }
  }
};

window.EcoRouter = EcoRouter;
