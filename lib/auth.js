export function checkUserRole() {
    if (typeof window !== 'undefined') { // Ensure it's running on the client
      return localStorage.getItem('userRole') || 'guest'
    }
    return 'guest'  // Default fallback for SSR
  }
  